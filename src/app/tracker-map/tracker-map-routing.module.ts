import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrackerMapComponent } from './tracker-map.component';


const routes: Routes = [{ path: '', component: TrackerMapComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class TrackerMapRoutingModule {}