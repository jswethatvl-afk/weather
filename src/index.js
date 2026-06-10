import React,{useState} from 'react';
import ReactDOM from 'react-dom/client';
import cloud from './cloud.jpeg';


function Weather()
{
  const [city, setCity]=useState("");
  const [weather, setWeather]=useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const getWeather = async ( selectedCity=city) => {
    const res = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=3f1bcde0c5854626a86115608262303&q=${selectedCity}`
    );
    const data = await res.json();
    setWeather(data);
  };
  const getSuggestions = async (value) => {
     if (!value) {
     setSuggestions([]);
     return;}
     const res = await fetch(
      `https://api.weatherapi.com/v1/search.json?key=3f1bcde0c5854626a86115608262303&q=${value}`
    );
    const data = await res.json();
    setSuggestions(data);
  };

  const getDay = (dateTime) => {
  const date = new Date(dateTime);
  return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  return(<div style={{
    display: "flex",
    justifyContent: "center",   // ✅ horizontal center
    alignItems: "flex-start",   // or "center" if you want full center
    height: "100vh",
    backgroundImage: "url('./bg.jpeg')",   // 👈 your image
    backgroundSize: "cover",             // fill screen
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  }}>
  <div style={{
    width: "320px",              // 📱 portrait width
    borderRadius: "20px",
    padding: "20px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
    textAlign: "center",
    marginTop: "50px"
  }}>
    <input type="text" placeholder="Search for cities" onChange={(e)=>{setCity(e.target.value);getSuggestions(e.target.value);}} style={{ margin: "20px 0" }}/><button onClick={getWeather}>Search</button>
          {suggestions.length > 0 && (
  <ul style={{listStyle: "none",padding: 0,marginTop: "5px",width: "200px",background: "#fff",border: "1px solid #ccc",borderRadius: "5px",maxHeight: "150px", overflowY: "auto"}}>
    {suggestions.map((item, index) => (
      <li
        key={index}
        style={{padding: "8px",cursor: "pointer",borderBottom: "1px solid #eee"}}
        onClick={() => {
          setCity(item.name);
          setSuggestions([]);
          getWeather(); // auto fetch
        }}
      >
        {item.name}, {item.country}
      </li>
    ))}
  </ul>
)}
          {weather?.current && (
        <div style={{
  display: "flex",
  flexDirection: "column",  // 👈 this is the key
  alignItems: "center",     // optional (center horizontally)
  gap: "10px",
}}>
          <p style={{ margin: "5px 0" }}>{getDay(weather.location.localtime)} {weather.location.localtime}</p>
          <h1 style={{ margin: "5px 0" }}>{weather.location.name}</h1>
          <h2 style={{ margin: "5px 0" }}>{weather.current.condition.text} {weather.current.temp_c} °C <img src={`https:${weather.current.condition.icon}`} alt="weather icon" style={{height:"50px" ,width:"50px"}}/></h2>
          <p style={{
      display: "block",
      padding: "10px 20px",
      marginTop: "10px",
      borderRadius: "25px",
      backgroundColor: "#2196F3",
      color: "white",
      cursor: "pointer",
      transition: "0.3s",
    }}>Cloud {weather.current.cloud} %</p>
          <p style={{
      display: "block",
      padding: "10px 20px",
      marginTop: "10px",
      borderRadius: "25px",
      backgroundColor: "#2196F3",
      color: "white",
      cursor: "pointer",
      transition: "0.3s",
    }}>Wind {weather.current.wind_kph} km/hr</p>
          <p style={{
      display: "block",
      padding: "10px 20px",
      marginTop: "10px",
      borderRadius: "25px",
      backgroundColor: "#2196F3",
      color: "white",
      cursor: "pointer",
      transition: "0.3s",
      
    }}>Humidity {weather.current.humidity} %</p>
          
        </div>
      )} </div> </div>);
}

function Start({goToWeather})
{
  return(<div style={{
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  textAlign: "center"}}>
   <img src={cloud} alt="Cloud" style={{width:"400px", borderRadius:"10px"}}/><h1>Weather ForeCasts</h1><button onClick={goToWeather}  style={{
    padding: "12px 25px",
    fontSize: "16px",
    borderRadius: "25px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "white",
    cursor: "pointer",
    width: "200px"
  }}>Get Start</button></div>)
}

function App()
{
  const [page, setPage] = useState("start");

  return(
    <>
      {page === "start" && (
        <Start goToWeather={() => setPage("weather")} />
      )}

      {page === "weather" && (
        <Weather />
      )}
    </>
  );
}

const x=ReactDOM.createRoot(document.getElementById("root"));
x.render(<><App/></>)

