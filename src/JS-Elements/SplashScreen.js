import './CSS-Elements/App.css';

export default function SplashScreen(){

    return(


        <div className="MainSplashScreenDiv"> 

            <h1 style={{
                
                        color: "rgb(231, 227, 231)",
                        paddingInline: "8vw", 
                        paddingTop: "4vw",
                        paddingBottom: "3vh"
                    
                      }}>
            
            This is the place to configure your next Build
            
            </h1>
            
            <div style={{
                
                color: "white",
                paddingInline: "8vw",
                minWidth: "900px", 
                paddingLeft: "8vw",
                paddingRight: "20vw",
                fontFamily: "Arial",
                fontSize: "20px",
                fontWeight: "bold"
            
              }}>   DreamBuilder is the best platform to configure and put together your next Build. 
                    With extensive guides and plenty of examples, we 
                    offer something that has been never offered before in the pc building space. <br></br>
                    <a href='/signup'> <button className="SignUpButton">Sign up now!</button> </a>
                  
            
            </div>







        </div>






    )







}