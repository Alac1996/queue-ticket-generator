import { Routes } from '@angular/router';
import { DisplayComponent } from './pages/display/display.component';
import { ReceiveComponent } from './pages/receive/receive.component';
import { ResetComponent } from './pages/reset/reset.component';

export const routes: Routes = [
    { path: '', redirectTo: 'receive', pathMatch: 'full' },
    { path: 'receive', component: ReceiveComponent },
    { path: 'display', component: DisplayComponent },
    { path: 'reset', component: ResetComponent}
];
