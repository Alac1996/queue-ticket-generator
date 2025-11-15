import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetComponent } from './reset.component';
import { QueueService } from '../../services/queue.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('ResetComponent', () => {
  let component: ResetComponent;
  let fixture: ComponentFixture<ResetComponent>;
  let queueServiceSpy: jasmine.SpyObj<QueueService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    queueServiceSpy = jasmine.createSpyObj('QueueService', ['getCurrent', 'reset']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      imports: [ResetComponent],
      providers: [
        { provide: QueueService, useValue: queueServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetComponent);
    component = fixture.componentInstance;
  });

  it('ควรโหลดหมายเลขคิวปัจจุบันตน ngOnInit', () => {
    queueServiceSpy.getCurrent.and.returnValue(of('B5'));

    component.ngOnInit();
    fixture.detectChanges();

    expect(queueServiceSpy.getCurrent).toHaveBeenCalled();
    expect(component.currentQueue).toBe('B5');
  });

  it('ควรเรียก reset() และอัปเดต currentQueue เป็นค่าที่ได้จาก service', () => {
    queueServiceSpy.reset.and.returnValue(of('00'));

    component.reset();

    expect(queueServiceSpy.reset).toHaveBeenCalled();
    expect(component.currentQueue).toBe('00');
  });

  it('ควร navigate กลับไปหน้า receive เมื่อเรียก backToReceive()', () => {
    component.backToReceive();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/receive']);
  });
});
