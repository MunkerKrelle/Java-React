import React, { useState } from "react";

import Login from ".//login";
import NewUser from".//newuser";
import { BrowserRouter as Router, Routes, Route  }
     from "react-router-dom";
function GetName() {
     return(
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/newuser" element={<NewUser/>}/>                
            </Routes>
        </Router>
     ) 
     // <div><NewUser/></div>

}

export default GetName;
