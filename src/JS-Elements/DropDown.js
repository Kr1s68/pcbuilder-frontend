import './CSS-Elements/DropDown.css';
import React from 'react';

export default function DropDown(props){

  const [Visible, setVisible] = React.useState({display:'none'}); 

  const [ButtonText, setButtonText] = React.useState("Choose " + props.Type)

  const [ffWeight, setFFWeight] = React.useState(20)

  let [test, setTest] = React.useState(0)

  const CPUS = props.CPUS

  const GPUS = props.GPUS

  const Motherboards = props.Motherboards

  const Memory = props.Memory

  const Storage =  props.Storage

  const Cases = props.Cases

  const PSUS = props.PSUS

  let isLoaded = props.isLoaded


    React.useEffect(() => {

      switch(props.currentFormFactor){
        case "E-ATX" : setFFWeight(4) 
        break;
        case "ATX" :setFFWeight(3)
        break;
        case "Micro-ATX" : setFFWeight(2)
        break;
        case "Mini-ITX" : setFFWeight(1)
        break;
        default: console.log("default")
      }
  
    },[ffWeight, props.currentFormFactor])
    

 
  function handleClick(){
    
    props.setIsLoaded(false)

    if(Visible.display === 'none'){
      setVisible({display:'block'})
    }else{
      setVisible({display:'none'})
    }

  }

  function checkWeight(initalWeight, FormFactor){

    let FormFactorWeight

    if(FormFactor.includes("E-ATX")){
      FormFactorWeight = 4 
    }else if(FormFactor.includes("ATX")){
      FormFactorWeight = 3 
    }else if(FormFactor.includes("Micro-ATX")){
      FormFactorWeight = 2  
    }else if(FormFactor.includes("Mini-ITX")){
      FormFactorWeight = 1
    }

      if(initalWeight <= FormFactorWeight){
        return true
      }else{
        return false
      }

  }

  function handleDropDownClick(Part){

  if(props.Type === "Motherboard") {
   
      if(Part.includes(props.CurrentSocket)){
        setButtonText(Part)
        props.setMotherboard(Part)
      }else{
        if(!isLoaded){
          setButtonText(Part)
        }else{
          setButtonText(Part)
        }
    }
    
  } else {

    setButtonText(Part)

    switch(props.Type){
      case "CPU" : props.setCPU(Part) 
      break;
      case "GPU" : props.setGPU(Part)
      break;
      case "Motherboard" : props.setMotherboard(Part)
      break;
      case "Memory" : props.setMemory(Part)
      break;
      case "Storage" : props.setStorage(Part)
      break;
      case "PSU" : props.setPSU(Part)
      break;
      case "Case" : props.setCase(Part)
      break;
      default: console.log("default")
    }
    

  }
     
      
    setVisible({display:'none'})
    
    if(props.Type === "CPU"){

      props.getSocket(Part)

    }

    if(props.Type === "Motherboard"){

      props.getFormFactor(Part)
      props.getMemoryType(Part)

    }

    
      !isLoaded ? props.getPrice(Part, ButtonText) : props.getPrice(Part,"0")
    
     

    
  }

  if(isLoaded && test<=5 ){
  
      setTest(test+=1)

    switch(props.Type){
      case "CPU" : handleDropDownClick(props.loadedBuild.CPU)
      break;
      case "GPU" : handleDropDownClick(props.loadedBuild.GPU)
      break;
      case "Motherboard" : handleDropDownClick(props.loadedBuild.Motherboard)
      break;
      case "Memory" : handleDropDownClick(props.loadedBuild.Memory)
      break;
      case "Storage" : 
      case props.Item  : handleDropDownClick(JSON.stringify(props.Item).replace(/(^"+|"+$)/mg,``))
      break;
      case "PSU" :  handleDropDownClick(props.loadedBuild.PSU)
      break;
      case "Case" : handleDropDownClick(props.loadedBuild.Case)
      break;
      default: console.log("default")
    }
  }

  return (

    <div className='DropDownDiv' >

      

       <button className='Button' onClick={handleClick}>
        <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:((props.Type === "Motherboard" && !ButtonText.includes(props.CurrentSocket)) || (props.Type === "Memory" && !ButtonText.includes(props.memoryType))) ? "space-between" : "center"}}>
        {((props.Type === "Motherboard" && !ButtonText.includes(props.CurrentSocket)) || (props.Type === "Memory" && !ButtonText.includes(props.memoryType))) && <div className='toolTip'> <div className='Exclamation'>!</div> <div className='Text'>This Item isn't compatible</div> </div>}
      
        {ButtonText}
        
        <div>{" "}</div>
        </div>
       

       <DropDownItems 

        Display = {Visible}
        Models = {   

                      props.Type === "CPU" ? CPUS : 
                      props.Type === "GPU" ? GPUS : 
                      props.Type === "Motherboard" ? Motherboards :
                      props.Type === "Memory" ? Memory : 
                      props.Type === "Storage" ? Storage : 
                      props.Type === "Case" ? Cases :
                      props.Type === "PSU" ? PSUS : CPUS

                  }
        Type = {props.Type}
        CurrentSocket = {props.CurrentSocket}
        CurrentFormFactor = {props.CurrentFormFactor}
        memoryType = {props.memoryType}
        
        />
       
       
       </button>

      
       
    </div>
   

  )

  function DropDownItems(props){

    return (
      
      <div className='Items' style={props.Display}>

          {
            
            props.Models.map((Items, index) => {
              
                    if(props.Type === "CPU"){ 

                    return (
                          
                            <div key = {index} className='Item' 
                            onClick={() => {
                              handleDropDownClick(
                              Items.model + ", " +
                              Items.socket + ", " +
                              Items.corecount + ", " +
                              Items.threadcount + ", " +
                              Items.corefrequency + ", " +
                              Items.nodeprocess + ", " +
                              "Цена: " + Items.price + "лв"
                              )
                            }} > 
                            {
                              Items.model + ", " +
                              Items.socket + ", " +
                              Items.corecount + ", " +
                              Items.threadcount + ", " +
                              Items.corefrequency + ", " +
                              Items.nodeprocess + ", " +
                              "Цена: " + Items.price + "лв"
                            }
                            </div>
                          
                    )} else if (props.Type === "GPU"){

                          return (

                            <div key = {index} className='Item' onClick={() => {handleDropDownClick(

                              Items.model + ", " +
                              Items.memory + ", " +
                              Items.corefrequency + ", " +
                              Items.boostcorefrequency +", " +
                              Items.interface +", " +
                              Items.tdp +", " +
                              "Цена: " + Items.price + "лв"

                            )}} > 
                            {

                              Items.model + ", " +
                              Items.memory + ", " +
                              Items.corefrequency +", " +
                              Items.boostcorefrequency +", " +
                              Items.interface +", " +
                              Items.tdp +", " +
                              "Цена: " + Items.price + "лв"

                            }
                            </div>

                          )

                    } else if (props.Type === "Motherboard"){
                      return (
                            <div style = {Items.socket + ", " !== props.CurrentSocket ? { display: 'none'} : console.log("passed")} key = {index} className='Item' onClick={() => {handleDropDownClick(
                              Items.model + ", " +
                              Items.socket + ", " +
                              Items.chipset + ", " +
                              Items.memory + ", " +
                              Items.formfactor + ", " +
                              "Цена: " + Items.price + "лв"
                            )}} > 
                            {
                              Items.socket + ", " === props.CurrentSocket ?
                              Items.model + ", " +
                              Items.socket + ", " +
                              Items.chipset + ", " +
                              Items.memory + ", " +
                              Items.formfactor + ", " +   
                              "Цена: " + Items.price + "лв"
                              :
                              "Incompatible"
                            }
                            </div>
                      )
                    } else if (props.Type === "Memory"){
                        return (

                              <div style = {Items.speed.includes(props.memoryType) ? console.log("passed") : { display: 'none'}} key = {index} className='Item' onClick={() => {handleDropDownClick(

                                Items.model + ", " +
                                Items.size + ", " +
                                Items.speed +", " +
                                Items.latency +", " +
                                "Цена: " + Items.price + "лв"

                              )}} > 
                              {
                                
                              

                                Items.model + ", " +
                                Items.size + ", " +
                                Items.speed +", " +
                                Items.latency +", " +
                                "Цена: " + Items.price + "лв"

                              }
                              </div>

                        )

                    } else if (props.Type === "Storage"){

                    return (

                          <div key = {index} className='Item' onClick={() => {handleDropDownClick(

                            Items.model + ", " +
                            Items.size + ", " +
                            Items.interface +", " +
                            Items.speed +", " +
                            "Цена: " + Items.price + "лв"

                          )}} > 
                          {
                            
                          

                            Items.model + ", " +
                            Items.size + ", " +
                            Items.interface +", " +
                            Items.speed +", " +
                            "Цена: " + Items.price + "лв"

                          }
                          </div>

                    )

                    } else if (props.Type === "Case"){

                      return (

                            <div  style = {checkWeight(ffWeight, Items.size) ? console.log("passed"):{ display: 'none'} }  key = {index} className='Item' onClick={() => {handleDropDownClick(

                              Items.model + ", " +
                              Items.formfactor + ", " +
                              Items.size +", " +
                              Items.color +", " +
                              "Цена: " + Items.price + "лв"

                            )}} > 
                            {
                              
                              Items.model + ", " +
                              Items.formfactor + ", " +
                              Items.size +", " +
                              Items.color +", " +
                              "Цена: " + Items.price + "лв"

                            }
                            </div>

                      )

                    } else if (props.Type === "PSU"){

                          return (

                                <div key = {index} className='Item' onClick={() => {handleDropDownClick(

                                  Items.model + ", " +
                                  Items.powerstandard + ", " +
                                  Items.power +", " +
                                  Items.formfactor +", " +
                                  Items.usability +", " +
                                  "Цена: " + Items.price + "лв"

                                )}} > 
                                {
                                  
                                  Items.model + ", " +
                                  Items.powerstandard + ", " +
                                  Items.power +", " +
                                  Items.formfactor +", " +
                                  Items.usability +", " +
                                  "Цена: " + Items.price + "лв"

                                }
                                </div>

                          )

                    }

             

            })

          }
       
      </div>

    )

  }
  
}