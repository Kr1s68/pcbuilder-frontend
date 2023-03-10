import React from 'react';
import DropDown from './DropDown';
import './CSS-Elements/MainBody.css';
import Axios from 'axios';
import { Link, useNavigate} from 'react-router-dom'
import { useAuth } from './Contexts/AuthContexts'
import ProgressBar from './ProgressBar';
import ItemInfo from './WebScrapingElements/ItemInfo';
import { Toaster } from 'react-hot-toast';
import { toast } from 'react-hot-toast';
import { CBRef } from '../firebase';
import { addDoc } from 'firebase/firestore';
//TODO: Transfer the Performance index to the Saved Build in the DATABASE : DONE


export default function MainBody (props){

  let [storages, setStorages] = React.useState([1])

  let [storageInformation, setStorageInformation] = React.useState([])

  let [sockets, setSockets] = React.useState(undefined)

  let [formFactor, setFormFactor] = React.useState(undefined);

  let [memoryType, setMemoryType] = React.useState(undefined);

  let [total, setTotal] = React.useState(0)

  let [pageHeight, setPageHeight] = React.useState(1905)

  let [priceHeight, setPriceHeight] = React.useState({
    CPU:"0px",
    Motherboard:"0px",
    GPU:"0px",
    Memory:"0px",
    Storage:"0px",
    Case:"0px",
    PSU:"0px",
  });

  let [priceDisplaye, setPriceDisplay] = React.useState({
    CPU:"none",
    Motherboard:"none",
    GPU:"none",
    Memory:"none",
    Storage:"none",
    Case:"none",
    PSU:"none",
  });

  let [priceShown, setPriceShown] = React.useState({
    CPU:false,
    Motherboard:false,
    GPU:false,
    Memory:false,
    Storage:false,
    Case:false,
    PSU:false,
  })

  let [arrowRotation, setArrowRotation] = React.useState({
    CPU:"",
    Motherboard:"",
    GPU:"",
    Memory:"",
    Storage:"",
    Case:"",
    PSU:"",
  })

  let [itemArray, setItemArray] = React.useState();

  

  
  const { currentUser, logout } = useAuth()

  //TODO: Make all the compatibility work correctly : DONE
  //TODO: Make tooltips for the compatibility checker : DONE

  const [pickedUser, setPickedUser] = React.useState()

  const [users, setUsers] = React.useState([])

  const [displayable, setDisplayable] = React.useState("none")

  const [centerable, setCenterable] = React.useState("center")

  let [iterator, setIterator] = React.useState(0)

  let finishedBuild = false

  let [isLoaded, setIsLoaded] = React.useState(props.isLoaded);

  const Navigate = useNavigate()

  React.useEffect(() => {
    if(isLoaded && iterator < 5){
      getLength(props.loadedBuild.Storage)
    }
  },[iterator])
  
  
  const [currentBuild, setCurrentBuild ] = React.useState({

    user:'',
    CPU: "",
    Motherboard : "",
    GPU: "",
    Memory: "",
    Storage: "",
    Case: "",
    PSU: "",
    PRICE: ""

})

const [perfIndex, setPerfIndex] = React.useState(0)

const [prevCPUPerfIndex, setPrevCPUPerfIndex] = React.useState(0)
const [prevGPUPerfIndex, setPrevGPUPerfIndex] = React.useState(0)
const [prevMemoryPerfIndex, setPrevMemoryPerfIndex] = React.useState(0)





if(
  isLoaded ||
  (currentBuild.CPU &&
  currentBuild.Motherboard &&
  currentBuild.GPU &&
  currentBuild.Memory &&
  currentBuild.Storage &&
  currentBuild.Case &&
  currentBuild.PSU)
){
  finishedBuild = true
}
//console.log(currentBuild)


const saveBuild= () => {
  if(!finishedBuild){
    console.log("unfinished build")
    toast.error("Please finish your build")
 }else if(currentUser){
  if(isLoaded){
    setCurrentBuild(prevBuild => ({
      ...prevBuild, PRICE: props.loadedBuild.PRICE, Motherboard:props.loadedBuild.Motherboard
    }))
  }
      /*Axios.post(`https://pc-builder-api.herokuapp.com/api/data/saveBuild`,{ 
        currentBuild
    }).then(() => console.log('success'))*/
    addDoc(CBRef,{
      ...currentBuild
    })
    .then(() => {
      console.log("success")
      toast.success("build saved")
    })
  }else{
    Navigate("/signup")
  }
}

  /*
  const getUsers = () => {

    Axios.get('http://localhost:3001/checkAdmin',{ 

    }).then((response) => setUsers(response.data))


}*/

  const [CPUS, setCPUS] = React.useState([])

  const getCpus = () => {

    Axios.get(`https://pc-builder-api.herokuapp.com/api/data/Cpus`,{ 

    }).then((response) => setCPUS(response.data))


}

const [Motherboards, setMotherboards] = React.useState([])

const getMotherboards = () => {

  Axios.get(`https://pc-builder-api.herokuapp.com/api/data/Motherboards`,{ 

  }).then((response) => setMotherboards(response.data))


}

const [GPUS, setGPUS] = React.useState([])

const getGPUS = () => {

  Axios.get(`https://pc-builder-api.herokuapp.com/api/data/GPUS`,{ 

  }).then((response) => setGPUS(response.data))


}

const [Memory, setMemory] = React.useState([])

const getMemory = () => {

  Axios.get(`https://pc-builder-api.herokuapp.com/api/data/Memory`,{ 

  }).then((response) => setMemory(response.data))


}

const [Storage, setStorage] = React.useState([])

const getStorage = () => {

  Axios.get(`https://pc-builder-api.herokuapp.com/api/data/Storage`,{ 

  }).then((response) => setStorage(response.data))


}

const [Cases, setCases] = React.useState([])

const getCases = () => {

  Axios.get(`https://pc-builder-api.herokuapp.com/api/data/Cases`,{ 

  }).then((response) => setCases(response.data))


}

const [PSUS, setPSUS] = React.useState([])

const getPSUS = () => {

  Axios.get(`https://pc-builder-api.herokuapp.com/api/data/PSUS`,{ 

  }).then((response) => setPSUS(response.data))


}


React.useEffect(() => {
  getCpus();
  getMotherboards();
  getGPUS();
  getMemory();
  getStorage();
  getCases();
  getPSUS();
  //getUsers();
}, []);


const [cpuIterator, setCPUIterator] = React.useState(0);
const [gpuIterator, setGPUIterator] = React.useState(80);
const [memoryIterator, setMemoryIterator] = React.useState(40);


React.useEffect(() => {
  if(isLoaded){
    CPUS.map((i,e) => {
      if(props.loadedBuild.CPU.includes(i.Model)){
        console.log(props.loadedBuild.CPU + " " + i.PerfIndex)
        setPerfIndex((perfIndex-prevCPUPerfIndex)+i.PerfIndex)
        setPrevCPUPerfIndex(i.PerfIndex)
      }
    })
    if(cpuIterator<80){
      setCPUIterator(cpuIterator+1)
      console.log("cpuI" + cpuIterator)
    }
  }else{
    CPUS.map((i,e) => {
      if(currentBuild.CPU.includes(i.Model)){
        console.log(i.Model + " " + i.PerfIndex)
        setPerfIndex((perfIndex-prevCPUPerfIndex)+i.PerfIndex)
        setPrevCPUPerfIndex(i.PerfIndex)
      }
    })
  }
},[ cpuIterator, currentBuild.CPU])
React.useEffect(()=>{
  if(isLoaded){
    Memory.map((i,e) => {
      if(props.loadedBuild.Memory.includes(i.Model) && cpuIterator > 38){
        console.log(i.Model + " " + i.PerfIndex)
        setPerfIndex((perfIndex-prevMemoryPerfIndex) + i.PerfIndex)
        setPrevMemoryPerfIndex(i.PerfIndex)
      }
    })
    if(cpuIterator > 78 && memoryIterator<160){
      setMemoryIterator(memoryIterator+1)
      console.log("memI: " + memoryIterator)
    }
  }else{
    Memory.map((i,e) => {
      if(currentBuild.Memory.includes(i.Model)){
        console.log(i.Model + " " + i.PerfIndex)
        setPerfIndex((perfIndex-prevMemoryPerfIndex)+i.PerfIndex)
        setPrevMemoryPerfIndex(i.PerfIndex)
      }
    })
  }
  
},[memoryIterator,cpuIterator,currentBuild.Memory])
React.useEffect(()=>{
  if(isLoaded){
    GPUS.map((i,e) => {
      if(props.loadedBuild.GPU.includes(i.Model) && memoryIterator > 78){
        console.log(props.loadedBuild.GPU + " " + i.PerfIndex)
        setPerfIndex((perfIndex-prevGPUPerfIndex)+i.PerfIndex)
        setPrevGPUPerfIndex(i.PerfIndex)
      }
    })
    if(memoryIterator > 158 &&  gpuIterator < 220){
      setGPUIterator(gpuIterator+1)
      console.log("GpuI:"+gpuIterator)
    }
  }else{
    GPUS.map((i,e) => {
      if(currentBuild.GPU.includes(i.Model)){
        console.log(i)
        setPerfIndex((perfIndex-prevGPUPerfIndex)+i.PerfIndex)
        setPrevGPUPerfIndex(i.PerfIndex)
      }
    })
  }
},[gpuIterator,memoryIterator,currentBuild.GPU])

console.log(perfIndex)


React.useEffect(() => {

    
    try{

      currentUser.isAdmin ? setDisplayable("block") : console.log("no admin")
      currentUser.isAdmin ? setCenterable("end") : console.log("no admin")
      setCurrentBuild(Build => ({

        ...Build, user : currentUser.email 
    
        }))

    }catch{
      
      
    }
      
    
      
}, [currentUser, pickedUser, users]);


  function setCPU(part){

    setCurrentBuild(Build => ({

    ...Build, CPU : part

    }))

  }

  function setMotherboard(part){

    setCurrentBuild(Build => ({

      ...Build, Motherboard : part 

    }))

  }

  function setGPU(part){

      setCurrentBuild(Build => ({

      ...Build, GPU : part 

    }))

  }

  function setMemoryModules(part){

    setCurrentBuild(Build => ({

      ...Build, Memory : part 

    }))

  }


  function setStorageModule(part, iteration){

    if(!currentBuild.Storage){
      setCurrentBuild(Build => ({
        
        ...Build, Storage : part 
  
      }))
    }else{
      setCurrentBuild(Build => ({
        
        ...Build, Storage : Build.Storage + "||" + part 
  
      }))
    }
    
    
    
    

  }

  function setCase(part){

    setCurrentBuild(Build => ({

      ...Build, Case : part 

    }))
    
  }

  function setPSU(part){

    setCurrentBuild(Build => ({

      ...Build, PSU : part

    }))

  }

  function getLength(Part){


      setStorageInformation(Part.split("||"))
      setStorages(storageInformation)
      setIterator(iterator++)
      setPageHeight(pageHeight+=160)
        
  }


  function handleClick(){ 

    setStorages([...storages, storages+=1])
    setPageHeight(pageHeight+=160)
   
  }

  function getFormFactor(Part){

    let SemiSubstrPart = Part.substr(Part.indexOf('Размер:') + 8, Part.indexOf(','))
    const CalcualtedPart = SemiSubstrPart.substr(0, SemiSubstrPart.indexOf(','))

    setFormFactor(CalcualtedPart)


  }

  function getSocket(Part){

    let SemiSubstrPart = Part.substr(Part.indexOf('Сокет:'), Part.indexOf(','))
    const CalcualtedPart = SemiSubstrPart.substr(0, SemiSubstrPart.indexOf(',')+2)

    setSockets(CalcualtedPart)

  }

  function getMemoryType(Part){

    let SemiSubstrPart = Part.substr(Part.indexOf('Тип на паметта:') + 16, Part.indexOf(','))
    const CalcualtedPart = SemiSubstrPart.substr(0, SemiSubstrPart.indexOf(','))

    setMemoryType(CalcualtedPart)

  }

  function getItemArray(itemArray){
    setItemArray(itemArray)
  }
  console.log(itemArray);

  function showPrices(Type){

    switch(Type){
      case "CPU":
        if(priceShown.CPU){
          setPriceShown(prevPriceShown => ({
             ...prevPriceShown, CPU : false
          }))
          setPriceDisplay(Display => ({
            ...Display, CPU : "none"
          }))
          setPageHeight(pageHeight-600)
          setPriceHeight(PriceHeight => ({
            ...PriceHeight, CPU : "translateY(-100%)"
          }))
          setArrowRotation(ArrowRotation => ({
            ...ArrowRotation, CPU : "rotate(360deg)"
          }))
        }else{
          setPriceShown(prevPriceShown => ({
              ...prevPriceShown, CPU : true
          }))
          setPriceDisplay(Display => ({
            ...Display, CPU : "grid"
          }))
          setPageHeight(pageHeight+600)
          setPriceHeight(PriceHeight => ({
            ...PriceHeight, CPU : "translateY(0%)"
          }))
          setArrowRotation(ArrowRotation => ({
            ...ArrowRotation, CPU : "rotate(179deg)"
          }))

        }
      break;
      case "Motherboard":
        if(priceShown.Motherboard){
          setPriceShown(prevPriceShown => ({
               ...prevPriceShown, Motherboard : false
          }))
          setPriceDisplay(Display => ({
              ...Display, Motherboard : "none"
          }))
          setPageHeight(pageHeight-600)
          setPriceHeight(PriceHeight => ({
              ...PriceHeight, Motherboard : 0
          }))
          setArrowRotation(ArrowRotation => ({
            ...ArrowRotation, Motherboard : "rotate(360deg)"
          }))
        }else{
          setPriceShown(prevPriceShown => ({
              ...prevPriceShown, Motherboard : true
          }))
          setPriceDisplay(Display => ({
            ...Display, Motherboard : "grid"
          }))
          setPageHeight(pageHeight+600)
          setPriceHeight(PriceHeight => ({
            ...PriceHeight, Motherboard : 700
        }))
        setArrowRotation(ArrowRotation => ({
          ...ArrowRotation, Motherboard : "rotate(179deg)"
        }))
          }
      break;
      case "GPU":
        if(priceShown.GPU){
          setPriceShown(prevPriceShown => ({
               ...prevPriceShown, GPU : false
          }))
          setPriceDisplay(Display => ({
              ...Display, GPU : "none"
          }))
          setPageHeight(pageHeight-500)
          setPriceHeight(PriceHeight => ({
              ...PriceHeight, GPU : 0
          }))
          setArrowRotation(ArrowRotation => ({
            ...ArrowRotation, GPU : "rotate(360deg)"
          }))
        }else{
          setPriceShown(prevPriceShown => ({
              ...prevPriceShown, GPU : true
          }))
          setPriceDisplay(Display => ({
            ...Display, GPU : "grid"
          }))
          setPageHeight(pageHeight+500)
          setPriceHeight(PriceHeight => ({
            ...PriceHeight, GPU : 700
        }))
        setArrowRotation(ArrowRotation => ({
          ...ArrowRotation, GPU : "rotate(179deg)"
        }))
          }
      break;
      case "Memory":
        if(priceShown.Memory){
          setPriceShown(prevPriceShown => ({
               ...prevPriceShown, Memory : false
          }))
          setPriceDisplay(Display => ({
              ...Display, Memory : "none"
          }))
          setPageHeight(pageHeight-500)
          setPriceHeight(PriceHeight => ({
              ...PriceHeight, Memory : 0
          }))
          setArrowRotation(ArrowRotation => ({
            ...ArrowRotation, Memory : "rotate(360deg)"
          }))
        }else{
          setPriceShown(prevPriceShown => ({
              ...prevPriceShown, Memory : true
          }))
          setPriceDisplay(Display => ({
            ...Display, Memory : "grid"
          }))
          setPageHeight(pageHeight+500)
          setPriceHeight(PriceHeight => ({
            ...PriceHeight, Memory : 700
        }))
        setArrowRotation(ArrowRotation => ({
          ...ArrowRotation, Memory : "rotate(179deg)"
        }))
          }
      break;
      case "Storage":
        if(priceShown.Storage){
          setPriceShown(prevPriceShown => ({
               ...prevPriceShown, Storage : false
          }))
          setPriceDisplay(Display => ({
              ...Display, Storage : "none"
          }))
          setPageHeight(pageHeight-500)
          setPriceHeight(PriceHeight => ({
              ...PriceHeight, Storage : 0
          }))
          setArrowRotation(ArrowRotation => ({
            ...ArrowRotation, Storage : "rotate(360deg)"
          }))
        }else{
          setPriceShown(prevPriceShown => ({
              ...prevPriceShown, Storage : true
          }))
          setPriceDisplay(Display => ({
            ...Display, Storage : "grid"
          }))
          setPageHeight(pageHeight+500)
          setPriceHeight(PriceHeight => ({
            ...PriceHeight, Storage : 700
        }))
        setArrowRotation(ArrowRotation => ({
          ...ArrowRotation, Storage : "rotate(179deg)"
        }))
          }
      break;
      case "Case":
        if(priceShown.Case){
          setPriceShown(prevPriceShown => ({
               ...prevPriceShown, Case : false
          }))
          setPriceDisplay(Display => ({
              ...Display, Case : "none"
          }))
          setPageHeight(pageHeight-500)
          setPriceHeight(PriceHeight => ({
              ...PriceHeight, Case : 0
          }))
          setArrowRotation(ArrowRotation => ({
            ...ArrowRotation, Case : "rotate(360deg)"
          }))
        }else{
          setPriceShown(prevPriceShown => ({
              ...prevPriceShown, Case : true
          }))
          setPriceDisplay(Display => ({
            ...Display, Case : "grid"
          }))
          setPageHeight(pageHeight+500)
          setPriceHeight(PriceHeight => ({
            ...PriceHeight, Case : 700
        }))
        setArrowRotation(ArrowRotation => ({
          ...ArrowRotation, Case : "rotate(179deg)"
        }))
          }
      break;
      case "PSU":
        if(priceShown.PSU){
          setPriceShown(prevPriceShown => ({
               ...prevPriceShown, PSU : false
          }))
          setPriceDisplay(Display => ({
              ...Display, PSU : "none"
          }))
          setPageHeight(pageHeight-500)
          setPriceHeight(PriceHeight => ({
              ...PriceHeight, PSU : 0
          }))
          setArrowRotation(ArrowRotation => ({
            ...ArrowRotation, PSU : "rotate(360deg)"
          }))
        }else{
          setPriceShown(prevPriceShown => ({
              ...prevPriceShown, PSU : true
          }))
          setPriceDisplay(Display => ({
            ...Display, PSU : "grid"
          }))
          setPageHeight(pageHeight+500)
          setPriceHeight(PriceHeight => ({
            ...PriceHeight, PSU : 700
        }))
        setArrowRotation(ArrowRotation => ({
          ...ArrowRotation, PSU : "rotate(179deg)"
        }))
          }
      break;

        default: console.log("default")
    }

   
   
  }

  function getPrice(Price, PrevPrice){

    let CalcualtedPrevPrice
    let SemiSubstrPrevPrice
    
    let SemiSubstrPrice 
    let CalcualtedPrice

   

      SemiSubstrPrice = Price.substr(Price.indexOf('Цена:') + 6, Price.indexOf('лв'))
      CalcualtedPrice = parseInt(SemiSubstrPrice.substr(0, SemiSubstrPrice.indexOf('лв')))

    
    

    //PrevPrice === 0 ? CalcualtedPrevPrice = 0 : SemiSubstrPrevPrice = PrevPrice.substr(PrevPrice.indexOf('Цена:') + 6, PrevPrice.indexOf('лв')); CalcualtedPrevPrice = parseInt(SemiSubstrPrevPrice.substr(0, SemiSubstrPrevPrice.indexOf('лв')))

    if(PrevPrice.includes('Choose') || PrevPrice.includes('Incompatible')){

      CalcualtedPrevPrice = 0

    }else{

      SemiSubstrPrevPrice = PrevPrice.substr(PrevPrice.indexOf('Цена:') + 6, PrevPrice.indexOf('лв')) 
      CalcualtedPrevPrice = parseInt(SemiSubstrPrevPrice.substr(0, SemiSubstrPrevPrice.indexOf('лв')))

    }

    if(Price.includes('Incompatible'))
    {

     console.log("Incompatible")

    }else{
      if(isLoaded){
        setTotal(total = props.loadedBuild.PRICE)
      }else{
        setTotal(total+=(CalcualtedPrice - CalcualtedPrevPrice))
        setCurrentBuild(Build => ({

          ...Build, PRICE : total
    
        }))
      }
      

    }

  }

  return (
    
  <div className="MainDiv" style={{

      height : pageHeight

  }}>
    <Toaster
    position="top-center"
    reverseOrder={false}
    />

    <div className = "BuildTitleDiv" style={{flexDirection:"row", alignItems:"center", justifyContent:centerable, width:"100%"}}>

    <div className='CurrrentBuildDiv' style={{}}> Current Build: </div>

      <Link 
      className='fa fa-gear LinkText' 
      style={{fontSize:"39px", textDecoration:'none', color:'white', marginTop:"32px", marginLeft:"38.5vw", marginRight:"3.3vw", display:displayable }} 
      to = "/addCpus">
      </Link>
    
    </div>

    <div className='MobileBuildTitleDiv'>Current Build: </div>
    
      <div className='Components'>

        <p><button className='emptyButton'></button> CPU:  <button className='itemInfoButton' name='CPUButton' style={{transform:arrowRotation.CPU}} onClick = {() => showPrices("CPU")}><img src="https://img.icons8.com/ios/100/null/expand-arrow--v1.png" alt='balls'/></button></p>

        <DropDown

        Type = "CPU"
        CPUS = {CPUS}
        getSocket = {getSocket}
        getPrice = {getPrice}
        setCPU = {setCPU}
        isLoaded = {isLoaded}
        loadedBuild = {props.loadedBuild}
        setIsLoaded = {setIsLoaded}
        name = "CPU"
        
        />

      </div>
    
     {
      currentBuild.CPU !== '' && <ItemInfo dep = {currentBuild.CPU} setItemArray = {getItemArray} height = {priceHeight.CPU} display = {priceDisplaye.CPU} currentItem = {currentBuild.CPU.substring(0,currentBuild.CPU.indexOf(','))} currentPrice = {currentBuild.CPU.substring(currentBuild.CPU.indexOf("Цена:") + 6,currentBuild.CPU.indexOf('лв'))} />
     } 

   
    <div className='Components'>

      <p> <button className='emptyButton'></button> Motherboard: <button className='itemInfoButton' style={{transform:arrowRotation.Motherboard}} onClick = { () => showPrices("Motherboard")}><img src="https://img.icons8.com/ios/100/null/expand-arrow--v1.png" alt='balls'/></button> </p>

      <DropDown

      Type = "Motherboard"
      Motherboards = {Motherboards}
      CurrentSocket = {sockets}
      getPrice = {getPrice}
      getFormFactor = {getFormFactor}
      getMemoryType = {getMemoryType}
      setMotherboard = {setMotherboard}
      setIsLoaded = {setIsLoaded}
      isLoaded = {isLoaded}
      loadedBuild = {props.loadedBuild}
      name = "Motherboard"
      

      />

    </div>

    {currentBuild.Motherboard !== '' && <ItemInfo dep = {currentBuild.Motherboard} setItemArray = {getItemArray} height = {priceHeight.Motherboard} display = {priceDisplaye.Motherboard} currentItem = {currentBuild.Motherboard.substring(0,currentBuild.Motherboard.indexOf(','))} currentPrice = {currentBuild.Motherboard.substring(currentBuild.Motherboard.indexOf("Цена:") + 6,currentBuild.Motherboard.indexOf('лв'))} />} 

    <div className='Components'>

      <p> <button className='emptyButton'></button> Graphics Card:  <button className='itemInfoButton' style={{transform:arrowRotation.GPU}} onClick = {() => showPrices("GPU")}><img src="https://img.icons8.com/ios/100/null/expand-arrow--v1.png" alt='balls'/></button></p>

      <DropDown

      Type = "GPU"
      GPUS = {GPUS}
      getPrice = {getPrice}
      setGPU = {setGPU}
      setIsLoaded = {setIsLoaded}
      isLoaded = {isLoaded}
      loadedBuild = {props.loadedBuild}
      name = "GPU"


      />


    </div>

    {currentBuild.GPU !== '' && <ItemInfo dep = {currentBuild.GPU} setItemArray = {getItemArray} height = {priceHeight.GPU} display = {priceDisplaye.GPU} currentItem = {currentBuild.GPU.substring(0,currentBuild.GPU.indexOf(','))} currentPrice = {currentBuild.GPU.substring(currentBuild.GPU.indexOf("Цена:") + 6,currentBuild.GPU.indexOf('лв'))} />} 

    <div className='Components'>

      <p> <button className='emptyButton'></button> Memory:  <button className='itemInfoButton' style={{transform:arrowRotation.Memory}} onClick = {() => showPrices("Memory")}><img src="https://img.icons8.com/ios/100/null/expand-arrow--v1.png" alt='balls'/></button></p>

      <DropDown

      Type = "Memory"
      Memory = {Memory}
      getPrice = {getPrice}
      setMemory = {setMemoryModules}
      setIsLoaded = {setIsLoaded}
      memoryType = {memoryType}
      isLoaded = {isLoaded}
      loadedBuild = {props.loadedBuild}
      name = "Memory"

      />


    </div>

    {currentBuild.Memory !== '' && <ItemInfo dep = {currentBuild.Memory} setItemArray = {getItemArray} height = {priceHeight.Memory} display = {priceDisplaye.Memory} currentItem = {currentBuild.Memory.substring(0,currentBuild.Memory.indexOf(','))} currentPrice = {currentBuild.Memory.substring(currentBuild.Memory.indexOf("Цена:") + 6,currentBuild.Memory.indexOf('лв'))} />} 

      <button className='Plus' onClick={handleClick}> + </button>
      
      {
      
      storages.map((e, i) =>  

        {

          return (
            
            <>
              <div className='Components' key={i}>

              <p> <button className='emptyButton'></button> Storage:  <button className='itemInfoButton' style={{transform:arrowRotation.Storage}} onClick = {() => showPrices("Storage")}><img src="https://img.icons8.com/ios/100/null/expand-arrow--v1.png" alt='balls'/></button></p>

              <DropDown

              iteration = {i}
              Type = "Storage"
              Storage = {Storage}
              onClick = {handleClick}
              getPrice = {getPrice}
              setStorage = {setStorageModule}
              setIsLoaded = {setIsLoaded}
              setStorageInformation = {getLength}
              Item = {e}
              isLoaded = {isLoaded}
              loadedBuild = {props.loadedBuild}
              name = "Storage"

              />

              </div>

              {currentBuild.Storage !== '' && <ItemInfo dep = {currentBuild.Storage} setItemArray = {getItemArray} height = {priceHeight.Storage} display = {priceDisplaye.Storage} currentItem = {currentBuild.Storage.substring(0,currentBuild.Storage.indexOf(','))} currentPrice = {currentBuild.Storage.substring(currentBuild.Storage.indexOf("Цена:") + 6,currentBuild.Storage.indexOf('лв'))} />} 

            </>
            
            
            
          )

        }
        
      )}

               

    <div className='Components'>

      <p> <button className='emptyButton'></button> Case:  <button className='itemInfoButton' style={{transform:arrowRotation.Case}} onClick = {() => showPrices("Case")}><img src="https://img.icons8.com/ios/100/null/expand-arrow--v1.png" alt='balls'/></button></p>

      <DropDown

      Type = "Case"
      Cases = {Cases}
      getPrice = {getPrice}
      setIsLoaded = {setIsLoaded}
      currentFormFactor = {formFactor}
      setCase = {setCase}
      isLoaded = {isLoaded}
      loadedBuild = {props.loadedBuild}
      name = "Case"


      />


    </div>

    {currentBuild.Case !== '' && <ItemInfo dep = {currentBuild.Case} setItemArray = {getItemArray} height = {priceHeight.Case} display = {priceDisplaye.Case} currentItem = {currentBuild.Case.substring(0,currentBuild.Case.indexOf(','))} currentPrice = {currentBuild.Case.substring(currentBuild.Case.indexOf("Цена:") + 6,currentBuild.Case.indexOf('лв'))} />} 

    <div className='Components'>

      <p> <button className='emptyButton'></button> Power Supply:  <button className='itemInfoButton' style={{transform:arrowRotation.PSU}} onClick = {() => showPrices("PSU")}><img src="https://img.icons8.com/ios/100/null/expand-arrow--v1.png" alt='balls'/></button></p>

      <DropDown

      Type = "PSU"
      PSUS = {PSUS}
      getPrice = {getPrice}
      setPSU = {setPSU}
      setIsLoaded = {setIsLoaded}
      isLoaded = {isLoaded}
      loadedBuild = {props.loadedBuild}
      name = "PSU"

      />


    </div>

    {currentBuild.PSU !== '' && <ItemInfo dep = {currentBuild.PSU} setItemArray = {getItemArray} height = {priceHeight.PSU} display = {priceDisplaye.PSU} currentItem = {currentBuild.PSU.substring(0,currentBuild.PSU.indexOf(','))} currentPrice = {currentBuild.PSU.substring(currentBuild.PSU.indexOf("Цена:") + 6,currentBuild.PSU.indexOf('лв'))} />} 

    <div className='Components'>
      <p> <button className='emptyButton'></button> Relative performance: <button className='emptyButton'></button> </p>
      <ProgressBar  bgcolor={"-webkit-linear-gradient(180deg,rgb(255, 0, 179), rgb(4, 0, 255))"} completed = {perfIndex*3.33}/>
    </div>
   <div className='BottomDiv'>
      <div className='Total'>{"Total: " + total + "лв"}   </div> 
      <button className = 'StorageButton' onClick={handleClick}> Add Storage </button>
      <button onClick={saveBuild}>save build</button>
    </div>
  </div>
  )
}





