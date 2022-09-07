//imports
const express = require('express');
const app = express();
const http = require("http");
const cors = require ("cors");
const { Server } = require("socket.io");
const roomUsers = new Map();
app.use(cors());

//create server to be used by express AND socket.io
const server = http.createServer(app); 

const io = new Server(server, {
    cors:{
        origin: "http://localhost:3000",
        method: ["GET","POST"]
    }
}); //socket.io server


//socket.io sends and receives events
io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join_room", async (joinData) => {
        let roomData = roomUsers.get(joinData.room);
        if(!roomData){
            roomUsers.set(joinData.room,[joinData.user + " + "]);
        }
        else{
            
            if(!roomData.includes(joinData.user)){
                roomUsers.set(joinData.room,[...roomData,joinData.user]);
            }
            
        }
        socket.join(joinData.room);
 
        io.in(joinData.room).emit("confirm_join",roomUsers.get(joinData.room));
        console.log(`User with ID: ${socket.id}, name: ${joinData.user} joined room ${joinData.room}`)
    });

    socket.on("send_message", (message_data) => {
        console.log(message_data);
        io.in(message_data.room).emit("receive_message", message_data);
    });

    socket.on("disconnect", () =>{
        console.log(`User disconnected: ${socket.id}`);
        
    });
});


server.listen(3030, () => {
    console.log("Server running!")
});

