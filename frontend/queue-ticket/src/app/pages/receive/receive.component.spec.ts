import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveComponent } from './receive.component';
import { QueueService } from '../../services/queue.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('ReceiveComponent', () => {
  let component: ReceiveComponent;
  let fixture: ComponentFixture<ReceiveComponent>;
  let queueServiceSpy: jasmine.SpyObj<QueueService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    queueServiceSpy = jasmine.createSpyObj('QueueService', ['getCurrent',  'next']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReceiveComponent],
      providers: [
        { provide: QueueService, useValue: queueServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceiveComponent);
    component = fixture.componentInstance;
  });

  it('ควรโหลดคิวปัจจุบันตอน ngOnInit', () => {
    queueServiceSpy.getCurrent.and.returnValue(of('A5'));

    component.ngOnInit();
    fixture.detectChanges();

    expect(queueServiceSpy.getCurrent).toHaveBeenCalled();
    expect(component.currentQueue).toBe('A5');
  });

  it('ควรรับบัตรคิวใหม่เมื่อกดปุ่ม next()' , () => {
    queueServiceSpy.next.and.returnValue(of('A6'));

    component.onReceiveTicket();

    expect(queueServiceSpy.next).toHaveBeenCalled();
    expect(component.currentQueue).toBe('A6');
  });

  it('ควร navigate ไปหน้า display หากมีปุ่มไปหน้าแสดงผล', () => {
    component.goToReset();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/display']);
  });
});
