import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(data:any , search?:string , name?:string , name1?:string , name2?:string): any {
    if(search === undefined){
      return data;
    }else{
      let result:any = [];
      let filteredData = data.filter((obj : any) => obj[name].toLowerCase().includes(search.toLowerCase()));
      if(name1){
        filteredData = filteredData.concat(data.filter((obj : any) => obj[name1].toLowerCase().includes(search.toLowerCase())));
        if(name2){
          filteredData = filteredData.concat(data.filter((obj : any) => obj[name2].toLowerCase().includes(search.toLowerCase())));
        }
      }
      filteredData.forEach(function(item){
        if(result.indexOf(item) < 0){
          result.push(item)
        }
      });
      return result;
    }
  }

}
