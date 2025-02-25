import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchpipe',
  standalone: true
})
export class SearchpipePipe implements PipeTransform {

  transform(data: any[], searchKey:string): any[] {
    return data.filter((current)=>{return current.title.toLowerCase().includes( searchKey.toLowerCase())});
  }

}
