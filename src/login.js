import React, { useState } from "react";


// creat input option to log in user/password
function Login(){
    const [nameInput, setInputs] = useState({username: "", password: ""});

    const handleChange = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values=>({...values,[name]: value}))
    }
    // i stedet for at sende det til loggen skal der sendes besked til data basen om correct in put
    const handleSubmit = (event)=>{
        event.preventDefault();
        console.log(nameInput);
    }

    return(
        <form onSubmit={handleSubmit}>
      <label>Enter your username:
      <input 
        type="text" 
        name="username" 
        value={nameInput.username || ""} 
        onChange={handleChange}
      />
      <br></br>
      </label>
      <label>Enter your password:
        <input 
          type="password" 
          name="password" 
          value={nameInput.password || ""} 
          onChange={handleChange}
        />
        </label>
        <br></br>
        <input type="submit" value="Log in"/>
        
    </form>
    
        
    )

}

// create new user function to change site
function CreatNewUser(){
<input type="submit" value="Creat new user"/>
}





export default Login;