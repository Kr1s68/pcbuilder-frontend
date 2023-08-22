import React from 'react'
import axios from 'axios'
import './ItemInfo.css'
import { Roller } from 'react-awesome-spinners';
import e from 'cors';

export default function ItemInfo(props) {

  const [itemInfo,setItemInfo] = React.useState({
    data:[{
      price:"Loading Price..."
    }]
  })
  const [isLoaded, setIsLoaded] = React.useState(false)

  let params;
    try{
            params = new URLSearchParams([['Item', props.currentItem],['Price', props.currentPrice]]);
    }catch{

    }

  const loadPrices = async () => {
        await axios.get(`https://pcbuilder-api.onrender.com/api/data/getItemInfo`,{ params }).then((response) => {
          setItemInfo(response)
          setIsLoaded(true)
        })  
  }

  React.useEffect(()=>{
    setIsLoaded(false)
    loadPrices()
  },[0, props.dep])

  console.log(itemInfo)


  return (
      <div className='priceDiv' style={isLoaded?{transition:props.height, display:props.display, marginBottom: e.nameOfStore === undefined && "20px"} : {display:props.display, height:"250px"}}>
      {
        isLoaded ? itemInfo.data.map((e,i) => {
          return (
            e!==null && <div id = {i} style={{color:"white", transition:props.height}}>
              <a className = 'priceText' id = {i*69} href={e!== null ? e.linkToStore : "https://genial.ly/404"} style = {{textDecoration:"none", color:"white"}}>
                {e.nameOfStore === undefined ? <div style={{display:"flex", flexDirection:"row",justfyContent:"center", marginRight:"-235px",fontWeight:"bold",fontSize:"24px"}}>This item is out of stock</div> :   e.nameOfStore + ": " + e.price + "лв"}
              </a> 
            </div>
          )
        }) : <div style={{display:"flex", flexDirection:"row",justfyContent:"center", marginRight:"-150px",minHeight:"320px"}}> <Roller/> </div>
      }
      </div>
  )
}
