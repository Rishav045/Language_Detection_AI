import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [content, setContent] = useState("");
  const [txt, setTxt] = useState("Language");
  const getData = async()=>{
    await fetch(`http://rishav045.pythonanywhere.com/predict?text=${content}`,
    {
      method:'POST',
      mode:'cors',
      
    })
    .then((res) => res.json())
         .then((data) => {
            console.log(data);
            console.log(data.output)
            setTxt(data.output);
         })
         .catch((err) => {
            console.log(err.message);
         });
  }

  return (
    <div>
    <div >
      <input type="text" placeholder='Hi i am svatru ' onChange={(event)=>{setContent(event.target.value)}} style={{width:'500px' , height:'30px'}}></input>
      <h2>{content}</h2>
    </div>
    <div>
       
      <button onClick={getData}>Click me</button>
      <h1>{txt}</h1>
    </div>
    </div>
  )
}

export default App
