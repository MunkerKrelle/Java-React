import React, { useState } from "react";


export default function NewUser(){

    const [userData, setUserData] = useState({username: "", password:""});
    
    const handleChange =(event)=>{
        const{name, value} = event.target;
        
        setUserData((prev)=>({ ...prev,[name] : value }));
    };

    const handleSubmit = (event)=>{
        event.preventDefault();
        console.log(userData);
        // lave add to database her
    }

    // function sat op til at blive kaldt når vi logger ind
   
    return(
        <form onSubmit={handleSubmit}>
            <label><h4>Please choose youre username</h4>
            <input
           type="text" 
           name="username" 
           value={userData.username || ""} 
           onChange={handleChange}
           />
            <br></br>
            </label>
            <label> <h4>Enter your password:</h4>
        <input 
          type="password" 
          name="password" 
          value={userData.password || ""} 
          onChange={handleChange}
        />
        </label>
            <br></br>
            <br></br>
         <input type="submit" value="Create User and Log in"/>
         <br></br>
         
        
        
        {/* indsæt logik til side skifte (til mig selv)*/} 
        </form>
    )
}