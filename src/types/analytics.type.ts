interface Users {
    total: number;
    verified: number;
    unverified: number;
}

interface Drivers {
    total: number;
    onlyVerified: number;
    fullyVerified: number;
    unverified: number;
}

interface RideStatusCount {
    RideStatus: string;
    count: number;
}

interface Rides {
    total: number;
    byStatus: RideStatusCount[];
}

export interface SystemStats {
    users: Users;
    drivers: Drivers;
    rides: Rides;
}
