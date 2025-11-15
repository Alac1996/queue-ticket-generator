import { TestBed } from '@angular/core/testing';

import { QueueService } from './queue.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('QueueService', () => {
  let service: QueueService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [QueueService]
    });

    service = TestBed.inject(QueueService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('ควรเรียก /current และคืนค่า string ได้', () => {
    const mockResponse = 'A3';

    service.getCurrent().subscribe(result => {
      expect(result).toBe(mockResponse);
    });

    const req = httpMock.expectOne(r => 
      r.url.includes('/api/queue/current')
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });

  it('ควรเรียก /next แล้วได้หมายเลขคิวใหม่', () => {
    const mockResponse = 'A4';

    service.next().subscribe(result => {
      expect(result).toBe(mockResponse);
    });

    const req = httpMock.expectOne(r => 
      r.url.includes('/api/queue/next')
    );

    expect(req.request.method).toBe('POST');

    req.flush(mockResponse);
  });

  it('ควรเรียก /reset แล้วได้ "00"', () => {
    const mockResponse = '00';

    service.reset().subscribe(result => {
      expect(result).toBe(mockResponse);
    });

    const req = httpMock.expectOne(r => 
      r.url.includes('/api/queue/reset')
    );

    expect(req.request.method).toBe('POST');

    req.flush(mockResponse);
  });
});
