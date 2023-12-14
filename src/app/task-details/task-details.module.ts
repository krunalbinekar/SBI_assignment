import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskDetailsRoutingModule } from './task-details-routing.module';
import { TaskDetailsComponent } from './task-details.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    TaskDetailsComponent
  ],
  imports: [
    CommonModule,
    TaskDetailsRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class TaskDetailsModule { }
