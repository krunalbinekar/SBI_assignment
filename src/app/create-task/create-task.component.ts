import { Component, ViewChild, ContentChildren, QueryList, forwardRef } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragHandle } from '@angular/cdk/drag-drop';
import { MatTable } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../example/dialog.component';
import { CrudService } from '../services/crud.service';
import { AlertComponent } from '../alert/alert.component';
import { Router } from '@angular/router';
import { ChartOptions,ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
//   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
//   { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
//   { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
//   { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
//   { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
//   { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
// ];

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})


export class CreateTaskComponent {
  constructor(private cookieService: CookieService,
    public dialog: MatDialog,private service : CrudService,
    private router : Router) {

  }
  @ViewChild('table') table: MatTable<any>;
  displayedColumns: string[] = ['id','taskname', 'taskdescription','actions'];
  dataSource : any = [];
  simpleDialog: MatDialogRef<DialogComponent>;
  deleteDialog: MatDialogRef<AlertComponent>;
  status :any
  searchText:any
  searchTexts:any
  searchTextss:any
  myDate:any
  public chartType = 'bar';
  public chartLabels:Array<string> = [];
  public chartData:Array<number> = [];
  public doughnutChartOptions:ChartOptions = {
    responsive : true,
    scales : {
      xAxes :[{}], yAxes:[{
        ticks:{
          beginAtZero : true
        }
      }]
    },legend:{
      position:'bottom'
    }
  };
  pieColors = [
    {
      backgroundColor:[
        '#f77eb9','#fdb16d','#3f51b5'
      ]
    }
  ]
  public chartTypeLabels: Label[] = ['Priority']
  public chartTypeData:any[]

  public chartTypes = 'pie';
  public chartLabelss:Array<string> = [];
  public chartDatas:Array<number> = [];
  public doughnutChartOptionss:ChartOptions = {
    responsive : true,
   legend:{
      display:true
    }
  };
  pieColorss = [
    {
      backgroundColor:[
        '#f77eb9','#fdb16d','#3f51b5'
      ]
    }
  ]
  public chartTypeLabelss: Label[] = [['Completed','Status'],['InComplete','Status']]
  public chartTypeDatas:SingleDataSet
  public pieChartType: ChartType = 'pie';
  ngOnInit() {
    this.myDate = new Date();
    this.myDate.setFullYear( this.myDate.getFullYear() + 1 );
    // this.cookieService.set('taskList',JSON.stringify(this.dataSource))
    // console.log(JSON.parse(this.cookieService.get('taskList')));

    try {
      this.service.taskdetails.subscribe(res => {
        if(res == null){
          if (this.cookieService.check('taskList')) {
            this.dataSource = JSON.parse(this.cookieService.get('taskList'))
            this.chartDetails()
          }
        }else{
          this.dataSource.push(res);
          this.cookieService.set('taskList', JSON.stringify(this.dataSource),{expires : this.myDate})
          this.dataSource = JSON.parse(this.cookieService.get('taskList'))
          this.chartDetails()
        }
        this.table?.renderRows()
      },error => {

      })
    } catch(err) {
      this.dataSource = JSON.parse(this.cookieService.get('taskList'))
    }

    this.chartDetails();
  }

  dropTable(event: CdkDragDrop<[]>) {
    const prevIndex = this.dataSource.findIndex((d : any) => d === event.item.data);
    moveItemInArray(this.dataSource, prevIndex, event.currentIndex);
    this.table.renderRows();
    this.cookieService.set('taskList', JSON.stringify(this.dataSource),{expires : this.myDate})
    this.chartDetails()
  }

  //   applyFilter(event: Event) {
  //     const filterValue = (event.target as HTMLInputElement).value;
  //     this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  openDialog(action:any,obj: any) {
    obj.actions = action
    this.simpleDialog = this.dialog.open(DialogComponent,{
      data:obj
    });
  }

  chartDetails(){
    let c = []
    let d = []
    let a = []
    
    let comp = [];
    let incomp = [];
    
    for(let i=0;i<this.dataSource.length;i++){
      if(this.dataSource[i].priority == 'low'){
      d.push(this.dataSource[i])
      }else if(this.dataSource[i].priority == 'medium'){
      c.push(this.dataSource[i])
      }else{
        a.push(this.dataSource[i].priority == 'high')
      }

      if(this.dataSource[i].status == 'complete'){
        comp.push(this.dataSource[i])
        }else if(this.dataSource[i].status == 'incomplete'){
        incomp.push(this.dataSource[i])
        }
    }

    this.chartTypeData = [
      {data:[Number(d.length)],label:'Low'},
      {data:[Number(c.length)],label:'Medium'},
      {data:[Number(a.length)],label:'High'}

    ]

    this.chartTypeDatas = [comp.length,incomp.length]

  }

  openDeleteDialog(action:any,obj:any){
    obj.actions = action
    this.deleteDialog = this.dialog.open(AlertComponent,{
      data:obj
    });
  }


  changeStatus(element : any,status:any){
    const index = this.dataSource.findIndex((object: { id: number; }) => {
      return object.id === element.id;
    });
    this.dataSource[index].status = status
    this.cookieService.set('taskList', JSON.stringify(this.dataSource),{expires : this.myDate})
    this.dataSource = JSON.parse(this.cookieService.get('taskList'))
    this.chartDetails()
  }

  goToDetails(ele : any){
    this.service.onPushDetailsData(ele);
    this.router.navigate(['taskdetails'])
  }
}

