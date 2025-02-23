import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../appointment/services/application.service';
import { PortfolioModel } from '../appointment/models/portfolio-model';
import { environment } from 'src/environments/environment';
import { WebSiteType } from '../appointment/models/website-type.enum';
import { Language } from '../appointment/models/language-model';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {
  portfolio: PortfolioModel | null = null;

  websiteType: WebSiteType = environment.websiteType;
  constructor(private websideService: ApplicationService) {}

  ngOnInit(): void {
    this.fetchPortfolio();
  }

  fetchPortfolio(): void {
    this.websideService.getStudentPortfolio(this.websiteType).subscribe(
      (data) => {
        this.portfolio = data;
      },
      (error) => {
        console.error('Error fetching portfolio:', error);
      }
    );
  }

  // Calculate Language Proficiency Percentage
  calculateLanguageProficiency(lang: Language): number {
    let count = 0;
    if (lang.canRead) count += 1;
    if (lang.canWrite) count += 1;
    if (lang.canSpeak) count += 1;

    return count === 3 ? 100 : count === 2 ? 75 : 50;
  }

  // Get Dynamic Color Based on Proficiency Percentage
  getLanguageColor(percentage: number): string {
    if (percentage === 100){
      return '#4CAF50'; // Green
    } 
    if (percentage === 75){
       return '#FFC107'; // Yellow
    }
    return '#FF5722'; // Red
  }

  // Get Skill Color Based on Percentage
  getSkillColor(percentage: number): string {
    return percentage > 80 ? '#4CAF50' : percentage > 60 ? '#FFC107' : '#FF5722';
  }
}