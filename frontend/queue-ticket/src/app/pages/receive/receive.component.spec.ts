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

  it('ควรโหลดหมายเลขคิวปัจจุบันตอน ngOnInit', () => {
    queueServiceSpy.getCurrent.and.returnValue(of('B5'));

    component.ngOnInit();
    fixture.detectChanges();

    expect(queueServiceSpy.getCurrent).toHaveBeenCalled();
    expect(component.currentQueue).toBe('B5');
  });

  it('ควรเรียก service.next และ navigate ไปหน้า display เมื่อ onReceiveTicket()', () => {
    queueServiceSpy.next.and.returnValue(of('A6'));

    component.onReceiveTicket();

    expect(queueServiceSpy.next).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/display']);
  });

  it('ควร navigate ไปหน้า reset หากมีปุ่มไปหน้าแสดงผล', () => {
    component.goToReset();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/reset']);
  });
});
