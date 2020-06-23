import {constants, F1TelemetryClient} from '..';
const {PACKETS} = constants;
const Gpio = require('pigpio').Gpio;
const client = new F1TelemetryClient({port: 20777});

var revLightsController = ( {m_carTelemetryData} ) => {
  m_carTelemetryData.forEach((telemetry, index) => {
    var { m_revLightsPercent } = telemetry;
    console.log("m_revLightsPercent: ", m_revLightsPercent)
    var pins = [17, 27, 22, 5, 6, 13, 19, 26, 7];
    var thresholds = [1, 15, 30, 40, 50, 60, 70, 80, 90]
    var a = new Gpio(17, {mode: Gpio.OUTPUT});
    var b = new Gpio(27, {mode: Gpio.OUTPUT});
    var c = new Gpio(22, {mode: Gpio.OUTPUT});
    var d = new Gpio(5, {mode: Gpio.OUTPUT});
    var e = new Gpio(6, {mode: Gpio.OUTPUT});
    var f = new Gpio(13, {mode: Gpio.OUTPUT});
    var g = new Gpio(19, {mode: Gpio.OUTPUT});
    var h = new Gpio(26, {mode: Gpio.OUTPUT});
    var i = new Gpio(7, {mode: Gpio.OUTPUT});
    // Turn on each led in sequence as m_revLightsPercent increases from 0 - 100 (%)
    m_revLightsPercent >= 1 ? a.pwmWrite(250) : a.pwmWrite(0);
    m_revLightsPercent >= 15 ? b.pwmWrite(250) : b.pwmWrite(0);
    m_revLightsPercent >= 30 ? c.pwmWrite(250) : c.pwmWrite(0);
    m_revLightsPercent >= 40 ? d.pwmWrite(250) : d.pwmWrite(0);
    m_revLightsPercent >= 50 ? e.pwmWrite(250) : e.pwmWrite(0);
    m_revLightsPercent >= 60 ? f.pwmWrite(250) : f.pwmWrite(0);
    m_revLightsPercent >= 70 ? g.pwmWrite(250) : g.pwmWrite(0);
    m_revLightsPercent >= 80 ? h.pwmWrite(250) : h.pwmWrite(0);
    m_revLightsPercent >= 90 ? i.pwmWrite(250) : i.pwmWrite(0);
  })
}

var gearDisplayController = ( { m_carTelemetryData } ) => {
  m_carTelemetryData.forEach((telemetry) => {
    var { m_gear } = telemetry;
    console.log("m_gear: ", m_gear);
  })
}

var windSimulatorController = ( { m_carTelemetryData } ) => {
  var fanSpeedController = (m_speed) => {
    var fanSpeed = m_speed * 0.5;
    console.log("fanSpeedController: ", fanSpeed); 
  }
  m_carTelemetryData.forEach((telemetry) => {
    var { m_speed } = telemetry;
    console.log("m_speed : ", m_speed);
    fanSpeedController(m_speed);
  })
}

// client.on(PACKETS.session, (data) => { console.log("session") });
// client.on(PACKETS.lapData, (data) => { console.log ("lapData") });
// client.on(PACKETS.event, (data) => { console.log ("event") });
// client.on(PACKETS.participants, (data) => { console.log ("participants") });
// client.on(PACKETS.carSetups, (data) => { console.log ("carSetups") });
client.on(PACKETS.motion, (data) => { 
  console.log("motion: ", data)
});
client.on(PACKETS.carTelemetry, (data) => { 
  console.log("carTelemetry: ")
  revLightsController(data);
  gearDisplayController(data);
  windSimulatorController(data);
});
// client.on(PACKETS.carStatus, (data) => { console.log ("carStatus") });

client.start();

// stops the client
[`exit`,
 `SIGINT`,
 `SIGUSR1`,
 `SIGUSR2`,
 `uncaughtException`,
 `SIGTERM`,
].forEach(eventType => {
  (process as NodeJS.EventEmitter).on(eventType, () => client.stop());
});
