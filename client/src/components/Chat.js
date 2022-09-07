import React, {useState, useEffect} from 'react';

function Chat({socket, user, room}){
    const [message, setMessage] = useState("");
    const [otherUser,setOtherUser] = useState([]);
    const [msgList,setMsgList] = useState([]);

    // wait for message to be sent before moving on w program
    const sendMessage = async () => {
        console.log("Sending message: ",message);
        if(message !== ""){
            const messageData = {
                room: room,
                author: user,
                message: message,
                time: new Date(Date.now()).getHours() + ":" + 
                      new Date(Date.now()).getMinutes()
            };
            
            await socket.emit("send_message",messageData);
        }

    };

    useEffect(()=>{
        socket.on("receive_message",(message_data) => {
            console.log("Received message: ",message_data.message);
            //adds new message data to list of prev message data
            setMsgList((msgs) => [...msgs, message_data]);
            msgList.map((msg)=>{
                console.log("Added: ",msg.message);
                console.log(msg.time);
            });
        });

        socket.on("confirm_join", (users) => {
            console.log(`JOIN CONFIRMED: ${users}`);
            setOtherUser(users);
        });

        return() => socket.emit('end');
    }, []);
   
    let users = "";

    otherUser.forEach((name)=>{
        users += name + " ";
    });

    return (
        <div>
            <div className="chat-header">
                <h1>DuoMusica Chat: {users} </h1>
            </div>
            <div className="chat-history">
                {msgList.map((msgData) => {
                    return (
                        <div className="message" class={user === msgData.author ? "You" : "Other"}>
                            <div className="message-content"><p>{msgData.message}</p></div>
                            <div className="message-data">{msgData.time}</div>
                        </div>    
                    );
                })}
            </div>

            <div className="chat-box">
                <input type="text" placeholder="Type here!"
                    onChange={(input => {
                        setMessage(input.target.value);
                    })}
                    onKeyPress={(event=>{
                        if(event.key === "Enter")
                            sendMessage();
                    })} />

                <button onClick={sendMessage}>&#9658;</button>
                    
            </div>

        </div>

    );
}

export default Chat;