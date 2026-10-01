import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', redirectTo: 'property-enquiry', pathMatch: 'full' },
  { path: 'property-enquiry', loadComponent: () => import('./landing/landing.component').then(m => m.LandingComponent) },
  { path: '**', redirectTo: 'property-enquiry' }
];
