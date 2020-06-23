import {constants, F1TelemetryClient} from '..';
const {PACKETS} = constants;
// const Gpio = require('pigpio').Gpio;
// const LCD = require('raspberrypi-liquid-crystal');
// const lcd = new LCD( 1, 0x27, 16, 2 );
const client = new F1TelemetryClient({port: 20777});


// client.on(PACKETS.session, (data) => { console.log("session") });
// client.on(PACKETS.lapData, (data) => { console.log ("lapData") });
// client.on(PACKETS.event, (data) => { console.log ("event") });
// client.on(PACKETS.participants, (data) => { console.log ("participants") });
// client.on(PACKETS.carSetups, (data) => { console.log ("carSetups") });
// client.on(PACKETS.motion, (data) => {
//   console.log("motion: ", data)
// });
client.on(PACKETS.carTelemetry, (data) => {
  var {m_carTelemetryData} = data;
  for(var i = 0; i < m_carTelemetryData.length; i++) {
    console.log(m_carTelemetryData[i].m_revLightsPercent);
  }
  //     var a = new Gpio(17, {mode: Gpio.OUTPUT});
//     var b = new Gpio(27, {mode: Gpio.OUTPUT});
//     var c = new Gpio(22, {mode: Gpio.OUTPUT});
//     var d = new Gpio(5, {mode: Gpio.OUTPUT});
//     var e = new Gpio(6, {mode: Gpio.OUTPUT});
//     var f = new Gpio(13, {mode: Gpio.OUTPUT});
//     var g = new Gpio(19, {mode: Gpio.OUTPUT});
//     var h = new Gpio(26, {mode: Gpio.OUTPUT});
//     var i = new Gpio(7, {mode: Gpio.OUTPUT});
//     // Turn on each led in sequence as m_revLightsPercent increases from 0 - 100 (%)
//     m_revLightsPercent >= 1 ? a.pwmWrite(250) : a.pwmWrite(0);
//     m_revLightsPercent >= 15 ? b.pwmWrite(250) : b.pwmWrite(0);
//     m_revLightsPercent >= 30 ? c.pwmWrite(250) : c.pwmWrite(0);
//     m_revLightsPercent >= 40 ? d.pwmWrite(250) : d.pwmWrite(0);
//     m_revLightsPercent >= 50 ? e.pwmWrite(250) : e.pwmWrite(0);
//     m_revLightsPercent >= 60 ? f.pwmWrite(250) : f.pwmWrite(0);
//     m_revLightsPercent >= 70 ? g.pwmWrite(250) : g.pwmWrite(0);
//     m_revLightsPercent >= 80 ? h.pwmWrite(250) : h.pwmWrite(0);
//     m_revLightsPercent >= 90 ? i.pwmWrite(250) : i.pwmWrite(0);
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
  (process as NodeJS.EventEmitter).on(eventType, (response) => {
    console.log(eventType, response);
    client.stop();
  });
});
