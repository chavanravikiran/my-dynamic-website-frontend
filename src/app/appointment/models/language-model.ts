export class Language {
    constructor(
        public key: number,
        public languageName: string,
        public canRead: boolean,
        public canWrite: boolean,
        public canSpeak: boolean,
    ) { }
}