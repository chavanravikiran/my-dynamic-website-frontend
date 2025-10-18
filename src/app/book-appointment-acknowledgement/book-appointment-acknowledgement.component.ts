import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from '../appointment/services/appointment.service';

@Component({
  selector: 'app-book-appointment-acknowledgement',
  templateUrl: './book-appointment-acknowledgement.component.html',
  styleUrls: ['./book-appointment-acknowledgement.component.scss'],
})
export class BookAppointmentAcknowledgementComponent implements OnInit {

   booking: any;

  constructor(private router: Router, private appointmentService: AppointmentService) {
    const nav = this.router.getCurrentNavigation();
    this.booking = nav?.extras?.state?.['booking'];
  }

  ngOnInit(): void {
    if (!this.booking) {
      this.router.navigate(['/book-appointment']);
    }
  }

  cancelBooking() {
    if (!confirm('Are you sure you want to cancel this booking?')) return;

    this.appointmentService.cancelBooking(this.booking.key).subscribe({
      next: () => {
        alert('Booking cancelled successfully');
        this.router.navigate(['/book-appointment']);
      },
      error: err => alert(err.error || 'Cancellation failed')
    });
  }

  MyAppointment(){
     this.router.navigate(['/my-appointment']);
  }
  generateReceipt(){
    console.log(this.booking.bookingId);
    const bookingId = this.booking.bookingId;

    this.appointmentService.generateReceipt(bookingId).subscribe({
      next: (res) => {
        const base64 = res.receiptBase64;
        const pdfData = `data:application/pdf;base64,${base64}`;

        // Open in new tab
        const link = document.createElement('a');
        link.href = pdfData;
        link.download = `appointment_receipt_${bookingId}.pdf`;
        link.click();
      },
      error: (err) => {
        console.error('Error generating receipt:', err);
        alert('Failed to generate receipt.');
      }
    });
  }
}

