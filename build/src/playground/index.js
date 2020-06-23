"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const { PACKETS } = __1.constants;
const client = new __1.F1TelemetryClient({ port: 20777 });
// client.on(PACKETS.session, (data) => { console.log("session") });
// client.on(PACKETS.motion, (data) => { console.log ("motion") });
// client.on(PACKETS.lapData, (data) => { console.log ("lapData") });
// client.on(PACKETS.event, (data) => { console.log ("event") });
// client.on(PACKETS.participants, (data) => { console.log ("participants") });
// client.on(PACKETS.carSetups, (data) => { console.log ("carSetups") });
client.on(PACKETS.carTelemetry, (data) => {
    var telemetry = data.m_carTelemetryData[0];
    var speed = telemetry.m_speed;
    var fan = speed / 2;
    var categories = [];
    console.log(speed, fan);
    for (var key in telemetry) {
        categories.push(key);
        console.log(`${key} is ${telemetry[key]}`);
    }
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
    process.on(eventType, () => client.stop());
});
//# sourceMappingURL=index.js.map