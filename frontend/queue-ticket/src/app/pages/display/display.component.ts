import { Component, OnInit } from '@angular/core';
import { QueueService } from '../../services/queue.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {
  
  currentQueue = '00';

  constructor(
    private queueService: QueueService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCurrent();
  }

  loadCurrent(): void {
    this.queueService.getCurrent().subscribe(q => this.currentQueue = q);
  }

  backToReceive(): void {
    this.router.navigate(['/receive']);
  }
}
