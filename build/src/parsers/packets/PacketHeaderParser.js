"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const F1Parser_1 = require("../F1Parser");
class PacketHeaderParser extends F1Parser_1.F1Parser {
    constructor(packetFormat) {
        super();
        this.endianess('little').uint16('m_packetFormat');
        if (packetFormat === 2018) {
            this.uint8('m_packetVersion').uint8('m_packetId');
        }
        else if (packetFormat === 2019) {
            this.uint8('m_gameMajorVersion')
                .uint8('m_gameMinorVersion')
                .uint8('m_packetVersion')
                .uint8('m_packetId');
        }
        this.uint64('m_sessionUID')
            .floatle('m_sessionTime')
            .uint32('m_frameIdentifier')
            .uint8('m_playerCarIndex');
    }
}
exports.PacketHeaderParser = PacketHeaderParser;
//# sourceMappingURL=PacketHeaderParser.js.map