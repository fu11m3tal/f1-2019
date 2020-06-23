"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const binary_parser_1 = require("binary-parser");
const constants_1 = require("../../constants");
const F1Parser_1 = require("../F1Parser");
const PacketHeaderParser_1 = require("./PacketHeaderParser");
class PacketEventDataParser extends F1Parser_1.F1Parser {
    constructor(buffer, packetFormat) {
        super();
        this.unpack2019Format = (buffer, packetFormat) => {
            const eventStringCode = this.getEventStringCode(buffer, packetFormat);
            if (eventStringCode === constants_1.EVENT_CODES.FastestLap) {
                this.uint8('vehicleIdx').floatle('lapTime');
            }
            else if (eventStringCode === constants_1.EVENT_CODES.Retirement ||
                eventStringCode === constants_1.EVENT_CODES.TeammateInPits ||
                eventStringCode === constants_1.EVENT_CODES.RaceWinner) {
                this.uint8('vehicleIdx');
            }
        };
        this.getEventStringCode = (buffer, packetFormat) => {
            const headerParser = new binary_parser_1.Parser()
                .endianess('little')
                .nest('m_header', { type: new PacketHeaderParser_1.PacketHeaderParser(packetFormat) })
                .string('m_eventStringCode', { length: 4 });
            const { m_eventStringCode } = headerParser.parse(buffer);
            return m_eventStringCode;
        };
        this.endianess('little').nest('m_header', {
            type: new PacketHeaderParser_1.PacketHeaderParser(packetFormat),
        });
        this.string('m_eventStringCode', { length: 4 });
        if (packetFormat === 2019) {
            this.unpack2019Format(buffer, packetFormat);
        }
        this.data = this.fromBuffer(buffer);
    }
}
exports.PacketEventDataParser = PacketEventDataParser;
//# sourceMappingURL=PacketEventDataParser.js.map