import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WebSiteType } from '../appointment/models/website-type.enum';
import { Router } from '@angular/router';
import { ApplicationService } from '../appointment/services/application.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit{

  constructor(
    private router: Router,
    private websideService: ApplicationService
  ) {} 

  websiteType: WebSiteType = environment.websiteType;
  services: { image: string; name: string; description: string }[] = [];

  ngOnInit(){
    this.loadService(this.websiteType);
  }

  loadService(websiteType){
    this.websideService.getServices(this.websiteType).subscribe(
      (data) => {
        this.services = data.map((service) => ({
          image: service.serviceLogo,
          name: service.serviceName,
          description: service.serviceDetail,
        }));
      },
      (error) => {
        console.error('Error fetching services', error);
      }
    );
  }
}
