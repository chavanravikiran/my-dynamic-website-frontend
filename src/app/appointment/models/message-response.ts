export class MessageResponse {
    constructor(
        public status: 'SUCCESS' | 'FAILURE',
        public errorMessage: string | null,
        public successMsg: string | null,
        public error: boolean,
        public success: boolean,
    ) { }
}
  