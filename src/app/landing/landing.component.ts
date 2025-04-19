import { Component, OnInit, ViewChild } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {

  @ViewChild(SidebarComponent) sidebar!: SidebarComponent;

  ngOnInit() {
    // wait a bit to ensure child component is initialized
    setTimeout(() => {
      this.sidebar.loadMenuPublic(); // 👈 trigger it after landing
    }, 100);
  }

}
