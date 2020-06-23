"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const index_1 = require("./index");
const mocks_1 = require("./mocks");
describe('F1TelemetryClient', () => {
    describe('constructor', () => {
        describe('when no port is passed through parameters', () => {
            let f1TelemetryClient;
            beforeAll(() => {
                f1TelemetryClient = new index_1.F1TelemetryClient();
            });
            it('should set default port and should set up client', () => {
                expect(f1TelemetryClient.port).toBe(index_1.DEFAULT_PORT);
            });
            it('should set up client as udp4 client', () => {
                expect(f1TelemetryClient.client).toBeDefined();
                // tslint:disable-next-line:no-any
                expect(f1TelemetryClient.client.type).toBe('udp4');
            });
        });
        describe('when a custom port is passed through parameters', () => {
            let f1TelemetryClient;
            beforeAll(() => {
                f1TelemetryClient = new index_1.F1TelemetryClient({ port: 20778 });
            });
            it('should set custom port and should set up client', () => {
                expect(f1TelemetryClient.port).toBe(20778);
            });
            it('should set up client as udp4 client', () => {
                expect(f1TelemetryClient.client).toBeDefined();
                // tslint:disable-next-line:no-any
                expect(f1TelemetryClient.client.type).toBe('udp4');
            });
        });
    });
    describe('2018 format', () => {
        describe('parsePacketHeader', () => {
            // tslint:disable-next-line:no-any
            let parsedPacketHeader;
            beforeAll(() => {
                const buffer = new Buffer(mocks_1.PACKET_HEADER_BUFFER_2018);
                parsedPacketHeader = index_1.F1TelemetryClient.parsePacketHeader(buffer);
            });
            it('should parse buffer and return parsed packet header', () => {
                expect(parsedPacketHeader).toEqual(mocks_1.PACKET_HEADER_PARSED_2018);
            });
        });
        describe('parseMessage', () => {
            let f1TelemetryClient;
            describe('PacketSessionData', () => {
                beforeAll(() => {
                    f1TelemetryClient = new index_1.F1TelemetryClient();
                    spyOn(events_1.EventEmitter.prototype, 'emit');
                    const buffer = new Buffer(mocks_1.PACKET_SESSION_DATA_BUFFER_2018);
                    f1TelemetryClient.parseMessage(buffer);
                });
                it('should parse PacketSessionData buffer', () => {
                    expect(events_1.EventEmitter.prototype.emit)
                        .toHaveBeenCalledWith('session', mocks_1.PACKET_SESSION_DATA_PARSED_2018);
                });
            });
            describe('PacketParticipantsData', () => {
                beforeAll(() => {
                    f1TelemetryClient = new index_1.F1TelemetryClient();
                    spyOn(events_1.EventEmitter.prototype, 'emit');
                    const buffer = new Buffer(mocks_1.PACKET_PARTICIPANTS_DATA_BUFFER_2018);
                    f1TelemetryClient.parseMessage(buffer);
                });
                it('should parse PacketParticipantsData buffer and emit result', () => {
                    expect(events_1.EventEmitter.prototype.emit)
                        .toHaveBeenCalledWith('participants', mocks_1.PACKET_PARTICIPANTS_DATA_PARSED_2018);
                });
            });
            describe('PacketCarTelemetryData', () => {
                beforeAll(() => {
                    f1TelemetryClient = new index_1.F1TelemetryClient();
                    spyOn(events_1.EventEmitter.prototype, 'emit');
                    const buffer = new Buffer(mocks_1.PACKET_CAR_TELEMETRY_DATA_BUFFER_2018);
                    f1TelemetryClient.parseMessage(buffer);
                });
                it('should parse PacketCarTelemetryData buffer and emit result', () => {
                    expect(events_1.EventEmitter.prototype.emit)
                        .toHaveBeenCalledWith('carTelemetry', mocks_1.PACKET_CAR_TELEMETRY_DATA_PARSED_2018);
                });
            });
            describe('PacketCarStatusData', () => {
                beforeAll(() => {
                    f1TelemetryClient = new index_1.F1TelemetryClient();
                    spyOn(events_1.EventEmitter.prototype, 'emit');
                    const buffer = new Buffer(mocks_1.PACKET_CAR_STATUS_DATA_BUFFER_2018);
                    f1TelemetryClient.parseMessage(buffer);
                });
                it('should parse PacketCarStatusData buffer and emit result', () => {
                    expect(events_1.EventEmitter.prototype.emit)
                        .toHaveBeenCalledWith('carStatus', mocks_1.PACKET_CAR_STATUS_DATA_PARSED_2018);
                });
            });
            describe('PacketLapData', () => {
                beforeAll(() => {
                    f1TelemetryClient = new index_1.F1TelemetryClient();
                    spyOn(events_1.EventEmitter.prototype, 'emit');
                    const buffer = new Buffer(mocks_1.PACKET_LAP_DATA_BUFFER_2018);
                    f1TelemetryClient.parseMessage(buffer);
                });
                it('should parse PacketLapData buffer and emit result', () => {
                    expect(events_1.EventEmitter.prototype.emit)
                        .toHaveBeenCalledWith('lapData', mocks_1.PACKET_LAP_DATA_PARSED_2018);
                });
            });
            describe('PacketMotionData', () => {
                beforeAll(() => {
                    f1TelemetryClient = new index_1.F1TelemetryClient();
                    spyOn(events_1.EventEmitter.prototype, 'emit');
                    const buffer = new Buffer(mocks_1.PACKET_MOTION_DATA_BUFFER_2018);
                    f1TelemetryClient.parseMessage(buffer);
                });
                it('should parse PacketMotionData buffer and emit result', () => {
                    expect(events_1.EventEmitter.prototype.emit)
                        .toHaveBeenCalledWith('motion', mocks_1.PACKET_MOTION_DATA_PARSED_2018);
                });
            });
            describe('PacketCarSetupData', () => {
                beforeAll(() => {
                    f1TelemetryClient = new index_1.F1TelemetryClient();
                    spyOn(events_1.EventEmitter.prototype, 'emit');
                    const buffer = new Buffer(mocks_1.PACKET_CAR_SETUP_DATA_BUFFER_2018);
                    f1TelemetryClient.parseMessage(buffer);
                });
                it('should parse PacketCarSetupData buffer and emit result', () => {
                    expect(events_1.EventEmitter.prototype.emit)
                        .toHaveBeenCalledWith('carSetups', mocks_1.PACKET_CAR_SETUP_DATA_PARSED_2018);
                });
            });
            describe('PacketEventData', () => {
                beforeAll(() => {
                    f1TelemetryClient = new index_1.F1TelemetryClient();
                    spyOn(events_1.EventEmitter.prototype, 'emit');
                    const buffer = new Buffer(mocks_1.PACKET_EVENT_DATA_BUFFER_2018);
                    f1TelemetryClient.parseMessage(buffer);
                });
                it('should parse PacketEventData buffer and emit result', () => {
                    expect(events_1.EventEmitter.prototype.emit)
                        .toHaveBeenCalledWith('event', mocks_1.PACKET_EVENT_DATA_PARSED_2018);
                });
            });
        });
    });
    describe('2019 format', () => {
        describe('parsePacketHeader', () => {
            // tslint:disable-next-line:no-any
            let parsedPacketHeader;
            beforeAll(() => {
                const buffer = new Buffer(mocks_1.PACKET_HEADER_BUFFER_2019);
                parsedPacketHeader = index_1.F1TelemetryClient.parsePacketHeader(buffer);
            });
            it('should parse buffer and return parsed packet header', () => {
                expect(parsedPacketHeader).toEqual(mocks_1.PACKET_HEADER_PARSED_2019);
            });
        });
        describe('parseMessage', () => {
            let f1TelemetryClient;
            describe('PacketSessionData', () => {
                beforeAll(() => {
                    f1TelemetryClient = new index_1.F1TelemetryClient();
                    spyOn(events_1.EventEmitter.prototype, 'emit');
                    const buffer = new Buffer(mocks_1.PACKET_SESSION_DATA_BUFFER_2019);
                    f1TelemetryClient.parseMessage(buffer);
                });
                it('should parse PacketSessionData buffer', () => {
                    expect(events_1.EventEmitter.prototype.emit)
                        .toHaveBeenCalledWith('session', mocks_1.PACKET_SESSION_DATA_PARSED_2019);
                });
            });
            describe('PacketParticipantsData', () => {
                beforeAll(() => {
                    f1TelemetryClient = new index_1.F1TelemetryClient();
                    spyOn(events_1.EventEmitter.prototype, 'emit');
                    const buffer = new Buffer(mocks_1.PACKET_PARTICIPANTS_DATA_BUFFER_2019);
                    f1TelemetryClient.parseMessage(buffer);
                });
                it('should parse PacketParticipantsData buffer and emit result', () => {
                    expect(events_1.EventEmitter.prototype.emit)
                        .toHaveBeenCalledWith('participants', mocks_1.PACKET_PARTICIPANTS_DATA_PARSED_2019);
                });
            });
            describe('PacketCarTelemetryData', () => {
                beforeAll(() => {
                    f1TelemetryClient = new index_1.F1TelemetryClient();
                    spyOn(events_1.EventEmitter.prototype, 'emit');
                    const buffer = new Buffer(mocks_1.PACKET_CAR_TELEMETRY_DATA_BUFFER_2019);
                    f1TelemetryClient.parseMessage(buffer);
                });
                it('should parse PacketCarTelemetryData buffer and emit result', () => {
                    expect(events_1.EventEmitter.prototype.emit)
                        .toHaveBeenCalledWith('carTelemetry', mocks_1.PACKET_CAR_TELEMETRY_DATA_PARSED_2019);
                });
            });
            describe('PacketCarStatusData', () => {
                beforeAll(() => {
                    f1TelemetryClient = new index_1.F1TelemetryClient();
                    spyOn(events_1.EventEmitter.prototype, 'emit');
                    const buffer = new Buffer(mocks_1.PACKET_CAR_STATUS_DATA_BUFFER_2019);
                    f1TelemetryClient.parseMessage(buffer);
                });
                it('should parse PacketCarStatusData buffer and emit result', () => {
                    expect(events_1.EventEmitter.prototype.emit)
                        .toHaveBeenCalledWith('carStatus', mocks_1.PACKET_CAR_STATUS_DATA_PARSED_2019);
                });
            });
            describe('PacketLapData', () => {
                beforeAll(() => {
                    f1TelemetryClient = new index_1.F1TelemetryClient();
                    spyOn(events_1.EventEmitter.prototype, 'emit');
                    const buffer = new Buffer(mocks_1.PACKET_LAP_DATA_BUFFER_2019);
                    f1TelemetryClient.parseMessage(buffer);
                });
                it('should parse PacketLapData buffer and emit result', () => {
                    expect(events_1.EventEmitter.prototype.emit)
                        .toHaveBeenCalledWith('lapData', mocks_1.PACKET_LAP_DATA_PARSED_2019);
                });
            });
            describe('PacketMotionData', () => {
                beforeAll(() => {
                    f1TelemetryClient = new index_1.F1TelemetryClient();
                    spyOn(events_1.EventEmitter.prototype, 'emit');
                    const buffer = new Buffer(mocks_1.PACKET_MOTION_DATA_BUFFER_2019);
                    f1TelemetryClient.parseMessage(buffer);
                });
                it('should parse PacketMotionData buffer and emit result', () => {
                    expect(events_1.EventEmitter.prototype.emit)
                        .toHaveBeenCalledWith('motion', mocks_1.PACKET_MOTION_DATA_PARSED_2019);
                });
            });
            describe('PacketCarSetupData', () => {
                beforeAll(() => {
                    f1TelemetryClient = new index_1.F1TelemetryClient();
                    spyOn(events_1.EventEmitter.prototype, 'emit');
                    const buffer = new Buffer(mocks_1.PACKET_CAR_SETUP_DATA_BUFFER_2019);
                    f1TelemetryClient.parseMessage(buffer);
                });
                it('should parse PacketCarSetupData buffer and emit result', () => {
                    expect(events_1.EventEmitter.prototype.emit)
                        .toHaveBeenCalledWith('carSetups', mocks_1.PACKET_CAR_SETUP_DATA_PARSED_2019);
                });
            });
            describe('PacketEventData', () => {
                beforeAll(() => {
                    f1TelemetryClient = new index_1.F1TelemetryClient();
                    spyOn(events_1.EventEmitter.prototype, 'emit');
                    const buffer = new Buffer(mocks_1.PACKET_EVENT_DATA_BUFFER_2019);
                    f1TelemetryClient.parseMessage(buffer);
                });
                it('should parse PacketEventData buffer and emit result', () => {
                    expect(events_1.EventEmitter.prototype.emit)
                        .toHaveBeenCalledWith('event', mocks_1.PACKET_EVENT_DATA_PARSED_2019);
                });
            });
        });
    });
});
//# sourceMappingURL=index.spec.js.map