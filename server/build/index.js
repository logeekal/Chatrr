"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var socket = require('socket.io');
var http = require('http');
var _a = require('apollo-server-express'), ApolloServer = _a.ApolloServer, gql = _a.gql;
// const gqlServer = new ApolloServer({
// })
var app = express();
var socketServer = socket(http.createServer(app));
app.get('/', function (req, res) {
    res.send('Running Express Successfully');
});
app.listen(3001, function () {
    console.log("Server Started");
});
