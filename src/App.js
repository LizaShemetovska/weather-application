import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import '../node_modules/bulma/css/bulma.css'
const PLACES =[
  {name: "Rivne", zip:"33000"},
  {name: "Washington" ,zip:"20001"},
  {name: "Los Angeles" ,zip:"90023"},
  {name: "Seattle" ,zip:"98101"},
  {name: "Kiev" ,zip:"03134"}
  

];
class WeatherService extends Component{
  constructor(){
      super ();
      this.state={weatherData:null};
  }
  componentDidMount(){
    const zip =this.props.zip;
    const apiURL= "http://api.openweathermap.org/data/2.5/weather?q=" +
    zip +
    "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial";
    fetch(apiURL)
    .then(res=>res.json())
    .then(json => {this.setState( {weatherData:json})})
  }
  render(){
    const weatherData=this.state.weatherData;
    if(!weatherData) return <div>Loading...</div>
    const weather=weatherData.weather[0];
    const iconURL="http://api.openweathermap.org/img/w/" +weather.icon +".png";
    return(
      // <div>{JSON.stringify(weatherData)}</div>
     
      <div id="main">
      <div className="columns is-centered" >
<div class="card">
<header class="card-header ">
<h1>
       <p className="subtitle is-2">  {weather.main} in {weatherData.name}
          <img src={iconURL} alt ={weatherData.description}/>
          </p>
 </h1>
</header>
<div class="card-content">
<div>
        
        
        <p>Current temp: {weatherData.main.temp} °C</p>
        <p>Min temp: {weatherData.main.temp_min} °C</p>
        <p>Max temp: {weatherData.main.temp_max} °C</p>
        <p>Wind speed: {weatherData.wind.speed} m/sec</p>
        <p>Pressure: {weatherData.main.pressure} mb</p>
      
    </div>
</div>
<footer class="card-footer">

</footer>
</div>
</div>
</div>
    );

  } 
}

class App extends Component {
constructor(){
  super();
   this.state= {
     activePlace: 0,
   };
}
  render() {
    const activePlace = this.state.activePlace;
    return (
      <div className="App">
      <WeatherService zip={PLACES[activePlace].zip} key={activePlace}/>
      <br></br>
      <div>
      { PLACES.map((place,index)=> (
         <button className={"button is-danger is-rounded"} key={index} onClick={()=> {this.setState({activePlace:index})} }> 
    
        {place.name}
        </button>
      ))}
      </div>
      </div>

      
    );
  }
}

export default App;