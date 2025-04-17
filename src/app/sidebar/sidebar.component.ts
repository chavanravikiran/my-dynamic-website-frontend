import { Component, EventEmitter, OnInit, Output } from '@angular/core';

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

  // toggleSidebar(): void {
  //   this.collapsed = !this.collapsed;
  // }
  @Output() collapsedChange = new EventEmitter<boolean>();

  toggleSidebar() {
    this.collapsed = !this.collapsed;
    this.collapsedChange.emit(this.collapsed);
  }

  getRoutePath(item: string): string {
    return `/${item.toLowerCase().replace(/\s+/g, '-')}`;
  }

  loadMenu(): void {
    if (this.role === 'ROLE_USER') {
      if (this.websiteType === 'PORTFOLIO WEBSITE') {
        this.menuItems = ['Dashboard', 'portfolio', 'services', 'Projects', 'About'];
      } else if (this.websiteType === 'SMART CONTACT') {
        this.menuItems = ['Dashboard', 'Contacts', 'services', 'Settings','about'];
      }
    }
  }
}
