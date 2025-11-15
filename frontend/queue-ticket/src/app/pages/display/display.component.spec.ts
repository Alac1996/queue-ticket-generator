import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayComponent } from './display.component';
import { QueueService } from '../../services/queue.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('DisplayComponent', () => {
  let component: DisplayComponent;
  let fixture: ComponentFixture<DisplayComponent>;
  let queueServiceSpy: jasmine.SpyObj<QueueService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    queueServiceSpy = jasmine.createSpyObj('QueueService', ['getCurrent']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [DisplayComponent],
      providers: [
        { provide: QueueService, useValue: queueServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayComponent);
    component = fixture.componentInstance;
  });
  it('ควรโหลดคิวปัจจุบันตอน ngOnInit', () => {
    queueServiceSpy.getCurrent.and.returnValue(of('B2'));

    component.ngOnInit();
    fixture.detectChanges();

    expect(queueServiceSpy.getCurrent).toHaveBeenCalled();
    expect(component.currentQueue).toBe('B2');
  });

  it('ควรโหลดคิวใหม่เมื่อเรียก loadCurrent()', () => {
    queueServiceSpy.getCurrent.and.returnValue(of('C9'));

    component.loadCurrent();

    expect(queueServiceSpy.getCurrent).toHaveBeenCalled();
    expect(component.currentQueue).toBe('C9');
  });

  it('ควรอัปเดต currentDateTime ตอน ngOnInit', () => {
    queueServiceSpy.getCurrent.and.returnValue(of('A1'));
    const updateSpy = spyOn<any>(component as any, 'updateDateTime').and.callThrough();

    component.ngOnInit();

    expect(updateSpy).toHaveBeenCalled();
    expect(component.currentDateTime).not.toBe('');
  });

  it('ควร navigate กลับไปหน้า receive เมื่อเรียก backToReceive()', () => {
    component.backToReceive();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/receive']);
  });

  it('ควร clear timer ตอน ngOnDestroy', () => {
    queueServiceSpy.getCurrent.and.returnValue(of('A1'));
    component.ngOnInit();

    const clearSpy = spyOn(window, 'clearInterval').and.callThrough();

    component.ngOnDestroy();

    expect(clearSpy).toHaveBeenCalled();
  });
});
