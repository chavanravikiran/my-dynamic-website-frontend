import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ApplicationService } from '../appointment/services/application.service';
import { environment } from 'src/environments/environment';
import { WebSiteType } from '../appointment/models/website-type.enum';
import { followUsResponse } from '../appointment/models/followUs-response';
import { contactUsResponse } from '../appointment/models/contact-us-response';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  isFooterVisible = false;

  constructor(private el: ElementRef,
    private websideService: ApplicationService
  ) {}
  
  websiteType: WebSiteType = environment.websiteType;
  errorMessage: string | null = null;
  socialMediaLinks: followUsResponse[] = [];
  contactUsResponse!: contactUsResponse;

  ngOnInit() {
    this.fetchContactUs();
    this.fetchFollowUsData();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const footerTop = this.el.nativeElement.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (footerTop < windowHeight) {
      this.isFooterVisible = true;
    } else {
      this.isFooterVisible = false;
    }
  }

  fetchFollowUsData(): void {
    this.websideService.getFollowUsData(this.websiteType).subscribe({
      next: (response) => {
        if (Array.isArray(response)) {
          this.socialMediaLinks = response.sort((a, b) => a.displaySeq - b.displaySeq);
        } else {
          console.error('Invalid response format:', response);
          this.errorMessage = 'Unexpected response format.';
        }
      },
      error: (error) => {
        console.error('Error fetching Follow-Us data:', error);
        this.errorMessage = 'Failed to load Follow-Us data.';
      },
    });
  }

  fetchContactUs(){
    this.websideService.getOfficesByWebsite(this.websiteType).subscribe(data => {
      this.contactUsResponse = data;
    });
  }
}
