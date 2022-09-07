import './App.css';
import io from 'socket.io-client';
import {useState} from "react";
import Chat from './pages/Chat.js';
import Signup from './pages/Signup.js';

const socket = io.connect("http://localhost:3030");

function App() {
  //shortcut to make a class w/ setter function
  const [username,setUsername] = useState("");
  const [room,setRoom] = useState("");
  const [isChat,setChat] = useState(false);

  const joinRoom = () =>  {
    if(username !== "" && room !== ""){
      const joinData = {
        room: room,
        user: username
      }
      socket.emit("join_room", joinData);
      setChat(true);
    }
  };



  if(!isChat){
    return (

      <div className="App">
        <Signup/>
        <h3>Join a Chat</h3>
        <input type = "text" placeholder="Username" onChange={(input) => {
          setUsername(input.target.value); //accesses value of input
          console.log(input.target.value);
        }}/>
        <input type = "text" placeholder="Room ID" onChange={(input) => {
          setRoom(input.target.value);
          console.log(input.target.value);}
          }
          onKeyPress={event=>{
            if(event.key === "Enter"){
              joinRoom();
            }
          }}/>   
          

        <button id="submit" onClick={joinRoom}>Join A Room</button>
      </div>
    );
  }
  else{
    return <Chat socket={socket} user={username} room={room}/>;
  }
  
}

export default App;
