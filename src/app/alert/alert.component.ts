import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { DialogComponent } from '../example/dialog.component';
import { CrudService } from '../services/crud.service';
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  dataSource :any = [];

constructor( @Optional() @Inject(MAT_DIALOG_DATA) public data : any,
public dialogRef: MatDialogRef<DialogComponent>,
private formBuilder: FormBuilder,
private cookieService: CookieService,
private service : CrudService){
  if (this.cookieService.check('taskList')) {
    this.dataSource = JSON.parse(this.cookieService.get('taskList'))
  }
}

public cancel() {
  this.dialogRef.close(false);
}

public confirm() {
  const index = this.dataSource.findIndex((object: { id: string; }) => {
    return object.id === this.data.id;
  });
  console.log(index)
  if (index > -1) {
    this.dataSource.splice(index, 1);
  }
  this.cookieService.delete('taskList')
  this.cookieService.set('taskList', JSON.stringify(this.dataSource))
  this.dataSource = JSON.parse(this.cookieService.get('taskList'))
  this.service.onPushData(null)
  this.dialogRef.close(true);
}
}
