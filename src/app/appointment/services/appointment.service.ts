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
import { AvailableIntervalDTO } from "../models/Available-Interval-DTO";
import { PagedResponse } from "../models/paged-response";
import { MyAppointmentSummaryResponse } from "../models/my-appointment-summary-response";

// export const api_url = "http://localhost:8280"; // dev
export const apiUrl = environment.apiUrl;
 const websiteTypes=environment.websiteType;
@Injectable({
  providedIn: "root", 
})

export class AppointmentService {

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

  createSlot(payload: any): Observable<any> {
    return this.http.post(`${apiUrl}/api/appointments/slots`, payload);
  }

  deactivateSlot(slotId: number): Observable<any> {
    return this.http.delete(`${apiUrl}/api/appointments/slots/${slotId}`);
  }

  getByWebsiteAndDate(websiteKey: number, date: string) {
    return this.http.get<AvailableIntervalDTO[]>(`${apiUrl}/api/appointments/website/${websiteKey}/date/${date}`);
  }

  book(payload: any) {
    return this.http.post(`${apiUrl}/api/appointments/book`, payload);
  }

  cancelBooking(bookingId: number) {
    return this.http.post(`${apiUrl}/api/appointments/cancel/${bookingId}`, {});
  }

  getSlotsFromToday(websiteKey: number): Observable<{ [date: string]: AvailableIntervalDTO[] }> {
    return this.http.get<{ [date: string]: AvailableIntervalDTO[] }>(
      `${apiUrl}/api/appointments/website/${websiteKey}/from-today`
    );
  }

  getMyAppointments(page = 0, size = 10, status?: string, dateFrom?: string, dateTo?: string)
    : Observable<PagedResponse<MyAppointmentSummaryResponse>> {

    let params = new HttpParams()
      .set('page', String(page))
      .set('size', String(size));

    if (status) params = params.set('status', status);
    if (dateFrom) params = params.set('dateFrom', dateFrom);
    if (dateTo) params = params.set('dateTo', dateTo);

    return this.http.get<PagedResponse<MyAppointmentSummaryResponse>>(`${apiUrl}/api/appointments/my`, { params });
  }

  confirmAppointment(bookingId: number) {
    return this.http.post(`${apiUrl}/api/appointments/confirm/${bookingId}`, {});
  }

  generateReceipt(bookingId: number) {
    return this.http.get<any>(`${apiUrl}/api/reports/generateAppointmentReceipt/${bookingId}`);
  }
}
