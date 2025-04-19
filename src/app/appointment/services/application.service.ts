import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { TranslocoService } from "@ngneat/transloco";
import { Observable } from "rxjs";
import { WebsiteResponse } from "../models/website-response";
import { ServiceResponseDTO } from "../models/service-response-dto";
// import { GalleryResponse } from "../models/gallery-Response";
import { followUsResponse } from "../models/followUs-response";
import { WebsiteLatLongResponse } from "../models/website-lat-long";
import { contactUsResponse } from "../models/contact-us-response";
import { GalleryResponse } from "../models/gallery-response";
import { PortfolioModel } from "../models/portfolio-model";
import { environment } from "src/environments/environment";
import { FeatureMenu } from "../models/featureMenu-response";

// export const api_url = "http://localhost:8280"; // dev
export const apiUrl = environment.apiUrl;
@Injectable({
  providedIn: "root", 
})

export class ApplicationService {

  progressSpinnerDialog: any = null;
  constructor(
    private http: HttpClient,
    private toastController: ToastController,
    private translocoService: TranslocoService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private httpClient: HttpClient
  ) {}

  async showErrorToast(errorMessage: string) {
    const toast = await this.toastController.create({
      message: errorMessage,
      icon: "information-circle",
      position: "top",
      cssClass: "toast error-toast",
      duration: 4000,
    });
    toast.present();
  }

  async successToast(msg) {
    await this._snackBar.open(msg, "Close", {
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: "success-toast",
      duration: 3 * 1000,
    });
  }

  async errorToast(error: any) {
    const toast = await this.toastController.create({
      message: error,
      icon: "information-circle",
      position: "top",
      cssClass: "toast error-toast",
      duration: 5000,
    });
    toast.present();
  }

  getWebsiteDetails(websiteType:string): Observable<WebsiteResponse> {
    return this.http.get<WebsiteResponse>(apiUrl+ "/openApi/"+websiteType);
  }

  getServices(websiteType: string): Observable<ServiceResponseDTO[]> {
    return this.http.get<ServiceResponseDTO[]>(apiUrl+"/openApi/fetchService/"+websiteType);
  }

  getGalleryData(websiteType: string): Observable<GalleryResponse> {
    return this.http.get<GalleryResponse>(`${apiUrl}/openApiGallery/fetchGallery/${websiteType}`);
  }
  
  getFollowUsData(websiteType: string): Observable<followUsResponse> {
    return this.http.get<followUsResponse>(`${apiUrl}/openApiForFollowUs/fetchFollowUs/${websiteType}`);
  }

  //TODO
  getLatLongAndContactUs(websiteType:string): Observable<WebsiteLatLongResponse> {
    return this.http.get<WebsiteLatLongResponse>(apiUrl+ "/openApiForFollowUs/fetchLocation/"+websiteType);
  }

  getOfficesByWebsite(websiteType: string): Observable<contactUsResponse> {
    return this.http.get<contactUsResponse>(apiUrl+ "/api/contact-us/"+websiteType);
  }

  getStudentPortfolio(websiteType: string): Observable<PortfolioModel> {
    return this.http.get<PortfolioModel>(apiUrl+ "/api/student/"+websiteType);
  }
  
  //Fetch FeatureRoleWise Website Wise
  getUserFeatures(userId: number): Observable<FeatureMenu[]> {
    return this.http.get<FeatureMenu[]>(`${apiUrl}/api/websiteRoleUserFeature/${userId}`);
  }
}
