import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule,} from "@angular/common/http";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDialogModule,MatDialogRef,MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatButtonModule } from "@angular/material/button";
import { PdfViewerModule } from "ng2-pdf-viewer";
import { TranslocoRootModule } from "./transloco-root.module";
import { InAppBrowser } from "@awesome-cordova-plugins/in-app-browser/ngx";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTabsModule } from "@angular/material/tabs";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { SwiperModule } from "swiper/angular";
import { NetworkInterface } from "@awesome-cordova-plugins/network-interface/ngx";
import { ImageCropperModule } from "ngx-image-cropper";
import { CommonModule, DatePipe } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { MatSelectModule } from "@angular/material/select";
import { NgOtpInputModule } from "ng-otp-input";
import { DataTablesModule } from "angular-datatables";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { ScreenOrientation } from "@awesome-cordova-plugins/screen-orientation/ngx";
import { RecaptchaModule } from "ng-recaptcha";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule, MAT_DATE_LOCALE } from "@angular/material/core";
import { MatTableModule } from "@angular/material/table";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatRadioModule } from "@angular/material/radio";
import { FileOpener } from "@ionic-native/file-opener/ngx";
import { MatCardModule } from "@angular/material/card";
import { TranslocoModule } from "@ngneat/transloco";
import { GalleryComponent } from "./gallery/gallery.component";
import { LiveCountComponent } from "./live-count/live-count.component";
import { AboutUsComponent } from "./about-us/about-us.component";
import { InquiryComponent } from "./inquiry/inquiry.component";
import { MenuComponent } from "./menu/menu.component";
import { FooterComponent } from "./footer/footer.component";
import { ServicesComponent } from "./services/services.component";
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from "./header/header.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { GoogleMapComponent } from "./google-map/google-map.component";
import { GoogleMapsModule } from '@angular/google-maps';
import { PortfolioComponent } from "./portfolio/portfolio.component";
import { AuthInterceptor } from "./auth.interceptor";
import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
@NgModule({
  declarations: [
    AppComponent,
    ContactUsComponent,
    HeaderComponent,
    HomeComponent,
    ServicesComponent,
    FooterComponent,
    MenuComponent,
    InquiryComponent,
    AboutUsComponent,
    LiveCountComponent,
    GalleryComponent,
    GoogleMapComponent,
    PortfolioComponent,
    LoginComponent,
    RegistrationComponent,
    SidebarComponent,
    DashboardComponent,
    BreadcrumbComponent
    ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    HttpClientModule,
    MatExpansionModule,
    MatButtonModule,
    PdfViewerModule,
    ReactiveFormsModule,
    FormsModule,
    TranslocoRootModule,
    MatIconModule,
    MatProgressBarModule,
    MatSnackBarModule,
    ImageCropperModule,
    SwiperModule,
    MatInputModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    MatSelectModule,
    NgOtpInputModule,
    DataTablesModule,
    MatCheckboxModule,
    RecaptchaModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DragDropModule,
    MatTabsModule,
    MatTableModule,
    MatMenuModule,
    MatPaginatorModule,
    MatRadioModule,
    MatCardModule,
    TranslocoModule,
    CommonModule,
    GoogleMapsModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    BarcodeScanner,
    FileOpener,
    DatePipe,
    InAppBrowser,
    ScreenOrientation,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DATE_LOCALE, useValue: "en-GB" },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    NetworkInterface,,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // ✅ Allow Web Components
})
export class AppModule {}
