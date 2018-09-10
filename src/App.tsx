import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import * as React from 'react';
import './App.css';
import Form from './components/Form';
import logo1 from './few_clouds.png';
import logo3 from './scattered_clouds.png' 
import logo4 from './shower-rain.png';
import logo2 from './sunny.png';

interface IState {
  city: any,
  description: any,
  error: any,
  tempurature: any,
  weather: any
}
const ApiKey = "c059c5ceb5bf1370f8403c096730df45";
class App extends React.Component<{}, IState>{
  constructor(props: any) {
    super(props);
    this.state = {
      city: "",
      description: "",
      error: undefined,
      tempurature: "",
      weather: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.getWeather = this.getWeather.bind(this);
  }

  public getWeather = async (event: any) => {
    event.preventDefault();
    const city = this.state.city;
    const ApiCall = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=`+ this.state.city + `,nz&appid=${ApiKey}&units=metric`);
    const data = await ApiCall.json();
    if (city && data.cod !== '404'){
    this.setState({
      city: data.name,
      error: "",
      description: data.weather[0].description,
      tempurature: data.main.temp + '℃',
      weather: ""
    });
    }
    else{
      this.setState({
        city: "",
        description: "",
        error: "The city entered is invalid",
        tempurature: "",
        weather: ""
      })
    }
    if (this.state.description === 'clear sky'){
      this.setState({
        weather: <img src={logo2} height='55px' width='55px'/>
      })
    }
    else if (this.state.description === 'few clouds'){
      this.setState({
        weather: <img src={logo1} height='60px' width='60px'/>
      })
    }
    else if (this.state.description === 'scattered clouds'){
      this.setState({
        weather: <img src={logo3} height='60px' width='60px'/>
      })
    }
    else if (this.state.description === 'broken clouds'){
      this.setState({
        weather: <img src={logo3} height='60px' width='60px'/>
      })
    }
    else if (this.state.description === 'overcast clouds'){
      this.setState({
        weather: <img src={logo3} height='60px' width='60px'/>
      })
    }
    
    else if (this.state.description === 'shower rain'){
      this.setState({
        weather: <img src={logo4} height='55px' width='55px'/>
      })
    }
    else if (this.state.description === 'light rain'){
      this.setState({
        weather: <img src={logo4} height='55px' width='55px'/>
      })
    }
  }
  public handleChange(event) {
    this.setState({city: event.target.value});
  }
  public render() { 
    return (
      <div className="App">
        <Form />
        <p className="box">
        <form className="Input" onSubmit={this.getWeather}>
        <label>
           Enter a New Zealand location:&nbsp;
  <TextField className="textfield" type="text" name="name" value={this.state.city} onChange={this.handleChange}/>
  </label>&nbsp;&nbsp;
        <Button className="Input" onClick={this.getWeather} onChange={this.handleChange} variant="outlined" type="submit" color="secondary" size="large" value="Get Weather" >
        &nbsp;Search
  </Button>
  <h1>{this.state.weather}</h1>
       <h1 className="headingStyle">{this.state.tempurature } {this.state.description} {this.state.error}</h1>
        </form>
        </p>
        </div>
      
    );
  }
}
export default App;