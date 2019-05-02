import React from "react";
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/weather";

const API_KEY ="31d8cd5bb9c6aec41d284a3c7b901c23"

class App extends React.Component {

  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    sunrise: undefined,
    sunset: undefined,
    error: undefined
  }

  gettingWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;


    if (city) {

      const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
      const data = await api_url.json();
      //console.log(data);

      let sunrise = data.sys.sunrise;
      let sunset = data.sys.sunset;
      let date = new Date();
      date.setTime(sunrise * 1000);
      let sunrise_date = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      date.setTime(sunset * 1000);
      let sunset_date = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

      let temp = data.main.temp - 273.15;
      temp = Math.round(temp);

      this.setState({
        temp: temp,
        city: data.name,
        country: data.sys.country,
        pressure: data.main.pressure,
        sunrise: sunrise_date,
        sunset: sunset_date,
        error: undefined
      });
    } else {
      this.setState({
        temp: undefined,
        city: undefined,
        country: undefined,
        sunrise: undefined,
        sunset: undefined,
        error: "Введите название города"
      });
    }
  }

  render() {
    return (
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-sm-5 info">
                <Info />
              </div>
              <div className="col-sm-7 form">
                <Form weatherMethod={this.gettingWeather} />
                <Weather
                  temp={this.state.temp}
                  city={this.state.city}
                  country={this.state.country}
                  pressure={this.state.pressure}
                  sunrise = {this.state.sunrise}
                  sunset={this.state.sunset}
                  error={this.state.error}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default App;
