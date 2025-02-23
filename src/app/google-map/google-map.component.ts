import { Component, Input, OnInit } from '@angular/core';
import { ApplicationService } from '../appointment/services/application.service';
import { HttpClient } from '@angular/common/http';
import { WebSiteType } from '../appointment/models/website-type.enum';
import { environment } from 'src/environments/environment';
import { WebsiteResponse } from '../appointment/models/website-response';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {
  @Input() lat: number = 18.5599; // Default latitude
  @Input() lng: number = 73.7622; // Default longitude
  @Input() zoom: number = 12; // Default zoom level

  center: google.maps.LatLngLiteral = { lat: this.lat, lng: this.lng };  
  markerPosition: google.maps.LatLngLiteral = { lat: this.lat, lng: this.lng };
  websiteType: WebSiteType = environment.websiteType;
  websiteDetails: WebsiteResponse | null = null;
  errorMessage: string | null = null;

  constructor(
      private http: HttpClient,
      private websideService: ApplicationService
  ) {}

  ngOnInit(): void {
    this.fetchLatAndLong();
    this.updateCenter();
    this.updateCenterAndMarker();
  }
  ngOnChanges(): void {
    this.updateCenter();
  }
  private updateCenter(): void {
    this.center = { lat: this.lat, lng: this.lng };
  }

  private updateCenterAndMarker(): void {
    this.center = { lat: this.lat, lng: this.lng };
    this.markerPosition = { lat: this.lat, lng: this.lng };
  }

  fetchLatAndLong(){
    this.websideService.getLatLongAndContactUs(this.websiteType).subscribe({
      next: (response) => {
        // this.websiteDetails = response;

        // if (this.websiteDetails) {
        //   this.navLinks = this.websiteDetails.featureList.map((feature) => {
        //     const menu = feature.featureMenu;
        //     return {
        //       name: menu.featureName,
        //       path: `/${menu.featureName.toLowerCase()}`,
        //     };
        //   });
        // }
      },
      error: (error) => {
        console.error('Error fetching website details:', error);
        this.errorMessage = 'Failed to load website details.';
      },
    });
  }
}
