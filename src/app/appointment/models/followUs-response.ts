export class followUsResponse {
    constructor(
        public key: number,
        public platformName: string,
        public iconName: string,
        public fontAwesomeIcon : string,
        public displaySeq: number,
        public url: string,
    ) { }
}