"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const F1Parser_1 = require("../F1Parser");
class PacketFormatParser extends F1Parser_1.F1Parser {
    constructor() {
        super();
        this.endianess('little').uint16('m_packetFormat');
    }
}
exports.PacketFormatParser = PacketFormatParser;
//# sourceMappingURL=PacketFormatParser.js.map