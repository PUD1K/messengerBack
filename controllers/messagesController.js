const ApiError = require("../error/ApiErorr");
const { Messages } = require("../models/models");
const socket = require('../index'); //import socket  from app.js


class MessagesController{
    constructor() {
        // Attach a Socket.IO instance to the Express app
        const app = require('express')();
        const server = require('http').createServer(app);
        this.io = require('socket.io')(server);
      }

    async add(req, res){
        const {request_number, response_number, message} = req.body
        const send_message = await Messages.create({request_number, response_number, message})
        
        return res.json(send_message)
    }


    async get(req, res){
        const {request_number, response_number} = req.body
        const messages = await Messages.findAll({where: {
            request_number, 
            response_number
        }})
        return res.json(messages)
    }

}

module.exports = new MessagesController 