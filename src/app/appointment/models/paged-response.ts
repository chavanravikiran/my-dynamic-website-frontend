import { SubOfficeResponse } from "./sub-office-response";

export class PagedResponse<T> {
    constructor(
        public content: T[],
        public pageNumber: number,
        public pageSize: number,
        public totalElements: number,
        public totalPages: number,
        public last: boolean,
    ) { }
}
