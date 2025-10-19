import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ServicesComponent } from "./services/services.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { DesignComponent } from "./design/design.component";
// import { AvailabilityComponent } from "./availability/availability.component";
import { FooterComponent } from "./footer/footer.component";
import { MenuComponent } from "./menu/menu.component";
import { InquiryComponent } from "./inquiry/inquiry.component";
import { AboutUsComponent } from "./about-us/about-us.component";
import { LiveCountComponent } from "./live-count/live-count.component";
import { GalleryComponent } from "./gallery/gallery.component";
import { PortfolioComponent } from "./portfolio/portfolio.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./auth.guard";
import { RegistrationComponent } from "./registration/registration.component";
import { LandingComponent } from "./landing/landing.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { BookAppointmentComponent } from "./book-appointment/book-appointment.component";
import { BookAppointmentAcknowledgementComponent } from "./book-appointment-acknowledgement/book-appointment-acknowledgement.component";
import { MyAppointmentsComponent } from "./my-appointments/my-appointments.component";
import { CreateAppointmentSlotComponent } from "./create-appointment-slot/create-appointment-slot.component";
import { AppointmentDashboardComponent } from "./appointment-dashboard/appointment-dashboard.component";


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'services', component: ServicesComponent ,canActivate: [AuthGuard]},
  { path: 'contactus', component: ContactUsComponent },
  { path: 'design', component: DesignComponent },
  // { path: 'availability', component: AvailabilityComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'inquiry', component: InquiryComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'live-count', component: LiveCountComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'book-appointment', component: BookAppointmentComponent, canActivate: [AuthGuard] },
  { path: 'book-acknowledgement', component: BookAppointmentAcknowledgementComponent },
  { path: 'my-appointment', component: MyAppointmentsComponent },
  // { path: 'create-appointment-slot', component: CreateAppointmentSlotComponent },
  { path: 'create-appointment-slot', component: AppointmentDashboardComponent },
  {
    path: "appointment",
    children: [],
  },
  {
    path: 'landing',
    component: LandingComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'my-portfolio', component: PortfolioComponent },
      { path: 'services', component: ServicesComponent },
      // { path: 'projects', component: ProjectsComponent },
      { path: 'contact-info', component: ContactUsComponent },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
