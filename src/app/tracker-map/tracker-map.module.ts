import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackerMapComponent } from './tracker-map.component';
import { TrackerMapRoutingModule } from './tracker-map-routing.module';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';



@NgModule({
  declarations: [TrackerMapComponent],
  imports: [
    CommonModule,
    TrackerMapRoutingModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyCIF9JTYWMzEEPDKcZ6NgbzJDmZhrVx-RY' }), //AIzaSyBZOgVmZrg2dyQHOUTr8ThEnpNjdFva-s0       

  ]
})
export class TrackerMapModule { }
