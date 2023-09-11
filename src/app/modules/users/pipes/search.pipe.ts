import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(allusers:any[],searchTerm:string,property:string): any[] {
    let result:any = [] // array to hold transformed values
    if(!allusers || searchTerm==="" || property===""){
      return allusers
    }
    allusers.forEach((item:any)=>{
      if(item[property].trim().toLowerCase().includes(searchTerm.trim().toLowerCase())){
        result.push(item)
      }
    })
    return result;
  }

}
