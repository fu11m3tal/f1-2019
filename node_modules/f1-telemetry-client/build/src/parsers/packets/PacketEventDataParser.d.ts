/// <reference types="node" />
import { F1Parser } from '../F1Parser';
import { PacketEventData } from './types';
export declare class PacketEventDataParser extends F1Parser {
    data: PacketEventData;
    constructor(buffer: Buffer, packetFormat: number);
    unpack2019Format: (buffer: Buffer, packetFormat: number) => void;
    getEventStringCode: (buffer: Buffer, packetFormat: number) => string;
}
