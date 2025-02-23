import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LiveCountComponent } from "../live-count/live-count.component";

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit{
  @ViewChild('teamContainer', { static: false }) teamContainer!: ElementRef;
  team: any[] = [];
  isMobile: boolean = false;
  clonedTeam: any[] = []; // Cloned elements for infinite scroll

  ngOnInit() {
    // this.team = this.getTeamMembers();
    // this.clonedTeam = [...this.team, ...this.team]; // Duplicate the team members
    this.team = this.getTeamMembers();
    this.checkScreenSize();
    this.autoScroll();
  }

  ngAfterViewInit() {
    this.autoScroll();
  }

  teamMembers = [
    { name: 'John Doe', role: 'CEO', image: 'assets/images/service1.jpg', info: 'Experienced leader with a vision.'  },
    { name: 'Jane Smith', role: 'CTO', image: 'assets/images/service2.jpg', info: 'Tech enthusiast and problem solver.'  },
    { name: 'Michael Brown', role: 'Lead Developer', image: 'assets/images/service3.jpg' , info: 'Passionate about coding and innovation.' },
    { name: 'Michael Brown', role: 'Lead Developer', image: 'assets/images/service3.jpg' , info: 'Passionate about coding and innovation.' },
  ];

  getTeamMembers() {
    return this.teamMembers;
  }
  
  scrollLeft() {
    this.teamContainer.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight() {
    this.teamContainer.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }

  autoScroll() {
    setInterval(() => {
      if (this.teamContainer) {
        const container = this.teamContainer.nativeElement;
        container.scrollBy({ left: 300, behavior: 'smooth' });

        // If reached end, reset to start without visible transition
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 300) {
          setTimeout(() => {
            container.scrollTo({ left: 0, behavior: 'auto' }); // Instant reset
          }, 500); // Delay to avoid abrupt jumping
        }
      }
    }, 3000); // Scroll every 3 seconds
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;

    if (!this.isMobile) {
      // Clone team array only if it's not mobile
      this.clonedTeam = [...this.team, ...this.team];
    } else {
      // Use original array for mobile (no duplicates)
      this.clonedTeam = [...this.team];
    }
  }
}
