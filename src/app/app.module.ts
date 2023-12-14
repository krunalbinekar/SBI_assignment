import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button'
import { RouterModule } from '@angular/router';
import { DialogComponent } from './example/dialog.component';
import {MatFormFieldDefaultOptions, MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { AlertComponent } from './alert/alert.component';
import { ChartsModule } from 'ng2-charts';

const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline'
};
@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    AlertComponent,  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    ChartsModule
  ],
  providers: [    {
    provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
    useValue: appearance
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
