import { FeatureList } from "./featureList-response";

export class WebsiteLatLongResponse {
    constructor(
        public key: number,
        public latitude: string,
        public longitude: string,
        public address: string,
        public headOffice: string,
        
        public status: string,
        public success: boolean,
        public successMsg: string | null,
        public error: boolean,
        public errorMessage: string | null,
    ) { }
}
  