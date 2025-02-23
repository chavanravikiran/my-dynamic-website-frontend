export class ServiceResponseDTO {
    constructor(
        public key: number,
        public serviceName: string,
        public serviceDetail: string,
        public serviceLogo: string,
        public serviceClickRouting : string
    ) { }
}
  