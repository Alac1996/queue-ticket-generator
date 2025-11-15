import { Component, OnInit } from '@angular/core';
import { QueueService } from '../../services/queue.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {
  
  currentQueue: string = '';
  currentDateTime: string = '';
  private timer: any;

  constructor(
    private queueService: QueueService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCurrent();
    this.updateDateTime();

      this.timer = setInterval(() => {
        this.updateDateTime();
    }, 1000)
  }

  private updateDateTime(): void {
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const yyyy = now.getFullYear();

    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');

    this.currentDateTime = `วันที่ : ${dd}/${mm}/${yyyy} เวลา ${hh}:${min} น.`;
  }

  loadCurrent(): void {
    this.queueService.getCurrent().subscribe({
      next: (data) => {
        this.currentQueue = data;
      },
      error: (err) => console.error(err)
    });
  }

  ngOnDestroy() : void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  backToReceive(): void {
    this.router.navigate(['/receive']);
  }
}
