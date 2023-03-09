const ProgressBar = (props) => {
    const { bgcolor, completed } = props;
    console.log(completed)
  
    const containerStyles = {
      height: 40,
      width: '80%',
      backgroundColor: "#21262d",
      borderRadius: 50,
      margin: 12
    }
  
    const fillerStyles = {
      height: '100%',
      width: `${completed}%`,
      background: bgcolor,
      borderRadius: 'inherit',
      textAlign: 'right',
      display:'flex',
      flexDirection:'row',
      justifyContent:'center'
      
    }
  
    const labelStyles = {
      padding: 10,
      color: 'white',
      fontWeight: 'bold',
      marginLeft: completed === 0 && "70px"
    }
  
    return (
      <div style={containerStyles}>
        <div style={fillerStyles}>
          <span style={labelStyles}>{`${completed.toFixed(2)}%`}</span>
        </div>
      </div>
    );
  };
  
  export default ProgressBar;