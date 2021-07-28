import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:"",
    redirectTo: '/map', pathMatch: 'full'
  },
  {
    path:"map",
    loadChildren: () => import('./tracker-map/tracker-map.module').then((mod) => mod.TrackerMapModule),
  },
  {
    path:"report",
    loadChildren: () => import('./tracker-report/tracker-report.module').then((mod) => mod.TrackerReportModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
