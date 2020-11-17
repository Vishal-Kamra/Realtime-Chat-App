const app = require("express")()
const http = require("http").createServer(app)
const io = require("socket.io")(http)

var users = []
var messages = []

io.on("connection",socket=>{
  
  console.log("Socket Client Is Connected")
  
  socket.on("user", user=>{
    if(users.includes(user)){
      io.emit("user error", "Username already taken")
    }else{
      users.push(user)
      io.emit("user success", true)
      io.emit("all messages", messages)
    }
  })

  socket.on("send message", (data)=>{
    messages.push(data)
    io.emit("send all messages", messages)
  })
  
  socket.on("disconnected",()=>{
    console.log("Socket Client Is Disconnected")
  })

})

http.listen(3000, ()=>{
  console.log("Server is running at 3000")
})