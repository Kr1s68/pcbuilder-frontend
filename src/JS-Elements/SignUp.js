import React, {useEffect, useRef, useState} from 'react';
import {Form, Button, Card} from 'react-bootstrap'
//import "bootstrap/dist/css/bootstrap.min.css"
import {Container} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './Contexts/AuthContexts';
import Axios from 'axios';
import "./CSS-Elements/ExampleBuilds.css"
import "./CSS-Elements/App.css"
import {ip} from '../App'


function SignUp() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history =  useNavigate()

    const [formData, setFormData] = useState([{

       email: "",
       admin: false

    }])

    const addItem = () => {

        Axios.post(`https://pc-builder-api.herokuapp.com/api/data/createUser`,{ 

            email: formData.email,
            admin: formData.admin

        }).then(() => console.log('success'))

    }

    function handleChange(e){    

        const { name, value } = e.target;

        setFormData(prevData => ({

            ...prevData, [name] : value, admin : false 
            
         }))

    }


    async function handleSubmit(event){

        event.preventDefault()

        if(passwordRef.current.value !== passConfirmRef.current.value){

            return setError('Password do not match!')

        }

        try{

            setError(' ')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            addItem()
            history("/")
            

        } catch{

            setError('Failed to create an account')

        }
        setLoading(false)

      
      
       
    }


    

   



    return (

        

                        <Container style = {{minHeight: "100vh", display: "flex", alignItems:"center", flexDirection: "column", justifyContent: "center"}}>  
                        
                        <div className='loginDiv' style={{maxWidth: "400px", background: " -webkit-linear-gradient(90deg, rgba(41, 37, 255, 0.133),rgba(255, 255, 255, 0.133))",backdropFilter: "blur(0.5px)", width: "50vw", height: "60vh", display:"flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}> 

                        <Card>

                            <Card.Body>
                        
                            <h2 style={{textAlign: "center", color: "rgb(231, 227, 231)"}}>Sign Up</h2>

                            {error && <h1>{error}</h1>}

                            <Form style = {{display: "flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}} onSubmit = {handleSubmit}>
                            
                                <Form.Group id = "email" style = {{marginBlock: "12px"}}>

                                    <Form.Control name = "email" onChange={handleChange} placeholder = "Email" type = "email" ref = {emailRef} style = {{
                                        
                                        width:"15vw",
                                        minWidth: "170px",  
                                        height:"5vh",
                                        backgroundColor:"transparent",
                                        color: "rgb(231, 227, 231)",
                                        outline: "none",
                                        border:"none",
                                        borderBottomStyle: "solid",
                                        borderBottomColor: "rgb(231, 227, 231)",
                                        borderBottomWidth: "1px",
                                        paddingLeft: "9px",
                                        fontSize:"15px"
                                    
                                    
                                    }} required/>
                                
                                </Form.Group>
                                
                                <Form.Group id = "password" style = {{marginBlock: "12px", }}>

                                    <Form.Control placeholder = "Password" type = "password" ref = {passwordRef} style = {{
                                        
                                        width:"15vw",
                                        minWidth: "170px",  
                                        height:"5vh",
                                        backgroundColor:"transparent",
                                        color: "rgb(231, 227, 231)",
                                        outline: "none",
                                        border:"none",
                                        borderBottomStyle: "solid",
                                        borderBottomColor: "rgb(231, 227, 231)",
                                        borderBottomWidth: "1px",
                                        paddingLeft: "9px",
                                        fontSize:"15px"
                                    
                                    }} required/>
                            
                                </Form.Group>

                                <Form.Group id = "passConfirm" style = {{marginBlock: "12px", }}>

                                    <Form.Control placeholder = "Confirm Password" type = "password" ref = {passConfirmRef} style = {{
                                    
                                        width:"15vw",
                                        minWidth: "170px",  
                                        height:"5vh",
                                        backgroundColor:"transparent",
                                        color: "rgb(231, 227, 231)",
                                        outline: "none",
                                        border:"none",
                                        borderBottomStyle: "solid",
                                        borderBottomColor: "rgb(231, 227, 231)",
                                        borderBottomWidth: "1px",
                                        paddingLeft: "9px",
                                        fontSize:"15px"
                                    
                                    }} required/>
                            
                                </Form.Group>

                                <Button disabled = {loading} className = "SubmitButton" style={{width: "14vw", minWidth: "160px", height: "7vh", marginTop: "6vh", fontSize:"16px",border:"none", borderRadius:"50px"}} type = "Submit">Submit</Button>
                            
                            </Form>


                        </Card.Body>
                    
                    </Card>
                    
                    <a style={{marginTop:"40px",marginBottom:"20px", color:"rgb(231, 227, 231)"}}> Already have an account? <Link to = "/login">Log in </Link></a>
                    
                    </div>
                    

                
                    </Container>

                        
            
           
       
    );
}

export default SignUp;