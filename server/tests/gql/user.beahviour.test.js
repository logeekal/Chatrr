const chai = require("chai");
const { assertGraphQLError } = require('./utils/index');
const {error_codes} = require('../../configs/error_codes');

const url = "http://localhost:3001";

const request = require("supertest").agent(url);
const requestUser = [];
requestUser[0] = require("supertest").agent(url);
requestUser[1] = require("supertest").agent(url);
const logger =  require('../../utils/logging').log(module);

const endpoint = "/gql";
const {
  getRoomsQuery,
  getUserConversations,
  getPublicUserDetails,
  getRoomUsers,
  getRoomConversations
} = require("./testData/gqlqueries");
const {
  addUserToRoomMutation,
  sendConversation,
  updateConnectedStatus,
  loginUserMutation,
  logoutUserMutation
} = require("./testData/gqlmutations");

const {
  loginMutationUser1,
  loginMutationUser2,
  logoutMutationUser1,
  logoutMutationUser2,
  user1,
  user2,
  convUser1ToRoom1,
  convUser2ToUser1,
  convUser2ToRoom1,
  convUser1ToUser2,
} = require("./testData/gqlTestData");



describe("User Behaviour Tests", function() {
  this.timeout(4000);
  before( async function() {
    logger.debug("Loggin out users now.");
    request
      .post(endpoint)
      .send({ query: logoutMutationUser1 })
      .end((err, res) => {
        // logger.debug(err);
        // logger.debug(res);
      });

    request
      .post(endpoint)
      .send({ query: logoutMutationUser2 })
      .end((err, res) => {
        // logger.debug(err);
        // logger.debug(res);
      });
    logger.debug('In before');
    try {
      let response = await requestUser[0]
      .post(endpoint)
      .send({query : loginUserMutation(user1.userName, user1.gender)})
    
      // logger.debug(response);
    // agent._saveCookies(response);
  }catch(err){
    logger.debug(err);
  }
    
    try {
    // let req = request.post(endpoint);
    // logger.debug(req)
    // agent._attachCookies(req);
    let response = await  requestUser[0]
      .post(endpoint)
      .send({ query: getRoomsQuery });
    this.rooms = response.body.data.rooms;
    // logger.debug("rooms are ");
    //   logger.debug(this.rooms);
  }catch(err){
      logger.debug(err);
    }

      // .end((err, res) => {
      //   if (err) {
      //     logger.debug("Error in before block in getting the existing rooms");
      //     throw err;
      //   } else {
      //     this.rooms = res.body.data.rooms;
      //     // logger.debug(`this.rooms : ${this.rooms}`);
      //   }
      // });
  });

  it("Another user with Same Username should fail", done => {
    requestUser[1]
      .post(endpoint)
      .send({ query: loginMutationUser1 })
      .end((err, res) => {
        if (err) {
          logger.debug(err)
          done(err);
        }
        logger.debug(JSON.stringify(res.body));
        chai.assert.strictEqual(
          res.status,
          200,
          "Status of request does not match"
        );
        
        chai.expect(res.body).to.have.keys(["data", "errors"]);
        logger.debug(res.body.data);
        chai.expect(res.body.data).be.null;
        // chai.expect(res.body.).to.have.keys(["success", "error"]);
        // chai.assert.strictEqual(
        //   response.success,
        //   false,
        //   "Success values is not matching."
        // );
        done();
      });
  });

  it("Another user with different Username should be able to login", done => {
    requestUser[1]
      .post(endpoint)
      .send({ query: loginMutationUser2 })
      .end((err, res) => {
        // res should contain success and Error
        // logger.debug(err);
        // logger.debug(res);
        let response = res.body.data.loginUser;
        // logger.debug(response);
        chai.assert.strictEqual(
          res.status,
          200,
          "Status of request does not match"
        );
        chai
          .expect(Object.keys(response))
          .to.have.members(["success", "error"]);
        chai.assert.strictEqual(
          response.success,
          true,
          "Success message does not match."
        );
        chai.expect(response.error).to.be.null;
        done();
      });
  });

  it("Get All Active Rooms", function(done) {
    requestUser[1]
      .post(endpoint)
      .send({ query: getRoomsQuery })
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          let response = res.body;
          chai.expect(response).to.have.keys(["data"]);
          chai.expect(response.data).to.have.keys(["rooms"]);
          chai.assert.isAtLeast(
            response.data.rooms.length,
            1,
            "At least 1 room should have been returned"
          );
          chai
            .expect(response.data.rooms[0])
            .to.have.keys([
              "id",
              "name",
              "title",
              "avatar",
              "description",
              "active",
              "createdAt",
              "updatedAt"
            ]);

          done();
        }
      });
  });

  it("Adding user 1 to any room should be successfull", function(done) {
    let rooms = this.rooms; //catch the value set in before
    requestUser[0]
      .post(endpoint)
      .send({ query: addUserToRoomMutation(user1.userName, rooms[0].id) })
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          let response = res.body;
             logger.debug(response);
          chai.expect(response).to.have.keys(["data"]);
          chai.expect(response.data).to.have.keys(["addUserToRoom"]);
          chai
            .expect(response.data.addUserToRoom)
            .to.have.keys(["success", "error"]);
          chai.assert.strictEqual(
            response.data.addUserToRoom.success,
            true,
            "Sucess message does not match"
          );
          chai.assert.strictEqual(
            response.data.addUserToRoom.error,
            null,
            "Error message does not match"
          );
          done();
        }
      });
  });

  it("Sending text from user1 to room1 should be successfull", function(done) {
    requestUser[0]
      .post(endpoint)
      .send({
        query: sendConversation(
          user1.userName,
          this.rooms[0].id,
          "ROOM",
          convUser1ToRoom1.text
        )
      })
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          let response = res.body;
          logger.debug(JSON.stringify(response));
          chai.expect(response).to.to.have.keys(["data"]);
          chai
            .expect(response.data.sendConversation)
            .to.have.keys(["success", "error"]);
          chai.assert.strictEqual(
            response.data.sendConversation.success,
            true,
            "Sucess message does not match"
          );
          chai.assert.strictEqual(
            response.data.sendConversation.error,
            null,
            "Error message does not match"
          );
          done();
        }
      });
  });

  it("Sending text from User1 to User 2 should be successfull", function(done) {
    requestUser[0]
      .post(endpoint)
      .send({
        query: sendConversation(
          user1.userName,
          user2.userName,
          "USER",
          convUser1ToUser2.text
        )
      })
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          let response = res.body;
          chai.expect(response).to.to.have.keys(["data"]);
          chai
            .expect(response.data.sendConversation)
            .to.have.keys(["success", "error"]);
          chai.assert.strictEqual(
            response.data.sendConversation.success,
            true,
            "Sucess message does not match"
          );
          chai.assert.strictEqual(
            response.data.sendConversation.error,
            null,
            "Error message does not match"
          );
          done();
        }
      });
  });

  it("Sending text from User 2 to User 1 should be successfull", function(done) {
    requestUser[1]
      .post(endpoint)
      .send({
        query: sendConversation(
          user2.userName,
          user1.userName,
          "USER",
          convUser2ToUser1.text
        )
      })
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          let response = res.body;
          // logger.debug(response);
          chai.expect(response).to.to.have.keys(["data"]);
          chai
            .expect(response.data.sendConversation)
            .to.have.keys(["success", "error"]);
          chai.assert.strictEqual(
            response.data.sendConversation.success,
            true,
            "Sucess message does not match"
          );
          chai.assert.strictEqual(
            response.data.sendConversation.error,
            null,
            "Error message does not match"
          );
          done();
        }
      });
  });

  it("Getting the conversation for user 1 should result in 3 messages. 1 Room , 1 From and 1 To", function(done) {
    requestUser[0]
      .post(endpoint)
      .send({ query: getUserConversations(user1.userName) })
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          let response = res.body;
          // logger.debug(JSON.stringify(response));
          chai
            .expect(response.data.getUserConversations)
            .to.have.keys(["sentConversations", "receivedConversations"]);
          chai
            .expect(response.data.getUserConversations.sentConversations)
            .to.have.length(2);
          chai
            .expect(response.data.getUserConversations.receivedConversations)
            .to.have.length(1);
          chai
            .expect(response.data.getUserConversations.sentConversations[0])
            .to.have.keys([
              "from",
              "toUser",
              "toRoom",
              "toType",
              "sent",
              "text",
              "delievered",
              "createdAt",
              "seen"
            ]);
          done();
        }
      });
  });

  it("Getting non Admin details of User 1 should be successfull", function(done) {
    requestUser[0]
      .post(endpoint)
      .send({ query: getPublicUserDetails(user1.userName) })
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          let response = res.body;
          // logger.debug(response);
          chai.expect(response).to.have.key("data");
          chai.expect(response.data).to.have.key("user");
          chai
            .expect(response.data.user)
            .to.have.keys([
              "id",
              "userName",
              "avatar",
              "gender",
              "connected",
              "loggedIn",
              "createdAt"
            ]);
          done();
        }
      });
  });

  it("Getting the details of User 1 should be successfull when userName is passed as lowercase", function(done) {
    requestUser[0]
      .post(endpoint)
      .send({ query: getPublicUserDetails(user1.userName.toLowerCase()) })
      .end((err, res) => {
        if (err) {
          logger.debug(err);
          done(err);
        } else {
          let response = res.body;
          // logger.debug(response);
          chai.expect(response).to.have.key("data");
          chai.expect(response.data).to.have.key("user");
          chai
            .expect(response.data.user)
            .to.have.keys([
              "id",
              "userName",
              "avatar",
              "gender",
              "connected",
              "loggedIn",
              "createdAt"
            ]);
          done();
        }
      });
  });

  it("Updating Connected status of User 2 to offline should be successfull", function(done) {
    requestUser[1]
      .post(endpoint)
      .send({ query: updateConnectedStatus(user2.userName, false) })
      .end((err, res) => {
        if (err) {
          logger.debug(err);
          done(err);
        } else {
          let response = res.body;
          // logger.debug(response);
          chai.expect(response).to.have.keys(["data"]);
          chai.expect(response.data).to.have.keys(["updateConnectedStatus"]);
          chai
            .expect(response.data.updateConnectedStatus)
            .to.have.keys(["success", "error"]);
          chai.assert.strictEqual(
            response.data.updateConnectedStatus.success,
            true,
            "Sucess message does not match"
          );
          chai.assert.strictEqual(
            response.data.updateConnectedStatus.error,
            null,
            "Error message does not match"
          );
          done();
        }
      });
  });

  it("Sending text from User1 to User with wrong toType should fail", function(done) {
    requestUser[0]
      .post(endpoint)
      .send({
        query: sendConversation(
          user1.userName,
          user2.userName,
          "ABC",
          convUser1ToRoom1.text
        )
      })
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          let response = res.body;
          logger.debug(response);
          chai.expect(response).to.have.keys(["data","errors"]);
          chai.expect(response.data).be.null;
          assertGraphQLError(res, error_codes.WRONG_TO_TYPE)
          // chai
          //   .expect(response.data.sendConversation)
          //   .to.have.keys(["success", "error"]);
          // chai.assert.strictEqual(
          //   response.data.sendConversation.success,
          //   false,
          //   "Sucess message does not match"
          // );
          // chai.assert.strictEqual(
          //   response.data.sendConversation.error,
          //   error_codes.WRONG_TO_TYPE.message,
          //   "Error message does not match"
          // );
          done();
        }
      });
  });

  it("Sending text from User1 to offline User 2 should fail", function(done) {
    requestUser[0]
      .post(endpoint)
      .send({
        query: sendConversation(
          user1.userName,
          user2.userName,
          "USER",
          convUser1ToRoom1.text
        )
      })
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          let response = res.body;
          // logger.debug(response);
          chai.expect(response).to.to.have.keys(["data","errors"]);
          chai.expect(response.data).be.null;
          assertGraphQLError(res, error_codes.RECIPIENT_DISCONNECTED)
          // chai
          //   .expect(response.data.sendConversation)
          //   .to.have.keys(["success", "error"]);
          // chai.assert.strictEqual(
          //   response.data.sendConversation.success,
          //   false,
          //   "Sucess message does not match"
          // );
          // chai.assert.strictEqual(
          //   response.data.sendConversation.error,
          //   error_codes.RECIPIENT_DISCONNECTED.message,
          //   "Error message does not match"
          // );
          done();
        }
      });
  });

  it("Sending text from offine user 2 shoud fail", function(done) {
    requestUser[1]
      .post(endpoint)
      .send({
        query: sendConversation(
          user2.userName,
          user1.userName,
          "USER",
          convUser1ToRoom1.text
        )
      })
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          let response = res.body;
          logger.debug(JSON.stringify(response));
          chai.expect(response).to.to.have.keys(["data","errors"]);
          chai.expect(response.data).be.null;
          assertGraphQLError(res, error_codes.SENDER_DISCONNECTED)
          // chai
          //   .expect(response.data.sendConversation)
          //   .to.have.keys(["success", "error"]);
          // chai.assert.strictEqual(
          //   response.data.sendConversation.success,
          //   false,
          //   "Sucess message does not match"
          // );
          // chai.assert.strictEqual(
          //   response.data.sendConversation.error,
          //   error_codes.SENDER_DISCONNECTED.message,
          //   "Error message does not match"
          // );
          done();
        }
      });
  });
});

describe("Logging out users.. so that next tests can be carried out.", () => {
  it("All User Logging Out.", done => {
    request
      .post(endpoint)
      .send({ query: logoutMutationUser1 })
      .end((err, res) => {
        let response = res.body.data.logoutUser;
        // logger.debug(response);
        chai.assert.strictEqual(
          res.status,
          200,
          "Status of request does not match"
        );
        chai
          .expect(Object.keys(response))
          .to.have.members(["success", "error"]);
        chai.assert.strictEqual(
          response.success,
          true,
          "Success message does not match."
        );
        chai.expect(response.error).to.be.null;
        done();
      });
  });
  it("User2 Logging Out.", done => {
    request
      .post(endpoint)
      .send({ query: logoutMutationUser2 })
      .end((err, res) => {
        let response = res.body.data.logoutUser;
        // logger.debug(response);
        chai.assert.strictEqual(
          res.status,
          200,
          "Status of request does not match"
        );
        chai
          .expect(Object.keys(response))
          .to.have.members(["success", "error"]);
        chai.assert.strictEqual(
          response.success,
          true,
          "Success message does not match."
        );
        chai.expect(response.error).to.be.null;
        done();
      });
  });
});

describe("Room behaviour tests", function() {
  let rooms = [];
  let users = [user1, user2];
  let times = [];
  before(async function() {
    // logger.debug('Getting all the available Rooms before tests start');
    let response;
    try {

      // .end((err, res)=>{
      //   this.rooms = res.body.data.rooms;
      // });
      // logger.debug('Making sure users are connected and loggedIn');
      for (let idx in users) {
        await requestUser[idx].post(endpoint).send({
          query: loginUserMutation(users[idx].userName, users[idx].gender)
        });

        response = await requestUser[idx].post(endpoint).send({ query: getRoomsQuery });
        rooms = response.body.data.rooms;

        await requestUser[idx].post(endpoint).send({
          query: addUserToRoomMutation(users[idx].userName, rooms[0].id)
        });
        // logger.debug(`Adding user in room : ${users[idx].userName}`);
    }
 

    // Sending first conversation and recording its time.
    times.push(Date.now());
    await requestUser[0].post(endpoint).send({
      query: sendConversation(
        user1.userName,
        rooms[0].id,
        "ROOM",
        convUser1ToRoom1.text
      )
    });

    times.push(Date.now());
    await requestUser[1].post(endpoint).send({
      query: sendConversation(
        user2.userName,
        rooms[0].id,
        "ROOM",
        convUser2ToRoom1.text
      )
    });

  }catch(err){
    logger.debug(err)
    throw err;
  }

  });

  after(async function(){

    // logging out users
    for (let idx in users){
      await requestUser[idx]
            .post(endpoint)
            .send({query : logoutUserMutation(users[idx].userName) });  
    }
  });
  it("Get Room Members", function(done) {
    requestUser[0]
      .post(endpoint)
      .send({ query: getRoomUsers(rooms[0].id) })
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          let response = res.body;

          chai.expect(response).to.have.keys(["data"]);
          chai.expect(response.data).to.have.keys(["roomUsers"]);
          chai
            .expect(response.data.roomUsers)
            .to.have.lengthOf(2, "Number of Logged in users don't match");
          // Now matching the order of the results.. should be ascending
          chai.assert.strictEqual(
            user1.userName < user2.userName,
            response.data.roomUsers[0].userName <
              response.data.roomUsers[1].userName,
            "Users retrieved are not in right order"
          );
          done();
        }
      });
  });

  it("Get  room Conversations based on time. ", async function() {
    // logger.debug(times);
    let res = await requestUser[0]
      .post(endpoint)

      .send({ query: getRoomConversations(rooms[0].id, (times[1]).toString()) });
    let response = res.body;

    // logger.debug(JSON.stringify(response));
    chai.expect(response).to.have.keys(["data"]);
    chai.expect(response.data).to.have.keys(["roomConversations"]);
    if (response.data.roomConversations.errors) {
      throw response.data.roomConversations.errors;
    }
    chai.expect(response.data.roomConversations).to.have.lengthOf(1);
  });
});
