export declare const PACKET_CAR_STATUS_DATA_BUFFER_2018: number[];
export declare const PACKET_CAR_STATUS_DATA_PARSED_2018: {
    m_header: {
        m_packetFormat: number;
        m_packetVersion: number;
        m_packetId: number;
        m_sessionTime: number;
        m_frameIdentifier: number;
        m_playerCarIndex: number;
        m_sessionUID: bigint;
    };
    m_carStatusData: {
        m_tractionControl: number;
        m_antiLockBrakes: number;
        m_fuelMix: number;
        m_frontBrakeBias: number;
        m_pitLimiterStatus: number;
        m_fuelInTank: number;
        m_fuelCapacity: number;
        m_maxRPM: number;
        m_idleRPM: number;
        m_maxGears: number;
        m_drsAllowed: number;
        m_tyresWear: number[];
        m_tyreCompound: number;
        m_tyresDamage: number[];
        m_frontLeftWingDamage: number;
        m_frontRightWingDamage: number;
        m_rearWingDamage: number;
        m_engineDamage: number;
        m_gearBoxDamage: number;
        m_exhaustDamage: number;
        m_vehicleFiaFlags: number;
        m_ersStoreEnergy: number;
        m_ersDeployMode: number;
        m_ersHarvestedThisLapMGUK: number;
        m_ersHarvestedThisLapMGUH: number;
        m_ersDeployedThisLap: number;
    }[];
};