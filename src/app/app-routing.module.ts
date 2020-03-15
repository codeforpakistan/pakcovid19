import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicDashboardComponent } from './views/public-dashboard/public-dashboard.component';
import { WorldDashboardComponent } from './views/world-dashboard/world-dashboard.component';

const routes: Routes = [
  { path: '', component: PublicDashboardComponent },
  { path: 'global', component: WorldDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
