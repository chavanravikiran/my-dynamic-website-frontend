import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

  collapsed = false;

  constructor() {}

  menuItems: string[] = [];
  role = localStorage.getItem('role');
  websiteType = localStorage.getItem('websiteType');

  ngOnInit(): void {
    this.loadMenu();
  }

  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }

  getRoutePath(item: string): string {
    return `/${item.toLowerCase().replace(/\s+/g, '-')}`;
  }

  loadMenu(): void {
    if (this.role === 'ROLE_USER') {
      if (this.websiteType === 'PORTFOLIO WEBSITE') {
        this.menuItems = ['Dashboard', 'My Portfolio', 'services', 'Projects', 'About'];
      } else if (this.websiteType === 'SMART CONTACT') {
        this.menuItems = ['Dashboard', 'Contacts', 'services', 'Settings','about'];
      }
    }
  }
}
