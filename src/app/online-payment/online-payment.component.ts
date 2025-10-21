import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment/services/appointment.service';
declare var Razorpay: any;

@Component({
  selector: 'app-online-payment',
  templateUrl: './online-payment.component.html',
  styleUrls: ['./online-payment.component.scss'],
})
export class OnlinePaymentComponent implements OnInit {

  applicationId = 1; // Replace with actual application ID
  amount = 100; // Hardcoded ₹100
  loading = false;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {}

  initiatePayment(): void {
    this.loading = true;
    this.appointmentService.createPayment(this.applicationId, this.amount).subscribe({
      next: (order) => {
        this.loading = false;
        this.openRazorpayCheckout(order);
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
        alert('Error while creating Razorpay order.');
      }
    });
  }

  openRazorpayCheckout(order: any): void {
    const options = {
      key: order.razorpayKey,
      amount: order.amount * 100, // in paise
      currency: order.currency,
      name: order.companyName,
      description: 'Application Payment #' + this.applicationId,
      order_id: order.razorpayOrderId,
      handler: (response: any) => {
        const payload = {
          paymentId: order.paymentId,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature
        };
        this.verifyPayment(payload);
      },
      prefill: {
        name: 'Ravikiran Chavan',
        email: 'ravikiranchavan9450@gmail.com',
        contact: '8552805879'
      },
      theme: {
        color: '#3399cc'
      }
    };

    // const rzp = new this.openRazorpayCheckout(options);
    const rzp = new Razorpay(options);
    rzp.open();

    rzp.on('payment.failed', (response: any) => {
      alert('Payment Failed: ' + response.error.description);
      console.error(response.error);
    });
  }

  verifyPayment(payload: any): void {
    this.appointmentService.verifyPayment(payload).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          alert('Payment successful!');
        } else {
          alert('Payment verification failed.');
        }
      },
      error: (err) => {
        console.error(err);
        alert('Error while verifying payment.');
      }
    });
  }

}
