import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveCountComponent } from './live-count.component';

describe('LiveCountComponent', () => {
  let component: LiveCountComponent;
  let fixture: ComponentFixture<LiveCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveCountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
