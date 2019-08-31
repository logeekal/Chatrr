const chai = require("chai");
const url = "http://localhost:3001";
const request = require("supertest")(url);
const endpoint = '/gql';
const { getRoomsQuery } = require('./testData/gqlqueries');
const { addUserToRoomMutation } = require('./testData/gqlmutations');


const {
    loginMutationUser1,
    loginMutationUser2,
    logoutMutationUser1,
    logoutMutationUser2,
    user1,
    user2
} = require("./testData/gqlTestData");


describe("GraphQL Tests start", function() {
    this.timeout(4000);    
    before(() => {
        console.log("Loggin out users now.");
        request
            .post(endpoint)
            .send({ query: logoutMutationUser1 })
            .end((err, res) => {
                // console.log(err);
                // console.log(res);
            });

        request
            .post(endpoint)
            .send({ query: logoutMutationUser2 })
            .end((err, res) => {
                // console.log(err);
                // console.log(res);
            });
    });

    it("Users Logging In", done => {
        const loginMutation = loginMutationUser1;
        request
            .post(endpoint)
            .send({ query: loginMutation })
            .end((err, res) => {
                // res should contain success and Error
                // console.log(err);
                // console.log(res);
                let response = res.body.data.loginUser;
                // console.log(response);
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

    it("Another user with Same Username should fail", (done) => {
        request
            .post(endpoint)
            .send({ query: loginMutationUser1 })
            .end((err, res) => {
                if (err) {
                    done(err)
                }
                let response = res.body.data.loginUser;
                chai.assert.strictEqual(
                    res.status,
                    200,
                    "Status of request does not match"
                );
                // console.log(res.body);
                chai.expect(res.body).to.have.keys(["data", "errors"]);
                chai.expect(response).to.have.keys(["success", "error"]);
                chai.assert.strictEqual(response.success, false, "Success values is not matching.");
                done();
            });
    });

    it("Another user with different Username should be able to login", done => {
        request
            .post(endpoint)
            .send({ query: loginMutationUser2 })
            .end((err, res) => {
                // res should contain success and Error
                // console.log(err);
                // console.log(res);
                let response = res.body.data.loginUser;
                // console.log(response);
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

    

    it('Get All Active Rooms', (done) => {
        request
            .post(endpoint)
            .send({ query: getRoomsQuery })
            .end((err, res) => {
                if (err) {
                    done(err);
                } else {
                    let response = res.body;
                    chai.expect(response).to.have.keys(['data']);
                    chai.expect(response.data).to.have.keys(['rooms']);
                    chai.assert.isAtLeast(response.data.rooms.length, 1, "At least 1 room should have been returned");
                    chai.expect(response.data.rooms[0]).to.have.keys(['id', 'name', 'title', 'avatar', 'description', 'active', 'createdAt', 'updatedAt'])
                    done();
                }
            });
    });

    describe('Joining a Room for a user', function(){
        before(async function(){
            // get the rooms before joining in.
           try { 
               let response = await request.post(endpoint).send({query : getRoomsQuery});
               
               this.rooms = response.body.data.rooms;

            }catch(err){
                console.log('Error in before block in getting the existing rooms');
                throw(err);
            }
    
        });
        
        
        it('Adding user to any room should be successfull', function(done){
            let rooms = this.rooms; //catch the value set in before
            request
                .post(endpoint)
                .send({query : addUserToRoomMutation(user1.userName, rooms[0].id)})
                .end((err, res)=>{
                    if(err){
                        done(err)
                    }else{
                       let response = res.body;
                       console.log(response);
                       chai.expect(response).to.have.keys(['data']);
                       chai.expect(response.data).to.have.keys(['addUserToRoom']);
                       chai.expect(response.data.addUserToRoom).to.have.keys(['success','error']);
                       chai.assert.strictEqual(response.data.addUserToRoom.success, true, 'Sucess message does not match');
                       chai.assert.strictEqual(response.data.addUserToRoom.error, null, 'Error message does not match');

                    }
                })
        })

    })

});

describe('Tests to be run after all tests have completed', ()=>{
    it("Same User Logging Out.", done => {
        request
            .post(endpoint)
            .send({ query: logoutMutationUser1 })
            .end((err, res) => {
                let response = res.body.data.logoutUser;
                // console.log(response);
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
