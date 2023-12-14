import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private data = new BehaviorSubject(null);
  public taskdetails = this.data.asObservable();

  private detailsData = new BehaviorSubject(null);
  public specifictaskdetails = this.detailsData.asObservable();
  constructor() { }

  onPushData(data:any){
    return new Promise (resolve => {
      resolve(this.data.next(data))
    })
  }

  onPushDetailsData(data:any){
    return new Promise (resolve => {
      resolve(this.detailsData.next(data))
    })
  }
}
