import { useState, useEffect } from "react";
import "./App.css";


const welcomes = [
  {lan: 'Malayalam', text: 'സ്വാഗതം'},
  {lan:'Hindi', text: 'स्वागत'},
  {lan: 'Tamil', text: 'வரவேற்பு'},
  {lan: 'Kannada', text: 'ಸ್ವಾಗತ'},
  {lan: 'French', text: 'BIENVENU'},
  {lan: 'Spanish', text: 'BIENVENIDO'},
  {lan: 'Portuguese', text: 'BEM-VINDO'},
  {lan: 'Italian', text: 'BENVENUTO'},
  {lan: 'Russian', text: 'ДОБРО ПОЖАЛОВАТЬ'},
  {lan: 'Sweedish', text: 'VÄLKOMMEN'},
  {lan: 'Dutch', text: 'WELKOM'},
  {lan: 'Arabic', text: 'مرحباً'},
  {lan: 'Turkish', text: 'HOŞ GELDİN'},
  {lan: 'German', text: 'WILLKOMMEN'},
  {lan: 'Dutch', text: 'VELKOMMEN'},
  {lan: 'Greek', text: 'ΚΑΛΩΣ ΗΡΘΑΤΕ'},
  {lan: 'English', text: 'WELCOME'},
]

function App() {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("Hi");
  const [welcomesIndex, setWelcomesIndex] = useState(welcomes.length-1);
  const [txt, setTxt] = useState("English");

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

  return (
    <div style={{ width: '100%', height: '100vh' }} >
      <nav style={{ width: '100%', height: '50px', position: 'fixed', top: 0, left: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', backgroundColor: 'wheat' }} >
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
          <input type="text" placeholder="Hi" value={content} onChange={(event) => {setContent(event.target.value)}} style={{ width: "400px", height: "30px", margin: '50px 0' }} />
          <button disabled={loading} onClick={getData} style={{ color: loading ? '#000' : '#FFF', backgroundColor: loading ? '#5F5F5F' : '#000' }} >Click me</button>
          <h1 style={{ color: '#000', textAlign: 'center' }} >{txt}</h1>
        </div>
      </div>
      <footer id="languages" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%',  }} >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '80%', padding: '1rem 0' }} >
          <div  >
            <ul>
              {welcomes.slice(0, 6).map((item, i) => (
                <li key={i.toString()} style={{ listStyle: 'none', textAlign: 'justify' }} >
                  {item.lan}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ul>
              {welcomes.slice(6, 11).map((item, i) => (
                <li key={i.toString()} style={{ listStyle: 'none', textAlign: 'justify' }} >
                  {item.lan}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ul>
              {welcomes.slice(11, 17).map((item, i) => (
                <li key={i.toString()} style={{ listStyle: 'none', textAlign: 'justify' }} >
                  {item.lan}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}


export default App;

