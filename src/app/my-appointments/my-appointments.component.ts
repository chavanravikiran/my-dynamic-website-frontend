import { Component, OnInit } from '@angular/core';
import { MyAppointmentSummaryResponse } from '../appointment/models/my-appointment-summary-response';
import { AppointmentService } from '../appointment/services/appointment.service';
import { Router } from '@angular/router';
import { PagedResponse } from '../appointment/models/paged-response';

@Component({
  selector: 'app-my-appointments',
  templateUrl: './my-appointments.component.html',
  styleUrls: ['./my-appointments.component.scss'],
})
export class MyAppointmentsComponent implements OnInit {

appointments: MyAppointmentSummaryResponse[] = [];
  page = 0;
  size = 10;
  totalPages = 0;
  totalElements = 0;
  statusFilter: string | null = null;
  dateFrom: string | null = null; // yyyy-MM-dd
  dateTo: string | null = null;
  loading = false;
  statuses: string[] = [];

  constructor(private appointmentService: AppointmentService, private router: Router) {}

  ngOnInit(): void {
    this.load();
  }

  load(page = 0) {
    this.loading = true;
    this.appointmentService.getMyAppointments(page, this.size, this.statusFilter || undefined, this.dateFrom || undefined, this.dateTo || undefined)
      .subscribe({
        next: (res: PagedResponse<MyAppointmentSummaryResponse>) => {
          this.statuses = [...new Set(res.content.map((item: any) => item.status))];
          this.appointments = res.content;
          this.page = res.pageNumber;
          this.size = res.pageSize;
          this.totalPages = res.totalPages;
          this.totalElements = res.totalElements;
          this.loading = false;
        },
        error: err => {
          console.error(err);
          this.loading = false;
        }
      });
  }

  applyFilters() {
    this.load(0);
  }

  clearFilters() {
    this.statusFilter = null;
    this.dateFrom = null;
    this.dateTo = null;
    this.load(0);
  }

  prevPage() {
    if (this.page > 0) this.load(this.page - 1);
  }

  nextPage() {
    if (this.page + 1 < this.totalPages) this.load(this.page + 1);
  }

  goToDetails(booking: MyAppointmentSummaryResponse) {
    // example: navigate to existing acknowledgement/details page
    this.router.navigate(['/book-acknowledgement'], { state: { booking } });
  }

  confirm(booking: MyAppointmentSummaryResponse) {
    if (!confirm('Confirm this appointment? This will mark it as COMPLETED.')) return;
    this.appointmentService.confirmAppointment(booking.bookingId).subscribe({
      next: res => {
        alert('Appointment marked as completed');
        this.load(this.page);
      },
      error: err => alert(err.error || 'Confirm failed')
    });
  }

  cancel(booking: MyAppointmentSummaryResponse) {
    if (!confirm('Are you sure you want to cancel this appointment?')) return;
    this.appointmentService.cancelBooking(booking.bookingId).subscribe({
      next: () => {
        alert('Booking cancelled successfully');
        this.router.navigate(['/book-appointment']);
      },
      error: err => alert(err.error || 'Cancellation failed')
    });
  }

}
