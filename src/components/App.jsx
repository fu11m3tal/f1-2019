import React, {Component} from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      m_carTelemetryData: {}
    }
    this.handleLight = this.handleLight.bind(this);
  }
  componentDidMount() {
    setInterval(() => {
      axios.get('http://localhost:3000/api')
      .then(response => {
        var {m_carTelemetryData} = response.data
        this.setState({m_carTelemetryData: m_carTelemetryData})
      })
      .then(response => {
        this.handleLight();
      })
      .catch(error => {
        console.log("ERROR: ", error)
      })
    }, 100)
  }
  handleLight() {
    var lights = ["g1", "g2", "g3", "r1", "r2", "r3", "r4", "r5", "b1", "b2", "b3", "b4", "b5"]
    var thresholds = [1, 8, 16, 32, 40, 48, 56, 64, 72, 80, 88, 96, 99]
    var {m_revLightsPercent} = this.state.m_carTelemetryData;
    lights.forEach((light, index) => {
      console.log(light, m_revLightsPercent)
      let item = document.getElementById(light)
      if(thresholds[index] < m_revLightsPercent) {
        let className = "";
        
        if(light[0] === "g") {
          className = "led-green"
        }
        if(light[0] === "r") {
          className = "led-red"
        }
        if(light[0] === "b") {
          className = "led-blue"
        }
        item.className = className;
      }
      if(thresholds[index] > m_revLightsPercent) {
        item.className = "led-off";
      }
    })
    
  }
  render() {
    var {m_speed, m_throttle, m_steer, m_brake, m_clutch, m_gear, m_engineRPM, m_drs, m_revLightsPercent, m_brakesTemperature, m_tyresSurfaceTemperature, m_tyresInnerTemperature, m_engineTemperature, m_tyresPressure, m_surfaceType} = this.state.m_carTelemetryData;
    return(
      <div className="app">
        <div className="row">
          <div className="led-off" id="g1"/>
          <div className="led-off" id="g2"/>
          <div className="led-off" id="g3"/>
          <div className="led-off" id="r1"/>
          <div className="led-off" id="r2"/>
          <div className="led-off" id="r3"/>
          <div className="led-off" id="r4"/>
          <div className="led-off" id="r5"/>
          <div className="led-off" id="b1"/>
          <div className="led-off" id="b2"/>
          <div className="led-off" id="b3"/>
          <div className="led-off" id="b4"/>
          <div className="led-off" id="b5"/>
        </div>
        <div className="row">
          <div className="box" id="box-1">
            
          </div>
          <div className="box" id="box-2">
            {m_gear}
          </div>
          <div className="box" id="box-2">
            
          </div>
        </div>
        {/* <h1>Speed: {m_speed}</h1>
        <h1>Throttle: {m_throttle}</h1>
        <h1>Steer: {m_steer}</h1>
        <h1>Brake: {m_brake}</h1>
        <h1>Clutch: {m_clutch}</h1>
        <h1>Gear: {m_gear}</h1>
        <h1>Engine RPM: {m_engineRPM}</h1> */}
      </div>
    )
  }
}

export default App;
