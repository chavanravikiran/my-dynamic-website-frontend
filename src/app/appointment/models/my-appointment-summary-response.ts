import { SubOfficeResponse } from "./sub-office-response";

export class MyAppointmentSummaryResponse {
    constructor(
        public bookingId:number,
        public serviceName: string,
        public date: string,      // yyyy-MM-dd
        public startTime: string, // HH:mm:ss
        public endTime: string,   // HH:mm:ss
        public status: string,    // BOOKED | CANCELLED | COMPLETED
    ) { }
}