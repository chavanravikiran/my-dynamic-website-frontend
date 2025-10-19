import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { AvailableIntervalDTO } from '../appointment/models/Available-Interval-DTO';
import { AppointmentService } from '../appointment/services/appointment.service';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.scss'],
})
export class BookAppointmentComponent implements  OnInit{
slotsByDate: { [date: string]: AvailableIntervalDTO[] } = {};
  selectedDate: string | null = null;
  object = Object; // to use Object.keys in template

  constructor(private appointmentService: AppointmentService,private router: Router) {}

  ngOnInit(): void {
    this.loadSlots();
  }

  loadSlots(): void {
    const websiteKey = 1;
    this.appointmentService.getSlotsFromTodayV1(websiteKey).subscribe({
      next: data => {
        // sort dates ascending
        this.slotsByDate = Object.keys(data)
          .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
          .reduce((obj, key) => {
            obj[key] = data[key];
            return obj;
          }, {} as { [date: string]: AvailableIntervalDTO[] });
        if (!this.selectedDate) {
          this.selectedDate = Object.keys(this.slotsByDate)[0]; // default first date
        }
      },
      error: err => console.error(err)
    });
  }

  selectDate(date: string) {
    this.selectedDate = date;
  }

  bookSlot(slot: AvailableIntervalDTO) {
    if (slot.available === 0) return;

    const payload = {
      slotId: slot.slotId,
      date: slot.date,
      startTime: slot.startTime
    };

     this.appointmentService.book(payload).subscribe({
     next: res => {
      // Navigate to acknowledgement page with booking data
      this.router.navigate(['/book-acknowledgement'], { state: { booking: res } });
      },
      error: err => alert(err.error || 'Booking failed')
    });
  }
}
