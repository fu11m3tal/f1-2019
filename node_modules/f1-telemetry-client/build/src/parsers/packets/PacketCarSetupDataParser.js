"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const F1Parser_1 = require("../F1Parser");
const CarSetupDataParser_1 = require("./CarSetupDataParser");
const PacketHeaderParser_1 = require("./PacketHeaderParser");
class PacketCarSetupDataParser extends F1Parser_1.F1Parser {
    constructor(buffer, packetFormat) {
        super();
        this.endianess('little')
            .nest('m_header', { type: new PacketHeaderParser_1.PacketHeaderParser(packetFormat) })
            .array('m_carSetups', { length: 20, type: new CarSetupDataParser_1.CarSetupDataParser() });
        this.data = this.fromBuffer(buffer);
    }
}
exports.PacketCarSetupDataParser = PacketCarSetupDataParser;
//# sourceMappingURL=PacketCarSetupDataParser.js.map