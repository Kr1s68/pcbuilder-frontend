import React, {useState} from 'react';
import Axios from 'axios';
import { useAuth } from '../Contexts/AuthContexts'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate
  } from "react-router-dom";
  import {ip} from '../../App'

function AddCases(props) {

    const [pickedUser, setPickedUser] = React.useState()

    const [users, setUsers] = React.useState([])

    const [displayable, setDisplayable] = React.useState("block")

    const { currentUser, logout } = useAuth()

    const Navigate = useNavigate()

    React.useEffect(() => {
        (!currentUser || !currentUser.isAdmin) && Navigate("/")
        
      
      }, [currentUser, pickedUser, users]);

   
    const [formData, setFormData] = useState([{

        Model : '',
        FormFactor:'',
        Size:'',
        Color: '',
        Price: 0,

    }])

    const [itemList, setItemList] = useState([])

    const addItem = () => {

        Axios.post(`https://pc-builder-api.herokuapp.com/api/data/createCase`,{ 

            Model:formData.Model,
            FormFactor:formData.FormFactor,
            Size:formData.Size, 
            Color:formData.Color,
            Price: formData.Price 

        }).then(() => console.log('success'))

    }

    const getItems = () => {

        Axios.get(`https://pc-builder-api.herokuapp.com/api/data/Cases`,{ 

        }).then((response) => setItemList(response.data))


    }

    function handleChange(e){

        const { name, value } = e.target;

        setFormData(prevData => ({

           ...prevData, [name] : value

        }))

    }

    return (
        <div style={{paddingBlock:"90px", display:displayable}}>
            <div>
                <CustomInput Heading = "Model: " Type = "text" onChange = {handleChange} name = "Model" />
                <CustomInput Heading = "FormFactor: " Type = "text" onChange = {handleChange} name = "FormFactor"/>
                <CustomInput Heading = "Size: " Type = "comboBox" onChange = {handleChange} name = "Size"/>
                <CustomInput Heading = "Color: " Type = "text" onChange = {handleChange} name = "Color" />
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
                <label style={{fontSize:'24px', color:' rgb(231, 227, 231)', marginLeft: '-90px'}}>Size:</label>
                    <select name={props.name} style = {{textAlign:"center",height:'5vh', width:'25vw', fontSize:'24px', marginBlock:'15px', marginLeft: '-90px'}} onChange = {props.onChange} >
                        <option>{"Choose Size"}</option>
                        <option>{"E-ATX"}</option>
                        <option>{"ATX"}</option>
                        <option>{"Micro-ATX"}</option>
                        <option>{"Mini-ITX"}</option>
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

export default AddCases;