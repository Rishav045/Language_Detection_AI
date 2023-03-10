import { useState, useEffect } from "react";
import "./App.css";
import { options } from "./utils/fetch";
import { languagesList } from "../languages";
import { languages } from "../languages";

const welcomes = [
  {lan: 'Malayalam', text: 'സ്വാഗതം'},
  {lan:'Hindi', text: 'स्वागत'},
  {lan: 'Tamil', text: 'வரவேற்பு'},
  {lan: 'Kannada', text: 'ಸ್ವಾಗತ'},
  {lan: 'French', text: 'BIENVENU'},
  {lan: 'Spanish', text: 'BIENVENIDO'},
  {lan: 'Portugeese', text: 'BEM-VINDO'},
  {lan: 'Italian', text: 'BENVENUTO'},
  {lan: 'Russian', text: 'ДОБРО ПОЖАЛОВАТЬ'},
  {lan: 'Sweedish', text: 'VÄLKOMMEN'},
  {lan: 'Dutch', text: 'WELKOM'},
  {lan: 'Arabic', text: 'مرحباً'},
  {lan: 'Turkish', text: 'HOŞ GELDİN'},
  {lan: 'German', text: 'WILLKOMMEN'},
  {lan: 'Danish', text: 'VELKOMMEN'},
  {lan: 'Greek', text: 'ΚΑΛΩΣ ΗΡΘΑΤΕ'},
  {lan: 'English', text: 'WELCOME'},
]

function App() {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("Hi");
  const [welcomesIndex, setWelcomesIndex] = useState(welcomes.length-1);
  const [translated, setTranslated] = useState("");
  const [txt, setTxt] = useState("English");
  const [val, setVal] = useState("");

  const encodedParams = new URLSearchParams();
encodedParams.append("q", content);
encodedParams.append("target", languages[val]);
encodedParams.append("source", languages[txt]);
console.log(import.meta.env.VITE_RAPID_API_KEY);
options['body']=encodedParams


  const getData = async () => {
    setLoading(true)
    await fetch(`https://rishav045.pythonanywhere.com/predict?text=${content}`, {
      method: "POST",
      mode: "cors",
    }).then((res) => res.json())
    .then((data) => {
      //console.log(data);
      //console.log(data.output);
      setTxt(data.output);
      setWelcomesIndex(welcomes.indexOf(welcomes.filter(item => item.lan.toLowerCase() === data.output?.toLowerCase())[0]))
      setLoading(false)
    })
    .catch((err) => {
        setLoading(false)
        console.log(err.message);
      });
  };

  const translate = async()=>{
    getData();
    console.log(options)
    if(!val || !txt)
    {
       setTranslated("Error:- Please select the language")
    }
    else{
      fetch('https://google-translate1.p.rapidapi.com/language/translate/v2', options)
    .then(response => response.json())
    .then(response => setTranslated(response.data.translations[0].translatedText))
    
    .catch(err => console.error(err));
    }
    
  }

  return (
    <div style={{  height: '100vh', overflowX: 'hidden' }} >
      <nav style={{ width: '100%', height: '50px', position: 'fixed', top: 0, left: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'wheat' }} >
        {/*<div style={{ width: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
          <motion.div initial={{ width: 0 }} animate={{ width: '100px' }} transition={{ duration: 0.5 }} style={{ overflow: 'hidden' }} >
            <h2 style={{ textAlign: 'center', color: '#000', }} >Svatru</h2>
          </motion.div>
        </div>*/}
        <h2 className="welcome" style={{ textAlign: 'center', color: '#000' }} >{welcomes[welcomesIndex]?.text}</h2>
      </nav>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }} >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >
          <h2 style={{ color: '#000' }} >I can detect <a href="#languages" style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }} >17 languages</a></h2>
          <input className="input" type="text" placeholder="Hi" value={content} onChange={(event) => {setContent(event.target.value)}} />
          <button disabled={loading} onClick={getData} style={{ color: loading ? '#000' : '#FFF', backgroundColor: loading ? '#5F5F5F' : '#000' }} >Detect Language</button>
          <h1 style={{ color: '#000', textAlign: 'center' }} >{txt}</h1>
          
          <input list="data" onChange={(e)=>setVal(e.target.value)} placeholder="Search Language"
          style={{padding:'10px',margin:'8px' ,borderRadius:'2px' ,width:'200px'}}/>
          <datalist id="data" >
            {
              languagesList.map((lan)=><option>{lan}</option>)
            }
          </datalist>
          {console.log(val)}
          <button disabled={loading} onClick={translate} style={{ color: loading ? '#000' : '#FFF', backgroundColor: loading ? '#5F5F5F' : '#000' }} >Translate</button>
          <h1 style={{ color: '#000', textAlign: 'center' }} >{translated}</h1>
        </div>
      </div>
      <footer id="languages" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', overflow: 'hidden', padding: '1rem 0', backgroundColor: '#000' }} >
        <div style={{ width: '90%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }} >
          <ul style={{ display: 'flex', justifyContent: 'start', flexDirection: 'column', padding: 0, margin: 0 }} >
            {welcomes.slice(0, 6).map((item, i) => (
              <li key={i.toString()} style={{ listStyle: 'none', textAlign: 'start', padding: 0, margin: 0 }} >
                {item.lan}
              </li>
            ))}
          </ul>
          <ul style={{ display: 'flex', justifyContent: 'start', flexDirection: 'column', padding: 0, margin: 0 }} >
            {welcomes.slice(6, 11).map((item, i) => (
              <li key={i.toString()} style={{ listStyle: 'none', textAlign: 'justify' }} >
                {item.lan}
              </li>
            ))}
          </ul>
          <ul style={{ display: 'flex', justifyContent: 'start', flexDirection: 'column', padding: 0, margin: 0 }} >
            {welcomes.slice(11, 17).map((item, i) => (
              <li key={i.toString()} style={{ listStyle: 'none', textAlign: 'justify' }} >
                {item.lan}
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </div>
  );
}


export default App;

