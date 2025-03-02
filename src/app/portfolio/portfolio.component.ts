import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../appointment/services/application.service';
import { PortfolioModel } from '../appointment/models/portfolio-model';
import { environment } from 'src/environments/environment';
import { WebSiteType } from '../appointment/models/website-type.enum';
import { Language } from '../appointment/models/language-model';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
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

  downloadPDF(): void {
    const element = document.querySelector('.portfolio-container') as HTMLElement;
  
    if (!element) {
      console.error('Portfolio container not found');
      return;
    }
  
    html2canvas(element, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size
  
      const imgWidth = 190; // Slightly reduced width for margins
      const pageHeight = 400;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const marginTop = 15; // Add space at the top
      const marginBottom = 15; // Add space at the bottom
  
      let heightLeft = imgHeight;
      let position = marginTop; // Start below the margin
  
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight, '', 'FAST');
      heightLeft -= (pageHeight - marginTop - marginBottom);
  
      while (heightLeft > 0) {
        position = heightLeft - imgHeight + marginTop;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight, '', 'FAST');
        heightLeft -= (pageHeight - marginTop - marginBottom);
      }
  
      pdf.save('Portfolio.pdf');
    });
  }
}