const express=require('express')
const app = express()
const http=require("http")
const cors=require("cors")
const path = require("path")
const server = http.createServer(app);
//socket io has lot of cors issues 
app.use(cors())
const { Server } = require("socket.io")
const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173",//which server makes calls to our socket io--url of our application---react running port url
        methods:["GET","POST"],
        credentials:true
    }
})


//socket io works on events basis,emit event,listen event
//some built in events connection
io.on("connection",(socket)=>{
    console.log(socket.id)

    socket.on("join_room",(data)=>{
        socket.join(data)
        console.log(`user with id ${socket.id} joined room ${data}`)
    })

    socket.on("send_msg",(data)=>{
        socket.to(data.room).emit("receive_msg",data)
        console.log(data)
    })

    socket.on("disconnect",()=>{
        console.log("user disconnected",socket.id)
    })
})



const port = process.env.PORT || 3001
server.listen(port,()=>{
    console.log("Server started")
})
