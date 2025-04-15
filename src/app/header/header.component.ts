import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ApplicationService } from '../appointment/services/application.service';
import { WebsiteResponse } from '../appointment/models/website-response';
import { FeatureMenu } from '../appointment/models/featureMenu-response';
import { WebSiteType } from '../appointment/models/website-type.enum';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  websiteType: WebSiteType = environment.websiteType;

  websiteDetails: WebsiteResponse | null = null;
  errorMessage: string | null = null;
  filteredFeatures: FeatureMenu[] = [];
  navLinks: { name: string; path: string }[] = [];

  constructor(
    private router: Router,
    private websideService: ApplicationService
  ) {} 

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  ngOnInit(): void {
    this.websideService.getWebsiteDetails(this.websiteType).subscribe({
      next: (response) => {
        this.websiteDetails = response;

        if (this.websiteDetails) {
          this.navLinks = this.websiteDetails.featureList.map((feature) => {
            const menu = feature.featureMenu;
            return {
              name: menu.featureName,
              path: `/${menu.featureName.toLowerCase()}`,
            };
          });
        }
      },
      error: (error) => {
        console.error('Error fetching website details:', error);
        this.errorMessage = 'Failed to load website details.';
      },
    });
  }
  isMenuOpen = false;

  toggleMenu() {
    console.log("Menu toggled");
    console.log("isMenuOpen:", this.isMenuOpen);
    this.router.navigate(['/menu']); 
  }

  navigateToFeature(featureName: string): void {
    console.log(`Navigating to feature: ${featureName}`);
    // Add your routing logic here if needed
  }

  navigateToHome(): void {
    console.log('Navigating to Home');
    this.router.navigate(['/home']);
  }

  scrollToFeature(featurePath: string): void {
    const element = document.getElementById(featurePath.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }
}
