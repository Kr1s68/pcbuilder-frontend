import './CSS-Elements/ExampleBuilds.css';
import React from 'react';
import Axios from 'axios';
import { useAuth } from './Contexts/AuthContexts'
import {Link, useNavigate} from 'react-router-dom'



export default function ExampleBuilds(){

  const [displayable, setDisplayable] = React.useState("none")

  const [centerable, setCenterable] = React.useState("center")

  const Navigate = useNavigate();

  const [buildData, setBuildData] = React.useState([{

        IMG :'https://www.geekawhat.com/wp-content/uploads/2022/05/Best-Cases-2022-Feature-Image.jpg',
        CPU : 'AMD Ryzen 5 5600X',
        Motherboard : 'GIGABYTE B550 AORUS ELITE V2',
        Memory : 'Team Group T-Force Delta 16 GB ( 2 x 8 ) DDR4-3200',    
        GPU: 'RTX 3070 VENTUS 2X 8G OC  '

  },{

        IMG :'https://geekawhat.com/wp-content/uploads/2022/05/H7-Flow-Steves-Build-Feature-Image.jpg',
        CPU : 'Intel Core i7-13700KF',
        Motherboard : 'ASRock Z790 Pro',
        Memory : 'Silicon Power GAMING 32 GB (2 x 16 GB) DDR4-3200',    
        GPU: 'XFX Speedster SWFT 319 Radeon RX 6900 XT 16 GB'

},{

        IMG :'https://cdn1.dotesports.com/wp-content/uploads/2022/04/03103202/corsair-680x-feature-toms.jpg',
        CPU : 'Intel Core i5-12600K',
        Motherboard : 'NZXT N5 Z690',
        Memory : 'Silicon Power GAMING 32 GB (2 x 16 GB) DDR4-3200',    
        GPU: 'XFX Speedster MERC 319 CORE Radeon RX 6800 XT'

},{

        IMG :'https://i.ytimg.com/vi/-Zz0XkcOjlg/maxresdefault.jpg',
        CPU : 'AMD Ryzen 9 7950X',
        Motherboard : 'ASRock X670E PG Lightning',
        Memory : 'T-Force Delta RGB 32 GB (2 x 16 GB) DDR5-6000',    
        GPU: 'NVIDIA GeForce RTX 3090 Ti'

    }

])

    return (

        <div className="ExampleBackground">

            <div className = "TitleDiv" style ={{justifyContent:centerable}}>
                <h1>Example Builds</h1>  
                <div
                className='fa fa-gear LinkText' 
                style={{fontSize:"39px", textDecoration:'none', color:'rgb(231, 227, 231)',marginLeft:"34.5vw", marginRight:"3.3vw", display:displayable, cursor:"pointer" }} 
                ></div>
            </div>
           
            
            <div className='ExampleBuildsDiv'>

                { buildData.map((build, i) => { 
                    
                    return (

                        <div key = {i} className='ExampleBuild' onClick={() => Navigate(`/Article${i}`)}>

                        <img src = {build.IMG} alt = "balls"></img>
    
                        <div className='ExampleBuildComponents'>
    
                            <h4 style={{paddingInline: "2.5vw", marginBlock: "10px", color: "rgb(231, 227, 231)"}}>Components: </h4>
    
                            <div className='IterateComponents'>
    
                                <div>CPU: {build.CPU}</div>
                                <div>Motherboard: {build.Motherboard}</div>
                                <div>Memory: {build.Memory}</div>
                                <div>GPU: {build.GPU}</div>
                                
                            </div>
    
                        </div>
    
                    </div>

                    )
                  
            
            })}

            </div>

        </div>

    )

}