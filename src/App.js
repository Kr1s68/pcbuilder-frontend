
import './JS-Elements/CSS-Elements/App.css';
import MainBody from './JS-Elements/MainBody';
import NavBar from './JS-Elements/NavBar';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import ExampleBuilds from './JS-Elements/ExampleBuilds';
import SplashScreen from './JS-Elements/SplashScreen';
import BuildYourOwn from './JS-Elements/BuildYourOwn';
import SignUp from './JS-Elements/SignUp';
import { AuthProvider } from './JS-Elements/Contexts/AuthContexts';
import {auth} from "./firebase"
import Login from "./JS-Elements/Login"
import Dashboard from './JS-Elements/Dashboard';
import PrivateRoute from './JS-Elements/PrivateRoute';
import { useAuth } from './JS-Elements/Contexts/AuthContexts';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddCpus from './JS-Elements/addComponentElements/AddCpus';
import AddMotherboards from './JS-Elements/addComponentElements/AddMotherboards';
import AddGpus from './JS-Elements/addComponentElements/AddGpus';
import AddMemory from './JS-Elements/addComponentElements/addMemory';
import AddStorage from './JS-Elements/addComponentElements/addStorage';
import AddCases from './JS-Elements/addComponentElements/addCases';
import AddPsus from './JS-Elements/addComponentElements/addPsus';
import EditorNavElement from'./JS-Elements/EditorNavElement';
import EditExampleBuilds from './JS-Elements/EditExampleBuilds';
import MyBuilds from './JS-Elements/MyBuilds';
import BuildArticle from './JS-Elements/BuildArticle/BuildArticle';
import ItemInfo from './JS-Elements/WebScrapingElements/ItemInfo';

//TODO: Make a login system: DONE
//TODO: Make a Client and Admin user profiles : DONE
//TODO: Make a DATABASE for items : DONE
//TODO: Make a Table for saved user builds : DONE
//TODO: Make a page for editing the contents of the website from the admin profile : DONE
//TODO: Make the builder show relative performance : DONE
//TODO: Make the builder show vendors and compare prices : DONE
//TODO: Make a saving system for builds : DONE
//TODO: Polish Everything : DONE

export const ip = '192.168.1.4'

function App() {

  const [isLoaded, setIsLoaded] = React.useState();
  const [currentBuild, setCurrentBuild] = React.useState();

  function loadSavedBuild(Build){
    
    setIsLoaded(true)

    setCurrentBuild(Build)

  }


  return (

      <AuthProvider>

        <Router>

        <Routes>

          <Route exact path="/" element={<Home/>} />

          <Route path='/builder' element = {<Builder isLoaded = {isLoaded} loadedBuild = {currentBuild}/>} />

          <Route path = '/signup' element = {<SignUp/>}/>

          <Route path = '/login' element = {<Login/>}/>

          <Route path = '/dashboard' element = {<Dashboard/>}/>

          <Route path = '/addcpus' element = {<> <EditorNavElement/><AddCpus/></>}/>

          <Route path = '/addMotherboards' element = {<><EditorNavElement/><AddMotherboards/></>}/>

          <Route path = '/addGpus' element = {<><EditorNavElement/><AddGpus/></>}/>

          <Route path = '/addMemory' element = {<><EditorNavElement/><AddMemory/></>}/>

          <Route path = '/addStorage' element = {<><EditorNavElement/><AddStorage/></>}/>

          <Route path = '/addCases' element = {<><EditorNavElement/><AddCases/></>}/>

          <Route path = '/addPsus' element = {<><EditorNavElement/><AddPsus/></>}/>

          <Route path = '/editBuilds' element = {<EditExampleBuilds/>}/>

          <Route path = '/mybuilds' element = {<MyBuilds loadSavedBuild = {loadSavedBuild}/>}/>

          <Route path = '/Article0' element = {<BuildArticle index = {0} />}/>

          <Route path = '/Article1' element = {<BuildArticle index = {1} />}/>

          <Route path = '/Article2' element = {<BuildArticle index = {2} />}/>

          <Route path = '/Article3' element = {<BuildArticle index = {3} />}/>

          <Route path = '/test' element = {<ItemInfo/>}/>


        </Routes>
          
      </Router>

    </AuthProvider>
       
     
       
  );

}

function Builder(props){

  return(

          <div className='BodyDiv'>

          <NavBar />

          <MainBody isLoaded = {props.isLoaded} loadedBuild = {props.loadedBuild}/>

          </div>

  )

}

function Home(){

  const [error, setError] = useState()
  const { currentUser, logout } = useAuth()
  const history =  useNavigate()

  function reDirect(){
    if(window.innerWidth < 1350){
      history("/builder")
    }
  }

  return(
    
    <div className='BodyDiv'>

      <NavBar/>

      <div className='HomeBackgroundDiv'>

        { !currentUser && <SplashScreen/>}

        <ExampleBuilds/>

        <BuildYourOwn/>

      </div>

    </div>
    
   ) 
  
}


export default App;
