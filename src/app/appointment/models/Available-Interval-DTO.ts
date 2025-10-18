import { SubOfficeResponse } from "./sub-office-response";

export class AvailableIntervalDTO {
    constructor(
        public serviceName: string,
        public slotId: number,
        public startTime: string, // "HH:mm:ss" or "HH:mm"
        public endTime: string,
        public available: number,
        public date: string, // yyyy-MM-dd
    ) { }
}