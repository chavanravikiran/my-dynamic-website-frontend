// import { Component, EventEmitter, OnInit, Output } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AppointmentService } from '../appointment/services/appointment.service';
// import { Router } from '@angular/router';
// import { WebSiteType } from '../appointment/models/website-type.enum';
// import { environment } from 'src/environments/environment';
// import { formatDate } from '@angular/common';

// @Component({
//   selector: 'app-create-appointment-slot',
//   templateUrl: './create-appointment-slot.component.html',
//   styleUrls: ['./create-appointment-slot.component.scss'],
// })
// export class CreateAppointmentSlotComponent implements OnInit {
//   @Output() backToDashboard = new EventEmitter<void>();
//   slotForm!: FormGroup;
  
//   // ✅  this only ONCE, and include `date` in its type
//   intervalSlots: { date: string; start: string; end: string; available: number }[] = [];

//   submitting = false;
//   successMessage: string | null = null;
//   error: string | null = null;
//   websiteType: WebSiteType = environment.websiteType;

//   dashboardData: any[] = [];
//   loading = false;
//   showCreateSlot = false;
  
//   constructor(
//     private fb: FormBuilder,
//     private appointmentService: AppointmentService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.slotForm = this.fb.group({
//       serviceName: [{ value: this.websiteType, disabled: true }],
//       startDate: ['', Validators.required],
//       endDate: ['', Validators.required],
//       fromTime: ['', Validators.required],
//       toTime: ['', Validators.required],
//       intervalMinutes: [30, [Validators.required, Validators.min(1)]],
//       slotsPerInterval: [1, [Validators.required, Validators.min(1)]],
//       notes: ['']
//     });
//   }

//   // ✅ Correctly typed now — includes `date`
//   generateIntervals() {
//     const v = this.slotForm.getRawValue();
//     this.intervalSlots = [];

//     if (!v.fromTime || !v.toTime || !v.intervalMinutes || !v.slotsPerInterval || !v.startDate || !v.endDate)
//       return;

//     const start = this.parseTime(v.fromTime);
//     const end = this.parseTime(v.toTime);
//     if (end <= start) return;

//     // Generate date range list
//     const startDate = new Date(v.startDate);
//     const endDate = new Date(v.endDate);
//     const dates: string[] = [];
//     for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
//       dates.push(d.toISOString().split('T')[0]);
//     }

//     for (const date of dates) {
//       let current = new Date(start);
//       while (current < end) {
//         const next = new Date(current.getTime() + v.intervalMinutes * 60000);
//         if (next > end) break;
//         this.intervalSlots.push({
//           date: date,
//           start: this.formatTime(current),
//           end: this.formatTime(next),
//           available: v.slotsPerInterval
//         });
//         current = next;
//       }
//     }
//   }

//   parseTime(timeStr: string): Date {
//     const [hours, minutes] = timeStr.split(':').map(Number);
//     const date = new Date();
//     date.setHours(hours, minutes, 0, 0);
//     return date;
//   }

//   formatTime(date: Date): string {
//     return date.toTimeString().substring(0, 5);
//   }

//   onSubmit() {
//     this.error = null;
//     this.successMessage = null;

//     if (this.slotForm.invalid) {
//       this.slotForm.markAllAsTouched();
//       return;
//     }

//     const v = this.slotForm.getRawValue();
//     const fromTime = `${v.fromTime}:00`;
//     const toTime = `${v.toTime}:00`;

//     const start = new Date(v.startDate);
//     const end = new Date(v.endDate);
//     const today = new Date();

//     if (start < new Date(today.setHours(0, 0, 0, 0))) {
//       this.error = 'Cannot select past dates';
//       return;
//     }

//     const dateList: string[] = [];
//     for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
//       dateList.push(d.toISOString().split('T')[0]);
//     }

//     const payload = {
//       // serviceName: this.websiteType,
//       websiteType: this.websiteType,
//       dates: dateList,
//       fromTime,
//       toTime,
//       intervalMinutes: +v.intervalMinutes,
//       slotsPerInterval: +v.slotsPerInterval,
//       notes: v.notes
//     };

//     this.submitting = true;
//     this.appointmentService.createSlotV2(payload).subscribe({
//       next: () => {
//         this.submitting = false;
//         this.successMessage = 'Slots created successfully!';
//         setTimeout(() => this.router.navigate(['/admin/slots']), 1000);
//       },
//       error: err => {
//         this.submitting = false;
//         this.error = err?.error || 'Error creating slots';
//       }
//     });
//   }
  
//   toggleCreateSlot() {
//     this.backToDashboard.emit();
//   }

//   fillMorningPreset() {
//     this.slotForm.patchValue({
//       // serviceName: 'EREGISTRATION',
//       websiteType: this.websiteType,
//       websiteKey: 1,
//       date: formatDate(new Date(), 'yyyy-MM-dd', 'en-IN'),
//       fromTime: '09:00',
//       toTime: '13:00',
//       intervalMinutes: 30,
//       slotsPerInterval: 1,
//       notes: 'Morning appointment slots'
//     });
//   }
// }

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from '../appointment/services/appointment.service';
import { Router } from '@angular/router';
import { WebSiteType } from '../appointment/models/website-type.enum';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-appointment-slot',
  templateUrl: './create-appointment-slot.component.html',
  styleUrls: ['./create-appointment-slot.component.scss'],
})
export class CreateAppointmentSlotComponent implements OnInit {
  @Output() backToDashboard = new EventEmitter<void>();
  slotForm!: FormGroup;

  intervalSlots: { date: string; start: string; end: string; available: number }[] = [];

  submitting = false;
  successMessage: string | null = null;
  error: string | null = null;
  websiteType: WebSiteType = environment.websiteType;

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
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

  /** Format date as yyyy-MM-dd (timezone safe) */
  formatDateYYYYMMDD(date: Date): string {
    const y = date.getFullYear();
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const d = date.getDate().toString().padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  /** Parse time string HH:mm into Date object today */
  parseTime(timeStr: string): Date {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  }

  formatTime(date: Date): string {
    return date.toTimeString().substring(0, 5);
  }

  /** Generate intervals for preview table */
  generateIntervals() {
    const v = this.slotForm.getRawValue();
    this.intervalSlots = [];

    if (!v.fromTime || !v.toTime || !v.intervalMinutes || !v.slotsPerInterval || !v.startDate || !v.endDate)
      return;

    const startTime = this.parseTime(v.fromTime);
    const endTime = this.parseTime(v.toTime);
    if (endTime <= startTime) return;

    // Generate dates in the range (timezone safe)
    const startDate = new Date(v.startDate);
    const endDate = new Date(v.endDate);
    const dates: string[] = [];
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      dates.push(this.formatDateYYYYMMDD(new Date(d)));
    }

    // Generate intervals for each date
    for (const date of dates) {
      let current = new Date(startTime);
      while (current < endTime) {
        const next = new Date(current.getTime() + v.intervalMinutes * 60000);
        if (next > endTime) break;

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

  onSubmit() {
    this.error = null;
    this.successMessage = null;

    if (this.slotForm.invalid) {
      this.slotForm.markAllAsTouched();
      return;
    }

    const v = this.slotForm.getRawValue();
    const fromTime = `${v.fromTime}:00`;
    const toTime = `${v.toTime}:00`;

    const start = new Date(v.startDate);
    const end = new Date(v.endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) {
      this.error = 'Cannot select past dates';
      return;
    }

    // Generate date list for payload (timezone safe)
    const dateList: string[] = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      dateList.push(this.formatDateYYYYMMDD(new Date(d)));
    }

    const payload = {
      websiteType: this.websiteType,
      dates: dateList,
      fromTime,
      toTime,
      intervalMinutes: +v.intervalMinutes,
      slotsPerInterval: +v.slotsPerInterval,
      notes: v.notes
    };

    this.submitting = true;
    this.appointmentService.createSlotV2(payload).subscribe({
      next: () => {
        this.submitting = false;
        this.successMessage = 'Slots created successfully!';
        setTimeout(() => {
          this.backToDashboard.emit();
          window.location.reload();
        }, 500);
      },
      error: err => {
        this.submitting = false;
        this.error = err?.error || 'Error creating slots';
      }
    });
  }

  toggleCreateSlot() {
    this.backToDashboard.emit();
  }

  fillMorningPreset() {
    // const todayStr = this.formatDateYYYYMMDD(new Date());
    this.slotForm.patchValue({
      fromTime: '09:00',
      toTime: '13:00',
      intervalMinutes: 30,
      slotsPerInterval: 1,
      notes: 'Morning appointment slots',
      // startDate: todayStr,
      // endDate: todayStr
    });
    this.generateIntervals();
  }
}
