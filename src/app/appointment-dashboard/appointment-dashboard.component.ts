import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from '../appointment/services/appointment.service';
import { WebSiteType } from '../appointment/models/website-type.enum';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-appointment-dashboard',
  templateUrl: './appointment-dashboard.component.html',
  styleUrls: ['./appointment-dashboard.component.scss'],
})
export class AppointmentDashboardComponent implements OnInit {
  // Dashboard data
  dashboardData: any[] = [];
  loading = false;
  showCreateSlot = false;

  // Form
  slotForm!: FormGroup;
  intervalSlots: { date: string; start: string; end: string; available: number }[] = [];
  submitting = false;
  successMessage: string | null = null;
  error: string | null = null;
  websiteType: WebSiteType = environment.websiteType;

  constructor(private fb: FormBuilder, private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.fetchDashboard();

    this.slotForm = this.fb.group({
      serviceName: [{ value: this.websiteType, disabled: true }],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      fromTime: ['', Validators.required],
      toTime: ['', Validators.required],
      intervalMinutes: [30, [Validators.required, Validators.min(1)]],
      slotsPerInterval: [1, [Validators.required, Validators.min(1)]],
      notes: ['']
    });
  }

  // fetchDashboard() {
  //   this.loading = true;
  //   this.appointmentService.getDashboard().subscribe({
  //     next: (res) => {
  //       this.dashboardData = res;
  //       this.loading = false;
  //     },
  //     error: () => {
  //       this.loading = false;
  //     }
  //   });
  // }

  toggleCreateSlot() {
    this.showCreateSlot = !this.showCreateSlot;
  }

  // Time slot generator
  generateIntervals() {
    const v = this.slotForm.getRawValue();
    this.intervalSlots = [];
    if (!v.fromTime || !v.toTime || !v.intervalMinutes || !v.slotsPerInterval || !v.startDate || !v.endDate)
      return;

    const start = this.parseTime(v.fromTime);
    const end = this.parseTime(v.toTime);
    if (end <= start) return;

    const startDate = new Date(v.startDate);
    const endDate = new Date(v.endDate);
    const dates: string[] = [];
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      dates.push(d.toISOString().split('T')[0]);
    }

    for (const date of dates) {
      let current = new Date(start);
      while (current < end) {
        const next = new Date(current.getTime() + v.intervalMinutes * 60000);
        if (next > end) break;
        this.intervalSlots.push({
          date,
          start: this.formatTime(current),
          end: this.formatTime(next),
          available: v.slotsPerInterval
        });
        current = next;
      }
    }
  }

  parseTime(timeStr: string): Date {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  }

  formatTime(date: Date): string {
    return date.toTimeString().substring(0, 5);
  }

  onSubmit() {
    this.error = null;
    this.successMessage = null;

    if (this.slotForm.invalid) {
      this.slotForm.markAllAsTouched();
      return;
    }

    const v = this.slotForm.getRawValue();
    const payload = {
      websiteType: this.websiteType,
      fromTime: `${v.fromTime}:00`,
      toTime: `${v.toTime}:00`,
      intervalMinutes: +v.intervalMinutes,
      slotsPerInterval: +v.slotsPerInterval,
      notes: v.notes,
      dates: this.getDatesInRange(v.startDate, v.endDate)
    };

    this.submitting = true;
    this.appointmentService.createSlotV2(payload).subscribe({
      next: () => {
        this.submitting = false;
        this.successMessage = 'Slots created successfully!';
        this.showCreateSlot = false;
        this.fetchDashboard();
      },
      error: (err) => {
        this.submitting = false;
        this.error = err?.error || 'Error creating slots';
      }
    });
  }

  getDatesInRange(start: string, end: string): string[] {
    const dates: string[] = [];
    const startDate = new Date(start);
    const endDate = new Date(end);
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      dates.push(d.toISOString().split('T')[0]);
    }
    return dates;
  }
  dashboardGrouped: { 
    date: string; 
    totalSlots: number; 
    bookedCount: number; 
    remainingCount: number; 
    intervals: { fromTime: string; toTime: string; bookedCount: number; remainingCount: number }[]; 
    expanded: boolean;
  }[] = [];

  fetchDashboard() {
    this.loading = true;
    this.appointmentService.getDashboard().subscribe({
      next: (res: any[]) => {
        // Group by date
        const grouped: any = {};
        res.forEach(slot => {
          const date = slot.date;
          if (!grouped[date]) {
            grouped[date] = {
              date,
              totalSlots: 0,
              bookedCount: 0,
              remainingCount: 0,
              intervals: [],
              expanded: false
            };
          }
          grouped[date].intervals.push({
            fromTime: slot.fromTime,
            toTime: slot.toTime,
            bookedCount: slot.bookedCount,
            remainingCount: slot.remainingCount
          });
          grouped[date].totalSlots += slot.slotsPerInterval;
          grouped[date].bookedCount += slot.bookedCount;
          grouped[date].remainingCount += slot.remainingCount;
        });

        this.dashboardGrouped = Object.values(grouped);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
}

toggleExpand(dateGroup: any) {
  dateGroup.expanded = !dateGroup.expanded;
}

}
