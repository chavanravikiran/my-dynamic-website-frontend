import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {

  constructor(private router: Router) {} 
  menuOpen = false;
  breadcrumb: string[] = [];

  setBreadcrumb(path: string): void {
    this.breadcrumb = [path]; // Update breadcrumb path
    this.toggleMenu(); // Close the menu after selecting an item
  }

  toggleMenu() {
    const menu = document.getElementById('menu');
    if (menu) {
      this.menuOpen = !this.menuOpen;
      menu.classList.toggle('show'); // Toggle class for the sliding effect
      this.router.navigate(['']); 
    }
  }
}
