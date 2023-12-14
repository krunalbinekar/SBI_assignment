import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  formGroup: FormGroup;
  post: any = '';
  dynamictype: string = "number";
  priority = [
    {value: 'low', viewValue: 'Low'},
    {value: 'medium', viewValue: 'Medium'},
    {value: 'high', viewValue: 'High'},
  ];
  dataSource :any = [];
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data : any,
    public dialogRef: MatDialogRef<DialogComponent>,
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private service : CrudService){
      this.createForm();
      if(data.actions == 'edit'){
      this.formGroup.patchValue(data)
      }else{
        this.createForm()
      }
  }

  ngOnInit() {
    if (this.cookieService.check('taskList')) {
      this.dataSource = JSON.parse(this.cookieService.get('taskList'))
    }
    console.log(this.data)
    // console.log(this.dataSource.findIndex(this.dataSource.id))
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'id':[],
      'taskname': [null, Validators.required],
      'taskdescription': [null, Validators.required],
      'duedate': [null, Validators.required],
      'priority': [null, Validators.required],
      'status':['incomplete']
    });
  }

  close(): void {
    this.dialogRef.close();
    }

    
  onSubmit(post : any) {
    if(this.data.actions == 'add'){
      this.formGroup.patchValue({
        id:this.dataSource.length
      })
    this.service.onPushData(this.formGroup.value)
    this.dataSource.push(this.formGroup.value)
    this.cookieService.set('taskList', JSON.stringify(this.dataSource))
    this.dataSource = JSON.parse(this.cookieService.get('taskList'))
    console.log(this.formGroup.value)
    console.log(this.dataSource)
    this.dialogRef.close();
    }else if(this.data.actions == 'edit'){
      const index = this.dataSource.findIndex((object: { id: string; }) => {
        this.formGroup.patchValue({
          id:object.id
        })
        return object.id === this.data.id;
      });
      console.log(index)
      if (index > -1) {
        this.dataSource.splice(index, 1);
      }
      console.log(this.dataSource)
      //this.dataSource.push(this.formGroup.value)
      this.dataSource.splice(index,0,this.formGroup.value)
      console.log(this.dataSource)
      this.cookieService.delete('taskList')
      this.cookieService.set('taskList', JSON.stringify(this.dataSource))
      this.dataSource = JSON.parse(this.cookieService.get('taskList'))
      this.service.onPushData(null)
      this.dialogRef.close();
    }
  }

}
