import React, { useState } from "react";
const CounterApp=()=>{
     const[count,setCount]=useState(0);
      const increment=()=>{
          setCount(prev=>prev + 1)
      }
        const decrement=()=>{
        setCount(prev=>prev - 1)
      }
        const reset=()=>{
        setCount(0)
      }
    return(
        <div><h1 style={{fontSize:"100px"}}>Counter App</h1>
        <h2>{count}</h2>
        <div style={{display:'flex',gap:'10px',justifyContent:'center'}}>
        <button onClick={()=>increment()}>➕Increment</button>
        <button onClick={()=>decrement()}>➖Decrement</button>
        <button onClick={()=>reset()}>🔁Reset</button></div>
      </div>  
    )
}
export default CounterApp
 
      