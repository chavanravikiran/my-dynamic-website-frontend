import { AcademicDetail } from "./academic-detail";
import { Experiences } from "./experiences-model";
import { Language } from "./language-model";
import { Project } from "./project-model";
import { Skill } from "./skill-model";

export class PortfolioModel {
    constructor(
        public key: number,
        public studentName: string,
        public selfPhoto: string | null,
        public age: number,
        public websiteName: string,
        public websiteNameId: number,
        public academicDetail: AcademicDetail[],
        public skill: Skill[],
        public project: Project[],
        public language: Language[],
        public experiences: Experiences[],
    ) { }
}