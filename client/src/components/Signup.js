import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import React, {useState} from 'react';
import UserPool from '../UserPool';
//import io from 'socket.io-client';
//express session to save user info?

//const socket = io.connect("http://localhost:3030");

const Signup = () => {
    const[email,setEmail] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(UserPool.getClientId());
        let usernameAttribute = {
            Name: "email",
            Value: email
        };

        let emailAttribute = new CognitoUserAttribute(usernameAttribute);
        let list = [];
        list.push(emailAttribute);
        //list.push(usernameAttribute);
        console.log(username,password);
        UserPool.signUp(username,password,list,null,(err,data)=>{
            if(err){
                console.error(err);
                document.getElementById('signup-error').innerHTML = err.message;
            }
            console.log(data);
            //if successful signup, send user object to socket
            //const userData = socket.emit("start_session",userData);
        });
    };

    return(
        <div>
            <form onSubmit={onSubmit}>
                <input value={email} onChange={(event)=>setEmail(event.target.value)} placeholder="Email"></input>
                <input value={username} onChange={(event)=>setUsername(event.target.value)} placeholder="Username">
                </input>
                
                <input value={password} type="password" onChange={(event)=>setPassword(event.target.value)} placeholder="Password">
                </input>
                <button type="submit">Signup</button>
            </form>
            <div id="signup-error"></div>
        </div>
    );
};

export default Signup;