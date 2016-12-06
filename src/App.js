import React from 'react';
// import logo from './logo.svg';
import fcc from './fcc.svg';
import './App.css';

var axios = require('axios');
var sec = 'e566d4d5cf9f3cfd83419545009dd92f';
var uri = 'http://api.openweathermap.org/data/2.5/weather';
// var unit = 'metric';


// http://api.openweathermap.org/data/2.5/weather?lat=52.4892851&lon=13.324718599999999&APPID=e566d4d5cf9f3cfd83419545009dd92f

var App = React.createClass({
  componentWillMount: function() {
    // super(props);
    this.state = {
      // unit: 'metric',
      selectedOption: 'C'
    };
  },
  handleOptionChange: function(changeEvent){
    if (this.state.selectedOption !== changeEvent.target.value) {
      this.setState({
        selectedOption: changeEvent.target.value
      },this.fetch);
    }


  },

  getIcon: function(){
    if (this.state.selectedOption === 'C') {
      if (this.state.temp < 2) {
        return 'ac_unit';
      }
      else if (this.state.temp > 25) {
        return 'wb_sunny';}
       else { return 'brightness_6';}
    } else { // F
      if (this.state.temp < 35.6) {
        return 'ac_unit';
      }
      else if (this.state.temp > 77) {
        return 'wb_sunny';}
       else { return 'brightness_6';}
    }

  },

  fetch:function(){
    console.log('starting to fetch with ' + this.state.selectedOption);
    let unit ='';
    if (this.state.selectedOption === 'C') {
      unit = 'metric';
    } else {
      unit = 'imperial'
    }
    this.ServerRequest = axios.get(uri + '?lat=' + this.state.latitude +'&lon=' + this.state.longitude + '&units='+ unit +'&APPID='+sec)
    .then(function(info) {

      console.log(info);
      this.setState({
        name: info.data.name,
        temp: info.data.main.temp,
        temp_max: info.data.main.temp_max,
        temp_min: info.data.main.temp_min,
        desc: info.data.weather[0].description,
      });
      var icon = this.getIcon();
      this.setState({
        icon: icon
      });
    }.bind(this))
  },

  render:function() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={fcc} width="150" height="100" className="App-logo"/>
          <p>myWeather App</p>
        </div>


          {this.state.name &&
          <div className="forecast">
            <div className='nav'>
              <div className="btn-group fieldset" data-toggle="buttons">
                <legend>Pick Method</legend>
                <label className="btn btn-primary active">
                  <input type="radio" name="options" value='C'
                    checked={this.state.selectedOption === 'C'}
                    onChange={this.handleOptionChange}
                    />
                    <span>°C</span>
                </label>
                <label className="btn btn-primary">
                  <input type="radio" name="options" value='F'
                    checked={this.state.selectedOption === 'F'}
                    onChange={this.handleOptionChange}
                    />
                    <span>°F</span>
                </label>
              </div>
            </div>
            <div className="results">
              <div className='results-row'>
                <div className ="item value">{this.state.name}</div>
              </div>
              <div className='results-row'>
                <div className ="item value">{this.state.temp}°</div>
              </div>
              <div className='results-row'>
                <i className="material-icons icon item">{this.state.icon}</i>
              </div>
              <div className='results-row'>
                <div className ="item value desc">{this.state.desc}</div>
              </div>
              <div className='minmax'>
                <div className='results-row'>
                  <div className ="item label">Max</div>
                  <div className ="item value">{this.state.temp_max}°</div>
                </div>
                <div className='results-row'>
                  <div className ="item label">Min</div>
                  <div className ="item value">{this.state.temp_min}°</div>
                </div>
              </div>
            </div>

          </div>
          }
          <div className="footer"><p>
            FreeCodeCamp Front End Assignment
          </p>
          </div>

      </div>

    );
  },

  componentDidMount:function(){
    if (navigator.geolocation) {
      this.positionRequest = navigator.geolocation.getCurrentPosition(function(position) {
        this.setState(
          {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        );
        this.fetch();
      }.bind(this))
    }
  }
})

export default App;
