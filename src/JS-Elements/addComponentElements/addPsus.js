import React, {useState} from 'react';
import Axios from 'axios';
import { useAuth } from '../Contexts/AuthContexts'
import {
    BrowserRouter as Router,
    useNavigate
  } from "react-router-dom";

function AddPsus(props) {

    const [pickedUser, setPickedUser] = React.useState()

    const [users, setUsers] = React.useState([])

    const [displayable, setDisplayable] = React.useState("block")

    const { currentUser, logout } = useAuth()

    const Navigate = useNavigate()

    React.useEffect(() => {
        (!currentUser || !currentUser.isAdmin) && Navigate("/")
        
      
      }, [currentUser, pickedUser, users]);


   /* const getUsers = () => {

        Axios.get('http://localhost:3001/checkAdmin',{ 

        }).then((response) => setUsers(response.data))


    }

    React.useEffect(() => {

        getUsers()

    },[])

    React.useEffect(() => {
        if(currentUser){
        users.map((user,i) => {
         
          user.email === currentUser.email ?  setPickedUser(user) : console.log("no match")
        
        })}  
      
      }, [currentUser, users]);
      
      React.useEffect(() => {
        if(pickedUser){pickedUser.admin === 1 ? setDisplayable("block") : console.log("no admin")}
      
      }, [currentUser, pickedUser, users]);*/
    
    const [formData, setFormData] = useState([{

        Model : '',
        PowerStandard: '',
        Power:'',
        FormFactor:'',
        Usability:'',
        Price: 0,

    }])

    const [itemList, setItemList] = useState([])

    const addItem = () => {

        Axios.post(`https://pc-builder-api.herokuapp.com/api/data/createPsu`,{ 

            Model:formData.Model,
            PowerStandard:formData.PowerStandard,
            Power:formData.Power, 
            FormFactor:formData.FormFactor,
            Usability:formData.Usability,
            Price: formData.Price 

        }).then(() => console.log('success'))

    }

    const getItems = () => {

        Axios.get(`https://pc-builder-api.herokuapp.com/api/data/PSUS`,{ 

        }).then((response) => setItemList(response.data))


    }

    function handleChange(e){

        const { name, value } = e.target;

        setFormData(prevData => ({

           ...prevData, [name] : value

        }))

    }

    return (
        <div style={{paddingBlock:"90px", display: displayable}}>
            <div>
                <CustomInput Heading = "Model: " Type = "text" onChange = {handleChange} name = "Model" />
                <CustomInput Heading = "Power Standard: " Type = "text" onChange = {handleChange} name = "PowerStandard" />
                <CustomInput Heading = "Power: " Type = "text" onChange = {handleChange} name = "Power"/>
                <CustomInput Heading = "FormFactor: " Type = "text" onChange = {handleChange} name = "FormFactor"/>
                <CustomInput Heading = "Usability: " Type = "text" onChange = {handleChange} name = "Usability" />
                <CustomInput Heading = "Price: " Type = "number" onChange = {handleChange} name = "Price"/>
                <button onClick = {addItem} style = {{textAlign:"center",height:'5vh', width:'25.5vw', fontSize:'24px', marginBlock:'15px'}}>Add Item</button>
            </div>

            <button style = {{textAlign:"center",height:'5vh', width:'25.5vw', fontSize:'24px', marginBlock:'15px'}} onClick = {getItems}> Show Items </button>

            {itemList.map((val, key) => {

                return <div key={key}> {val.Model} </div>
            })}
        </div>
      
    );
}


function CustomInput(props){

    return (

        <div style={{display:"flex", flexDirection:'column', alignItems:'center'}}>

            {
            
            props.Type === "comboBox" ? 
                
            <>
                <label style={{fontSize:'24px', color:' rgb(231, 227, 231)'}}>Socket</label>
                    <select name={props.name} style = {{textAlign:"center",height:'5vh', width:'25vw', fontSize:'24px', marginBlock:'15px', marginLeft: '-90px'}} onChange = {props.onChange} >
                        <option>{"Choose Socket"}</option>
                        <option>{"AM 4"}</option>
                        <option>{"AM 5"}</option>
                        <option>{"LGA 1200"}</option>
                        <option>{"LGA 1151"}</option>
                        <option>{"LGA 1700"}</option>
                    </select>
            </>

            :
            <>
                <label style={{fontSize:'24px', color:' rgb(231, 227, 231)', marginLeft: '-90px'}}>{props.Heading}</label>
                <input style = {{textAlign:"center",height:'5vh', width:'25vw', fontSize:'24px', marginBlock:'15px', marginLeft: '-90px'}} type = {props.Type} onChange = {props.onChange} name = {props.name}/>
            </>
        }

        </div>
       
    )

}

export default AddPsus;