"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketMotionDataParser = void 0;
const binary_parser_1 = require("binary-parser");
const F1Parser_1 = require("../F1Parser");
const CarMotionDataParser_1 = require("./CarMotionDataParser");
const PacketHeaderParser_1 = require("./PacketHeaderParser");
class PacketMotionDataParser extends F1Parser_1.F1Parser {
    constructor(buffer, packetFormat) {
        super();
        this.endianess('little')
            .nest('m_header', { type: new PacketHeaderParser_1.PacketHeaderParser(packetFormat) })
            .array('m_carMotionData', { length: 20, type: new CarMotionDataParser_1.CarMotionDataParser() })
            .array('m_suspensionPosition', {
            length: 4,
            type: new binary_parser_1.Parser().floatle(''),
        })
            .array('m_suspensionVelocity', {
            length: 4,
            type: new binary_parser_1.Parser().floatle(''),
        })
            .array('m_suspensionAcceleration', {
            length: 4,
            type: new binary_parser_1.Parser().floatle(''),
        })
            .array('m_wheelSpeed', {
            length: 4,
            type: new binary_parser_1.Parser().floatle(''),
        })
            .array('m_wheelSlip', {
            length: 4,
            type: new binary_parser_1.Parser().floatle(''),
        })
            .floatle('m_localVelocityX') // Velocity in local space
            .floatle('m_localVelocityY') // Velocity in local space
            .floatle('m_localVelocityZ') // Velocity in local space
            .floatle('m_angularVelocityX') // Angular velocity x-component
            .floatle('m_angularVelocityY') // Angular velocity y-component
            .floatle('m_angularVelocityZ') // Angular velocity z-component
            .floatle('m_angularAccelerationX') // Angular velocity x-component
            .floatle('m_angularAccelerationY') // Angular velocity y-component
            .floatle('m_angularAccelerationZ') // Angular velocity z-component
            .floatle('m_frontWheelsAngle'); // Current front wheels angle in radians;
        this.data = this.fromBuffer(buffer);
    }
}
exports.PacketMotionDataParser = PacketMotionDataParser;
//# sourceMappingURL=PacketMotionDataParser.js.map