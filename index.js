require('dotenv').config()
const express = require("express")
const sequelize = require('./db')
const PORT = process.env.PORT || 5000
const models = require('./models/models')
const app = express()
const cors = require('cors')
const router = require('./routes/index')

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const socketController = require("./controllers/socketController")
const { Messages } = require("./models/models")
const { stringify } = require('querystring')


app.use(cors())
app.use(express.json())
app.use('/api/v1', router)

const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        // app.set("socketio", io)

        server.listen(PORT, () => console.log(`Server has been stated on port ${PORT}`))

        // используем сокет
        io.on('connection', (socket) => {
            console.log('connecting with socket established'); 

            // юзер залогонился
            socket.on("login", (number) =>{
                
                const res = socketController.setOnlineStatus(number)
                if(res){
                    console.log(`user with number ${number} and id ${socket.id} was online`)
                }
                else
                    console.log(`something weit wrong`) 
            })

            // юзер вышел
            socket.on("offline", (number) => {
                const res = socketController.setOfflineStatus(number)
                if(res){
                    console.log(`user with number ${number} was offline`)
                }
                else
                    console.log(`something weit wrong`)
            })


            // логика чата

            // войти в чат
            socket.on("join_chat", (room) => {
                socket.join(room)
                console.log("комната")
                console.log(io.sockets.adapter.rooms.get(room))
            })

            // выйти из чата
            socket.on("left_chat", (room) => {
                console.log(socket.id)
                if(!!io.sockets.adapter.rooms.get(room))
                    io.sockets.adapter.rooms.get(room).delete(socket.id)
                var room = io.sockets.adapter.rooms.get(room)
                console.log(room)
            })

            // отправить сообщение и отправить emit на клиент, чтобы клиент обновил сообщение
            socket.on("send_message", async (msg_obj, room) => {
                console.log(JSON.parse(msg_obj))
                const {request_number, response_number, message} = JSON.parse(msg_obj)

                var dataObj
                await Messages.create({request_number, response_number, message})
                .then((resultEntity) => {
                    dataObj = resultEntity.get({plain:true})
                })
                console.log(dataObj)
                
                io.sockets.in(room).emit('message', dataObj)
            })
          });

    } catch(e) {
        console.log(e)
    }
}

start()

const socketIoObject = io;
module.exports.ioObject = socketIoObject;

