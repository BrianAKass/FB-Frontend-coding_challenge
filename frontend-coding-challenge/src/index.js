const express = require("express");
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const cors = require("cors");

// initialize people datastore
let people = [];

// load seed people
const https = require("https");
const options = {
  hostname: "randomuser.me",
  path: "/api/?results=100&inc=name,email,picture",
  method: "GET",
};

const req = https.request(options, (res) => {
  console.log("Seeding data...");
  let data = "";
  res.on("data", (chunk) => {
    data += chunk;
  });
  res.on("end", () => {
    people = JSON.parse(data).results;
    console.log("Data Seeded!");
  });
});
req.end();

// The GraphQL schema in string form
const typeDefs = `
  type Query { 
      people: [Person] 
      person(email: String!): Person
    }
  type Mutation {
      editPerson(email: String!, payload:EditPerson): Person!
  }
  input EditPerson { title: String, first: String last: String, email: String}
  type Name { title: String, first: String, last: String}
  type Picture { large: String, medium: String, thumbnail: String}
  type Person { name: Name, email: String, picture: Picture }
`;

// The resolvers
const resolvers = {
  Query: {
    people: () => people,
    person: (_, args) => {
      const idx = people.findIndex((p) => p.email === args.email);
      if (idx < 0) {
        throw error("Person not found");
      }
      return people[idx];
    },
  },
  Mutation: {
    editPerson: (_, args) => {
      const idx = people.findIndex((p) => p.email === args.email);
      if (idx < 0) {
        throw error("Person not found");
      }
      if (args.payload.title) {
        people[idx].name.title = args.payload.title;
      }
      if (args.payload.first) {
        people[idx].name.first = args.payload.first;
      }
      if (args.payload.last) {
        people[idx].name.last = args.payload.last;
      }
      if (args.payload.email) {
        people[idx].email = args.payload.email;
      }
      return people[idx];
    },
  },
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Initialize the app
const app = express();

app.use(cors());

// The GraphQL endpoint
app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

// Start the server
app.listen(8080, () => {
  console.log(
    `Welcome to the Firstbase Frontend Coding Challenge API\n GraphiQL: http://localhost:8080/graphiql\n GOOD LUCK!`
  );
});
