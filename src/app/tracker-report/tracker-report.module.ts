import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackerReportComponent } from './tracker-report.component';
import { ReportRoutingModule } from './report-routing.module';



@NgModule({
  declarations: [
    TrackerReportComponent
  ],
  imports: [
    CommonModule, ReportRoutingModule
  ]
})
export class TrackerReportModule { }
