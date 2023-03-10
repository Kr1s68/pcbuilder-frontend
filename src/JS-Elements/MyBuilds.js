import React, { useEffect } from 'react';
import './CSS-Elements/MainBody.css'
import NavBar from './NavBar';
import './CSS-Elements/App.css';
import { useAuth } from './Contexts/AuthContexts'
import {
    BrowserRouter as Router,
    useNavigate
  } from "react-router-dom";
  import { CBRef, firestore } from '../firebase';
  import { getDocs, deleteDoc, doc, query,where } from 'firebase/firestore';

function MyBuilds(props) {

    const { currentUser, logout } = useAuth()
    
    const [currentBuild, setCurrentBuild ] = React.useState()

    const [loaded,setLoaded] = React.useState(false);

    let [loadBuild, setLoadedBuild] = React.useState(0)

    const Navigate = useNavigate()
    
    let BuildID = [];

    let params;
    try{
        if(currentUser){
            params = new URLSearchParams([['email', currentUser.email]]);
        }
    }catch{

    }

    function handleClick(Item){

        props.loadSavedBuild(Item)
        Navigate("/builder")
    }

    const deleteBuild = (Index) => {
        /*
        if(BuildID[Index] !== undefined){
            Axios.post(`https://pc-builder-api.herokuapp.com/api/data/deleteBuild`,{ 

                id:BuildID[Index]

            }).then(() => console.log('success'))

            
        }
        */
        const docRef = doc(firestore, 'currentBuild',currentBuild[Index].id)
        deleteDoc(docRef)
            .then(() => { window.location.reload() })

    }


   
        // eslint-disable-next-line react-hooks/exhaustive-deps
        const loadBuilds = async (currentUser) => {

            if(currentUser){
                
                /*
                await Axios.get(`https://pc-builder-api.herokuapp.com/api/data/loadBuild`,{ params }).then((response) => 
                response.data && setCurrentBuild(response.data)).then(setLoaded(true))*/

                await getDocs(query(CBRef, where('user', '==', currentUser.email)))
                .then((snapshot) => {
                    let build = []
                    snapshot.docs.forEach((doc) => {
                            setLoaded(true)
                            build.push({ ...doc.data(), id : doc.id })
                    })
                    setCurrentBuild(build)
                    console.log(build)
                })
               
                setLoadedBuild(loadBuild+=1)

            }
           
            
            
        }
           
    

   
    useEffect(() => {
        if(loadBuild < 2){
            loadBuilds(currentUser)
        }
    },[currentBuild, currentUser, loadBuild, loadBuilds])
   
    return (
        <div className='BodyDiv'>  

            <NavBar/>


            <div className='MainDiv' style={{height:"fit-content", minHeight : window.innerHeight - window.innerHeight/3}}>
            
                <div className='CurrrentBuildDiv'> Saved Builds: </div>
                    { !loaded && <div style={{fontSize:"23px", fontWeight:"bold", color:"rgb(231, 227, 231)", marginBlock:"40px"}}>Unfortunately you haven't made any builds yet</div> }
                                    {   

                                        loadBuild > 1 && currentBuild.map((Item, Index) => {

                                           BuildID[Index] = Item.idsavedbuilds
                                           
                                            return (
                                                
                                                <div key = {Index} className = 'SecondaryComponents' style={{width:"93%", paddingInline:"2vw", alignItems:"start", backgroundColor:" rgba(231, 227, 231, 0.2)"}}>

                                                    <div style={{textAlign:"center", marginBottom:"0.1vh", fontWeight:"bold", display:"flex", justifyContent:"center", alignItems:"center", width:"100%"}}> <p>Build {Index + 1}:</p></div>

                                                        <div className = "InfoDiv" style={{display:"flex"}}>

                                                            <div>
                                                                {
                                                                    <div className = "differentP" style={{
                                                                        display:"flex", 
                                                                        flexDirection:"column", 
                                                                        justifyContent:"left", 
                                                                        maxHeight:"15.2vh", 
                                                                        alignItems:"left", 
                                                                        paddingTop:"1.5vh",
                                                                        paddingInline:"1vw",
                                                                        color:"rgb(231, 227, 231)",
                                                                        borderRadius:"20px"
                                                                    }}>
                                                                        <p style={{width:"fit"}}>CPU: {Item.CPU}</p>
                                                                        <p style={{width:"fit"}}>Motherboard: {Item.Motherboard}</p>
                                                                        <p style={{width:"fit"}}>GPU: {Item.GPU}</p>

                                                                    </div>
                                                                }
                                                            </div>

                                                            <div className='buttonDiv'>
                                                            
                                                                <button onClick={() => handleClick(Item)}> Load </button>

                                                                <button onClick={() => deleteBuild(Index)}> Delete </button>
                                                                
                                                            </div>

                                                        </div>

                                                </div>

                                            )

                                        })
                                    }
                             
            </div>

        </div>
      
    );
}

export default MyBuilds;