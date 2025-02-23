import { FeatureList } from "./featureList-response";

export class WebsiteContactUsResponse {
    constructor(
        public key: number,
        public phoneNo: string,
        public emailAddress: string,
        public telephoneNo: string,
        public address: string,
        public webSiteType: string | null,
        
        public status: string,
        public success: boolean,
        public successMsg: string | null,
        public error: boolean,
        public errorMessage: string | null,
    ) { }
}
  