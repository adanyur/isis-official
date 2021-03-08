import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { ProgramacionRoutingModule } from './programacion-routing.module';
import { ProgramacionListComponent } from './programacion-list/programacion-list.component';
import { ProgramacionComponent } from './programacion.component';
import { ProgramaccionAddEditComponent } from './programaccion-add-edit/programaccion-add-edit.component';

@NgModule({
  declarations: [
    ProgramacionListComponent,
    ProgramacionComponent,
    ProgramaccionAddEditComponent,
  ],
  imports: [
    CommonModule,
    ProgramacionRoutingModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [],
})
export class ProgramacionModule {}
