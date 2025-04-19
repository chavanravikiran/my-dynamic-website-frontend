import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApplicationService } from '../appointment/services/application.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  
  @Output() collapsedChange = new EventEmitter<boolean>();
  collapsed = false;

  constructor(private websideService: ApplicationService) {}

  menuItems: string[] = [];
  role = localStorage.getItem('role');
  websiteType = localStorage.getItem('websiteType');
  userId = localStorage.getItem('userId');
  

  // ngOnInit(): void {
  //   this.loadMenu();
  // }
  ngOnInit(): void {
    // delay the execution to wait for localStorage to be set
    setTimeout(() => {
      this.userId = localStorage.getItem('userId');
      if (this.userId) {
        this.loadMenu();
      }
    }, 200); // delay ensures login storage is set before component loads
  }
  

  loadMenuPublic(): void {
    this.role = localStorage.getItem('role');
    this.websiteType = localStorage.getItem('websiteType');
    this.userId = localStorage.getItem('userId');
    this.loadMenu();
  }

  toggleSidebar() {
    this.collapsed = !this.collapsed;
    this.collapsedChange.emit(this.collapsed);
  }

  getRoutePath(item: string): string {
    return `/${item.toLowerCase().replace(/\s+/g, '-')}`;
  }

  loadMenu(): void {
    if (this.userId) {
      this.websideService.getUserFeatures(+this.userId).subscribe({
        next: (features) => {
          this.menuItems = features.map(f => f.featureName);
        },
        error: (err) => {
          console.error('Failed to fetch features', err);
        }
      });
    }
  }
}
