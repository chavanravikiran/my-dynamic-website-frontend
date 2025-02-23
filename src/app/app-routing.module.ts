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


const routes: Routes = [
  // { path: "", component: LandingComponent },
  // { path: "landing", component: LandingComponent },
  // {
  //   path: "home",component: HomeComponent,
  // },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'services', component: ServicesComponent },
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
  {
    path: "appointment",
    children: [],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
