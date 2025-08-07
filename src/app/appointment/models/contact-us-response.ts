import { SubOfficeResponse } from "./sub-office-response";

export class contactUsResponse {
    constructor(
        public headOfficeName: string,
        public headOfficeAddress: string,
        public headOfficePhone : string,
        public headOfficeEmail: string,
        public subOffices : SubOfficeResponse[],
    ) { }
}