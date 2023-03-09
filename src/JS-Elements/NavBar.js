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



export default function NavBar (props){

  const { currentUser, logout } = useAuth()

  const [displayable, setDisplayable] = useState('none')

  const [playState, setPlayState] = useState('paused')

  const [x, setX] = useState('-100%')

  const [error, setError] = useState()
  const history =  useNavigate()

  function handleClick(){

    if(displayable === 'none'){
      setPlayState('running')
      setDisplayable('flex')
      setX('0')
    }else{
      setPlayState('paused')
      setDisplayable('none')
      setX('-100%')
    }
      
  }
  async function handleLogout(){
        
    setError('')

    try{

        await logout()
        window.location.reload()
        history('/')

    }catch{

        setError('Failed to log out')

    }

}

function handleNavigate(){

  history("/mybuilds")

}


  return (
    
    <div className="NavBar" style={props.style}>

      <div className='BlurDiv' style={{display:displayable}}>
        <button onClick={handleClick}> <img src='https://img.icons8.com/glyph-neue/64/050525/chevron-left.png'  alt=''/> </button>
      </div>

      <div ><Link className="LinkText" style={{

            textDecoration: 'none',
            color: 'rgb(231, 227, 231)',
            fontFamily: 'Arial'



            }} to = "/builder">Builder</Link>
            <Link className="LinkTextIcon" style={{

              textDecoration: 'none',
              color: 'rgb(231, 227, 231)',
              fontFamily: 'Arial'
  
  
  
              }} to = "/builder"><img src="https://img.icons8.com/ios/50/E7E3E7/my-computer--v1.png" alt=''/></Link></div>

      <Link className='Link' style={{

        textDecoration: 'none',
        color: 'rgba(231, 227, 231, 1)',
        fontFamily: 'Arial',
        marginRight: '-200px'


                  }}to = "/">
        <h3>

            DreamBuilder

        </h3>
      </Link>

      {currentUser ? <LoggedInProfileElement handleClick = {handleClick}/> : <LoggedOutProfileElement handleClick = {handleClick}/>}

      <div className='MobileSidebar' style={{left:x, animationPlayState:playState}}>
                
              {currentUser ? <> 
                              <div>{currentUser.email}</div>
                              <div onClick={handleLogout}>Log Out</div>
                              <div onClick={handleNavigate} >My Builds</div>
                              <div onClick={() => history("/")}> Home </div>
                             </>
                              :
                              <> 
                              <div onClick={() => history("/login")}>Log In</div>
                              <div onClick={() => history("/signup")}>Sign Up</div>
                              <div onClick={() => history("/")}> Home </div>
                             </>
          }

      
      </div>


    </div>

  )
}

function LoggedOutProfileElement (props) {


  return (
    <>
    <h5 className = "DesktopLoggedOut" style={{marginLeft: 100}}> <Link to = "/login" className="LinkText" style={{

      textDecoration: 'none',
      color: 'rgb(231, 227, 231)',
      fontFamily: 'Arial'

      }}>Login</Link> | <Link to = "/signup" className="LinkText" style={{

        textDecoration: 'none',
        color: 'rgb(231, 227, 231)',
        fontFamily: 'Arial'

        
      }}> Register </Link></h5>

      <h5 className='MobileLoggedOut' onClick={props.handleClick}><img src="https://img.icons8.com/ios-filled/100/E7E3E7/menu-rounded.png" alt = ""/></h5>
    </>
    

  )

}

  function LoggedInProfileElement (props) {
    
    const [error, setError] = useState()
    const { currentUser, logout } = useAuth()
    const history =  useNavigate()

    async function handleLogout(){
        
      setError('')

      try{

          await logout()
          window.location.reload()
          history('/')

      }catch{

          setError('Failed to log out')

      }

  }

    function handleNavigate(){

      history("/mybuilds")

    }

    return (
      <>
      <h5 className = "DesktopLoggedIn" style={{

        marginLeft: 100,
        textDecoration: 'none',
        color: 'rgb(231, 227, 231)',
        fontFamily: 'Arial',
        flexDirection: "row",
        alignItems: "center",
        justifyContent:"center" 
      
      }} > 
      
      <p style={{marginRight:"10px"}} >{currentUser.email}</p> | 
      <p style={{marginInline: "10px", cursor:"pointer"}} onClick = {handleLogout} className = "LinkText"> Log out</p> | 
      <p style={{marginInline: "10px", cursor:"pointer"}} onClick = {handleNavigate} className = "LinkText"> My Builds</p> </h5>



      <h5 className='MobileLoggedIn' onClick={props.handleClick}><img src="https://img.icons8.com/ios-filled/100/E7E3E7/menu-rounded.png" alt = ""/></h5>
      </>
     
    )

  }