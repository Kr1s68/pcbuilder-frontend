import React from 'react';
import './CSS-Elements/NavBar.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import { updateCurrentUser } from 'firebase/auth';
import { useAuth } from './Contexts/AuthContexts'
import { useState } from 'react';
 


export default function EditorNavElement (props){

  const navigate = useNavigate();

  function handleChange(e){

    if(e.target.value === "CPU"){

      navigate("/addcpus")

    }else if(e.target.value === "Motherboard"){

      navigate("/addMotherboards")

    }else if(e.target.value === "GPU"){

      navigate("/addGpus")

    }else if(e.target.value === "Memory"){

      navigate("/addMemory")

    }else if(e.target.value === "Storage"){

      navigate("/addStorage")

    }else if(e.target.value === "Case"){

      navigate("/addCases")

    }else if(e.target.value === "PSU"){

      navigate("/addPsus")

    }
       
    }

  return (
    
    <div className="NavBar" style={{position:"relative"}}>
        <CustomInput style = {{}} Heading = "Socket: " Type = "comboBox" onChange = {handleChange} name = "Socket" />

        <Link className='Link' style={{


          textDecoration: 'none',
          color: 'rgba(231, 227, 231, 1)',
          fontFamily: 'Arial',
          marginLeft: "20px",
          paddingTop: '25px',
          position: "abosolute"
  
  
                    }}to = "/">
          <h3>
  
             Home

          </h3>
        </Link>
    </div>

  )
}

function CustomInput(props){

    return (

        <div style={{display:"flex", flexDirection:'column', alignItems:'center'}}>

            {
            
            props.Type === "comboBox" ? 
                
            <>
                <label style={{fontSize:'24px', color:' rgb(231, 227, 231)'}}>Item: </label>
                    <select name={props.name} style = {{textAlign:"center",height:'5vh', width:'25vw', fontSize:'24px', marginBlock:'15px'}} onChange = {props.onChange} >
                        <option>{"CPU"}</option>
                        <option>{"Motherboard"}</option>
                        <option>{"GPU"}</option>
                        <option>{"Memory"}</option>
                        <option>{"Storage"}</option>
                        <option>{"Case"}</option>
                        <option>{"PSU"}</option>
                    </select>
            </>

            :
            <>
                <label style={{fontSize:'24px', color:' rgb(231, 227, 231)'}}>{props.Heading}</label>
                <input style = {{textAlign:"center",height:'5vh', width:'25vw', fontSize:'24px', marginBlock:'15px'}} type = {props.Type} onChange = {props.onChange} name = {props.name}/>
            </>
        }

        </div>
       
    )

}
