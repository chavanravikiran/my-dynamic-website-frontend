import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BookAppointmentAcknowledgementComponent } from './book-appointment-acknowledgement.component';

describe('BookAppointmentAcknowledgementComponent', () => {
  let component: BookAppointmentAcknowledgementComponent;
  let fixture: ComponentFixture<BookAppointmentAcknowledgementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BookAppointmentAcknowledgementComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BookAppointmentAcknowledgementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
