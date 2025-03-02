import { Project } from "./project-model";

export class Experiences {
    constructor(
        public key: number,
        public companyName: string,
        public projectDescription: string,
        public technology: string,
        public startDateOnWorkingProject: number,
        public endDateOnWorkingProject: number,
        public projects: Project,
    ) { }
}
  