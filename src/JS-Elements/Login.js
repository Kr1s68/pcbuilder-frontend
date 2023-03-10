import React, {useRef, useState} from 'react';
import {Form, Button, Card} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
//import "bootstrap/dist/css/bootstrap.min.css"
import {Container} from 'react-bootstrap'
import "./CSS-Elements/App.css"
import { useAuth } from './Contexts/AuthContexts';
import "./CSS-Elements/ExampleBuilds.css"


function Login() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passConfirmRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history =  useNavigate()

    async function handleSubmit(event){

        event.preventDefault()

        try{
            setError(' ')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history("/")
        } catch{

            setError('Wrong password or email')

        }
        setLoading(false)

      

    }

    return (
           
                        <Container style = {{minHeight: "100vh", display: "flex", alignItems:"center", flexDirection: "column", justifyContent: "center"}}>  
                        
                        <div className = "loginDiv" style={{maxWidth: "400px", background: " -webkit-linear-gradient(90deg, rgba(41, 37, 255, 0.133),rgba(255, 255, 255, 0.133))",backdropFilter: "blur(0.5px)", width: "50vw", height: "60vh", display:"flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}> 

                        <Card>

                            <Card.Body>
                        
                            <h2 style={{textAlign: "center", color: "rgb(231, 227, 231)"}}>Log In</h2>

                            {error}

                            <Form style = {{display: "flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}} onSubmit = {handleSubmit}>
                            
                                <Form.Group id = "email" style = {{marginBlock: "12px"}}>

                                    <Form.Control placeholder = "Email" type = "email" ref = {emailRef} style = {{
                                        
                                        width:"15vw",
                                        minWidth: "180px", 
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
                                        minWidth: "180px", 
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

                                <Button disabled = {loading} className = "SubmitButton" style={{width: "14vw",minWidth: "160px",  height: "7vh", marginTop: "6vh", fontSize:"16px",border:"none", borderRadius:"50px"}} type = "Submit">Submit</Button>
                            
                            </Form>


                        </Card.Body>
                    
                    </Card>
                    
                    <a style={{marginTop:"40px",marginBottom:"20px", color:"rgb(231, 227, 231)"}}> Dont't have an account? <Link to = "/signup"> Register here </Link> </a>
                    
                    </div>
                    
                    </Container>
       
    );
}

export default Login;