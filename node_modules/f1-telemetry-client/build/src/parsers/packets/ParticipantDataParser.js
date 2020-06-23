"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const F1Parser_1 = require("../F1Parser");
class ParticipantDataParser extends F1Parser_1.F1Parser {
    constructor(packetFormat) {
        super();
        this.uint8('m_aiControlled')
            .uint8('m_driverId')
            .uint8('m_teamId')
            .uint8('m_raceNumber')
            .uint8('m_nationality')
            .string('m_name', { length: 48, stripNull: true });
        if (packetFormat === 2019) {
            this.uint8('m_yourTelemetry');
        }
    }
}
exports.ParticipantDataParser = ParticipantDataParser;
//# sourceMappingURL=ParticipantDataParser.js.map