import { Component, OnInit } from '@angular/core';
import { QueueService } from '../../services/queue.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent {

  currentQueue = '00';

  constructor (
    private queueService: QueueService,
    private router: Router
  ) {}

  reset(): void {
    this.queueService.reset().subscribe(q => {
      this.currentQueue = q;
    });
  }

  backToReceive(): void {
    this.router.navigate(['/receive']);
  }
}
