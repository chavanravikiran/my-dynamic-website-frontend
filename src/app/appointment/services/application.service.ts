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

export const api_url = "http://localhost:8280"; // dev
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
    return this.http.get<WebsiteResponse>(api_url+ "/openApi/"+websiteType);
  }

  getServices(websiteType: string): Observable<ServiceResponseDTO[]> {
    return this.http.get<ServiceResponseDTO[]>(api_url+"/openApi/fetchService/"+websiteType);
  }

  getGalleryData(websiteType: string): Observable<GalleryResponse> {
    return this.http.get<GalleryResponse>(`${api_url}/openApiGallery/fetchGallery/${websiteType}`);
  }
  
  getFollowUsData(websiteType: string): Observable<followUsResponse> {
    return this.http.get<followUsResponse>(`${api_url}/openApiForFollowUs/fetchFollowUs/${websiteType}`);
  }

  //TODO
  getLatLongAndContactUs(websiteType:string): Observable<WebsiteLatLongResponse> {
    return this.http.get<WebsiteLatLongResponse>(api_url+ "/openApiForFollowUs/fetchLocation/"+websiteType);
  }

  getOfficesByWebsite(websiteType: string): Observable<contactUsResponse> {
    return this.http.get<contactUsResponse>(api_url+ "/api/contact-us/"+websiteType);
  }

  
}
