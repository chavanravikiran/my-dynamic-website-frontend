import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-live-count',
  templateUrl: './live-count.component.html',
  styleUrls: ['./live-count.component.scss']
})
export class LiveCountComponent implements OnInit {

  dashboardData = [
    { id: 'clients', title: 'Clients', subtitle: 'Total Clients', count: 10005 },
    { id: 'companies', title: 'Companies', subtitle: 'Total Companies', count: 523 },
    { id: 'projects', title: 'Projects', subtitle: 'Completed Projects', count: 870 },
  ];

  counts: { [key: string]: number } = {};

  ngOnInit() {
    // Initialize counters to 0
    this.dashboardData.forEach((item) => (this.counts[item.id] = 0));
    // Start the animation
    this.animateCounts();
  }

  animateCounts() {
    this.dashboardData.forEach((item) => {
      const target = item.count; // Target count
      const duration = 2000; // Animation duration (in milliseconds)
      const interval = 20; // Interval time (in milliseconds)
      const step = target / (duration / interval);

      let current = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        this.counts[item.id] = Math.floor(current);
      }, interval);
    });
  }
}
