import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController, ModalController, Platform, ToastController} from "@ionic/angular";
import { NetworkInterface } from "@awesome-cordova-plugins/network-interface/ngx";
import { HttpClient } from "@angular/common/http";
import { ApplicationService } from "./appointment/services/application.service";
import { WebsiteResponse } from "./appointment/models/website-response";
import { environment } from "src/environments/environment";
import { WebSiteType } from "./appointment/models/website-type.enum";
@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
  providers: [NetworkInterface],
})
export class AppComponent implements OnInit{
  
  constructor(
    public alertController: AlertController,
    public router: Router,
    public toastController: ToastController,
    private platform: Platform,
    private http: HttpClient,
    private modalCtrl: ModalController,
    private websideService: ApplicationService
  ) {}
  showFooter: boolean = true;
  
  websiteDetails: WebsiteResponse | null = null;
  errorMessage: string | null = null;
  websiteType: WebSiteType = environment.websiteType;

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  
  ngOnInit(): void {
    this.websideService.getWebsiteDetails(this.websiteType).subscribe({
      next: (response) => {
        this.websiteDetails = response;
      },
      error: (error) => {
        console.error('Error fetching website details:', error);
        this.errorMessage = 'Failed to load website details.';
      },
    });
  }
}
