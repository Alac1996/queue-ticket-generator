import { Component, OnInit } from '@angular/core';
import { QueueService } from '../../services/queue.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receive',
  templateUrl: './receive.component.html',
  styleUrl: './receive.component.scss'
})
export class ReceiveComponent implements OnInit {

  currentQueue = '00';

  constructor(
    private queueService: QueueService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.queueService.getCurrent().subscribe(q => this.currentQueue = q);
  }

  onReceiveTicket() : void {
    this.queueService.next().subscribe(() => {
      this.router.navigate(['/display']);
    });
  }

  goToReset() : void {
    this.router.navigate(['/reset']);
  }
}
