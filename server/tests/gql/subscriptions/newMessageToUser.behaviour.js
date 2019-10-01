const Client = require("../utils/client");
const { execute, makePromise } = require("apollo-link");
const gql = require("graphql-tag");
const SUB_QUERY = gql`
  subscription checkNewMessages {
    newChatMessageToUser {
      from
      text
      delievered
      seen
      text
      sent
      createdAt
    }
  }
`;

const LOGIN = gql`
  mutation login {
    loginUser(userName: "testUser1234", gender: "M") {
      success
      error
      token
    }
  }
`;

const GET_USER = gql`
  query getUser {
    user(userName: "testUser1234") {
      userName
    }
  }
`;

const operation = {
  query: LOGIN
};

const operation2 = {
  query: GET_USER
};


let agent = new Client().client;

makePromise(execute(agent, operation))
    .then((result)=> {
        console.log(result)
    })
    .then(()=>{
        makePromise(execute(agent, operation2)).then((result)=>{
            console.log(result);
            execute(agent, {query :  SUB_QUERY}).subscribe({
              next: (data) => console.log(data)
            })
            })
        });




// console.log(getUserResult().then());
