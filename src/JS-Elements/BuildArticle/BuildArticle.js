import React from 'react'
import NavBar from '../NavBar'
import "../CSS-Elements/MainBody.css"
import "../CSS-Elements/App.css"
import { useAuth } from '../Contexts/AuthContexts'
import Axios from 'axios';
import { Roller } from 'react-awesome-spinners'

export default function BuildArticle(props) {

    const [displayable, setDisplayable] = React.useState("none")
    const [centerable, setCenterable] = React.useState("center")
    const { currentUser, logout } = useAuth()
    const [edit, setEdit] = React.useState("false")
    let [iteration, setIteration] = React.useState(0)
    const [loaded, setLoaded] = React.useState(false);

    const [formData, setFormData] = React.useState([{
        Introduction : '',
        CPU:'',
        Motherboard:'',
        Storage: '',
        GPU: '',
        Case:'',
        PSU:'',
        Memory:''
    }])

    let params;
    try{
            params = new URLSearchParams([['id', props.index + 1]]);
    }catch{
    }

     // eslint-disable-next-line react-hooks/exhaustive-deps
    const loadArticles = () => {
            Axios.get(`https://pc-builder-api.herokuapp.com/api/data/loadArticle`,{ params }).then((response) => 
                response.data && setFormData(response.data[0])
            ).then(setLoaded(true))
            setIteration(iteration+=1);
    }

    React.useEffect(()=> {
        if(iteration < 10){
            loadArticles();
            console.log(formData);      
        }
    },[formData, iteration, loadArticles]);

    const addItem = () => {
        Axios.post(`https://pc-builder-api.herokuapp.com/api/data/createArticle`,{ 
            Introduction:formData.Introduction,
            CPU:formData.CPU,
            Motherboard:formData.Motherboard, 
            Storage:formData.Storage,
            GPU: formData.GPU,
            Case: formData.Case,
            PSU: formData.PSU,
            Memory: formData.Memory,
            id:props.index+1
        }).then(() => console.log('success'))
    }

    function handleClick(){
        addItem()
        setEdit(true)
    }
      

    function handleEdit(){
        if(edit){
            setEdit(false)
        }else{
            setEdit(true)
        }
    }

    function handleChange(e){
        const { name, value } = e.target;
        setFormData(prevData => ({
           ...prevData, [name] : value
        }))
    }

    React.useEffect(() => {
        try{
          currentUser.isAdmin ? setDisplayable("inline") : console.log("no admin")
          currentUser.isAdmin ? setCenterable("end") : console.log("no admin")
        }catch{
        }
    }, [currentUser]);

  return (
    <div className='BodyDiv'>
    <NavBar/>
        <div className='MainDiv' style={edit ? {height:"200vh"} : {height:"250vh"}}>
        <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:centerable, width:"100%"}}>
            <div className='CurrrentBuildDiv'> Description:   
            <div 
            className='fa fa-gear LinkText' 
            style={{cursor:"pointer", fontSize:"39px", textDecoration:'none', color:'white', marginTop:"32px", marginLeft:"38.5vw", marginRight:"3.3vw",display:displayable }}
            onClick = {handleEdit} 
            >
            </div>
          </div>
        </div>
        {!loaded ? <Roller/> :
            (<article className='Article'>
                <h2>Introduction</h2>
                <p style={edit ? {display:"inline"} : {display:"none"}}>
                    {formData.Introduction}
                </p>
                <textarea onChange={handleChange} name = "Introduction" value={formData.Introduction} style={!edit ? {display:"inline"} : {display:"none"}}></textarea>
                <h2>CPU</h2>
                <p style={edit ? {display:"inline"} : {display:"none"}}>
                    {formData.CPU}
                </p>
                <textarea onChange={handleChange} name = "CPU" value={formData.CPU} style={!edit ? {display:"inline"} : {display:"none"}}></textarea>
                <h2>Motherboard</h2>
                <p style={edit ? {display:"inline"} : {display:"none"}}>
                    {formData.Motherboard}
                </p>
                <textarea onChange={handleChange} name = "Motherboard" value={formData.Motherboard} style={!edit ? {display:"inline"} : {display:"none"}}></textarea>
                <h2>Memory</h2>
                <p style={edit ? {display:"inline"} : {display:"none"}}>
                    {formData.Memory}
                </p>
                <textarea onChange={handleChange} name = "Memory" value={formData.Memory} style={!edit ? {display:"inline"} : {display:"none"}}></textarea>
                <h2>Storage</h2>
                <p style={edit ? {display:"inline"} : {display:"none"}}>
                    {formData.Storage}
                </p>
                <textarea onChange={handleChange} name='Storage' value={formData.Storage} style={!edit ? {display:"inline"} : {display:"none"}}></textarea>
                <h2>GPU</h2>
                <p style={edit ? {display:"inline"} : {display:"none"}}>
                    {formData.GPU}
                </p>
                <textarea onChange={handleChange} name='GPU' value={formData.GPU} style={!edit ? {display:"inline"} : {display:"none"}}></textarea>
                <h2>Case</h2>
                <p style={edit ? {display:"inline"} : {display:"none"}}>
                    {formData.Case}
                </p>
                <textarea onChange={handleChange} name='Case' value={formData.Case} style={!edit ? {display:"inline"} : {display:"none"}}></textarea>
                <h2>PSU</h2>
                <p style={edit ? {display:"inline"} : {display:"none"}}>
                    {formData.PSU}
                </p>
                <textarea onChange={handleChange} name='PSU' value={formData.PSU} style={!edit ? {display:"inline"} : {display:"none"}}></textarea>
            </article>)}
            <button className = "saveButton" style = {!edit ? {display:"inline"} : {display:"none"}}onClick={handleClick}> Save </button>
        </div>
    
    </div>
 

  )
}
