/// <reference types="node" />
import { Parser } from 'binary-parser';
import * as dgram from 'dgram';
import { EventEmitter } from 'events';
import * as constants from './constants';
import * as constantsTypes from './constants/types';
import { PacketCarSetupDataParser, PacketCarStatusDataParser, PacketCarTelemetryDataParser, PacketEventDataParser, PacketLapDataParser, PacketMotionDataParser, PacketParticipantsDataParser, PacketSessionDataParser } from './parsers/packets';
import * as packetTypes from './parsers/packets/types';
import { Options } from './types';
declare const DEFAULT_PORT = 20777;
/**
 *
 */
declare class F1TelemetryClient extends EventEmitter {
    port: number;
    client?: dgram.Socket;
    constructor(opts?: Options);
    /**
     *
     * @param {Buffer} buffer
     */
    static parsePacketHeader(buffer: Buffer): Parser.Parsed<any>;
    /**
     *
     * @param {Number} packetId
     */
    static getParserByPacketId(packetId: number): typeof PacketCarSetupDataParser | typeof PacketCarStatusDataParser | typeof PacketCarTelemetryDataParser | typeof PacketEventDataParser | typeof PacketLapDataParser | typeof PacketMotionDataParser | typeof PacketParticipantsDataParser | typeof PacketSessionDataParser | null;
    /**
     *
     * @param {Buffer} message
     */
    parseMessage(message: Buffer): void;
    /**
     * Method to start listening for packets
     */
    start(): void;
    /**
     * Method to close the client
     */
    stop(): void;
}
export { F1TelemetryClient, constants, constantsTypes, packetTypes, DEFAULT_PORT, };
