"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_PORT = exports.packetTypes = exports.constantsTypes = exports.constants = exports.F1TelemetryClient = void 0;
const dgram = __importStar(require("dgram"));
const events_1 = require("events");
const constants = __importStar(require("./constants"));
exports.constants = constants;
const constantsTypes = __importStar(require("./constants/types"));
exports.constantsTypes = constantsTypes;
const packets_1 = require("./parsers/packets");
const packetTypes = __importStar(require("./parsers/packets/types"));
exports.packetTypes = packetTypes;
const DEFAULT_PORT = 20777;
exports.DEFAULT_PORT = DEFAULT_PORT;
/**
 *
 */
class F1TelemetryClient extends events_1.EventEmitter {
    constructor(opts = {}) {
        super();
        const { port = DEFAULT_PORT } = opts;
        this.port = port;
        this.client = dgram.createSocket('udp4');
    }
    /**
     *
     * @param {Buffer} buffer
     */
    // tslint:disable-next-line:no-any
    static parsePacketHeader(buffer) {
        const packetFormatParser = new packets_1.PacketFormatParser();
        const { m_packetFormat } = packetFormatParser.fromBuffer(buffer);
        const packetHeaderParser = new packets_1.PacketHeaderParser(m_packetFormat);
        return packetHeaderParser.fromBuffer(buffer);
    }
    /**
     *
     * @param {Number} packetId
     */
    static getParserByPacketId(packetId) {
        const { PACKETS } = constants;
        const packetKeys = Object.keys(PACKETS);
        const packetType = packetKeys[packetId];
        switch (packetType) {
            case PACKETS.session:
                return packets_1.PacketSessionDataParser;
            case PACKETS.motion:
                return packets_1.PacketMotionDataParser;
            case PACKETS.lapData:
                return packets_1.PacketLapDataParser;
            case PACKETS.event:
                return packets_1.PacketEventDataParser;
            case PACKETS.participants:
                return packets_1.PacketParticipantsDataParser;
            case PACKETS.carSetups:
                return packets_1.PacketCarSetupDataParser;
            case PACKETS.carTelemetry:
                return packets_1.PacketCarTelemetryDataParser;
            case PACKETS.carStatus:
                return packets_1.PacketCarStatusDataParser;
            default:
                return null;
        }
    }
    /**
     *
     * @param {Buffer} message
     */
    parseMessage(message) {
        const { m_packetFormat, m_packetId } = F1TelemetryClient.parsePacketHeader(message);
        const parser = F1TelemetryClient.getParserByPacketId(m_packetId);
        if (!parser) {
            return;
        }
        const packetData = new parser(message, m_packetFormat);
        const packetKeys = Object.keys(constants.PACKETS);
        this.emit(packetKeys[m_packetId], packetData.data);
    }
    /**
     * Method to start listening for packets
     */
    start() {
        if (!this.client) {
            return;
        }
        this.client.on('listening', () => {
            if (!this.client) {
                return;
            }
            const address = this.client.address();
            console.log(`UDP Client listening on ${address.address}:${address.port} 🏎`);
            this.client.setBroadcast(true);
        });
        this.client.on('message', m => this.parseMessage(m));
        this.client.bind(this.port);
    }
    /**
     * Method to close the client
     */
    stop() {
        if (!this.client) {
            return;
        }
        return this.client.close(() => {
            console.log(`UDP Client closed 🏁`);
            this.client = undefined;
        });
    }
}
exports.F1TelemetryClient = F1TelemetryClient;
//# sourceMappingURL=index.js.map