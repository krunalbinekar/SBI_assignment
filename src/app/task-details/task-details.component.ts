import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent {
taskDetails:any
  constructor(private service : CrudService,
    private location : Location,private router:Router){
    try {
      this.service.specifictaskdetails.subscribe(res => {
        if(res == null){
          this.location.back()
        }else{
        this.taskDetails = res
        }
      },error => {

      })
    } catch(err) {
    }
  }

  goBack(){
    this.router.navigate(['tasks'])
  }

}
