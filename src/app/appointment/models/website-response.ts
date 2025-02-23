import { FeatureList } from "./featureList-response";

export class WebsiteResponse {
    constructor(
        public key: number,
        public websiteName: string,
        public websiteNameMr: string,
        public oldWebsiteLink: string,
        public websiteLogo: string,
        public webSiteType: string | null,
        
        public status: string,
        public success: boolean,
        public successMsg: string | null,
        public error: boolean,
        public errorMessage: string | null,

        public featureList: FeatureList[],
    ) { }
}
  