"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketSessionDataParser = void 0;
const F1Parser_1 = require("../F1Parser");
const MarshalZoneParser_1 = require("./MarshalZoneParser");
const PacketHeaderParser_1 = require("./PacketHeaderParser");
class PacketSessionDataParser extends F1Parser_1.F1Parser {
    constructor(buffer, packetFormat) {
        super();
        this.endianess('little')
            .nest('m_header', { type: new PacketHeaderParser_1.PacketHeaderParser(packetFormat) })
            .uint8('m_weather')
            .int8('m_trackTemperature')
            .int8('m_airTemperature')
            .uint8('m_totalLaps')
            .uint16('m_trackLength')
            .uint8('m_sessionType')
            .int8('m_trackId');
        if (packetFormat === 2018) {
            this.uint8('m_era');
        }
        else if (packetFormat === 2019) {
            this.uint8('m_formula');
        }
        this.uint16('m_sessionTimeLeft')
            .uint16('m_sessionDuration')
            .uint8('m_pitSpeedLimit')
            .uint8('m_gamePaused')
            .uint8('m_isSpectating')
            .uint8('m_spectatorCarIndex')
            .uint8('m_sliProNativeSupport')
            .uint8('m_numMarshalZones')
            .array('m_marshalZones', { length: 21, type: new MarshalZoneParser_1.MarshalZoneParser() })
            .uint8('m_safetyCarStatus')
            .uint8('m_networkGame');
        this.data = this.fromBuffer(buffer);
    }
}
exports.PacketSessionDataParser = PacketSessionDataParser;
//# sourceMappingURL=PacketSessionDataParser.js.map