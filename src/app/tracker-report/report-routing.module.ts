import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrackerReportComponent } from './tracker-report.component';


const routes: Routes = [{ path: '', component: TrackerReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ReportRoutingModule {}