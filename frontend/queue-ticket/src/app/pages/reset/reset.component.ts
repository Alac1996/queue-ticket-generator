import { Component, OnInit } from '@angular/core';
import { QueueService } from '../../services/queue.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  currentQueue = '00';

  constructor (
    private queueService: QueueService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCurrentQueue();
  }

  private loadCurrentQueue(): void {
    this.queueService.getCurrent().subscribe({
      next: (q) => this.currentQueue = q,
      error: (err) => console.log(err)
    });
  }

  reset(): void {
    this.queueService.reset().subscribe(q => {
      this.currentQueue = q;
    });
  }

  backToReceive(): void {
    this.router.navigate(['/receive']);
  }
}
