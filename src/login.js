import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



// creat input option to log in user/password
export default function Login(){
    const [nameInput, setInputs] = useState({username: "", password: ""});
    const navigate = useNavigate();
    const handleChange = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values=>({...values,[name]: value}))
    }
    
    const handleSubmit = (event)=>{
        event.preventDefault();
        console.log(nameInput);
        // indsæt logik for database tjek her
    }

    const goToCreateUser = () => {
      navigate("/newuser");
    }
    // function sat op til at blive kaldt når vi logger ind
    const LogedIn = ()=>{
      navigate("/logedin")
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
        <br></br>
        <input
        type="button"
        name="changetonewuser"
        value="Create new user"
        onClick={goToCreateUser}
        // indsæt logik til side skifte (til mig selv) 
        />
        
    </form>
    
        
    )

}








