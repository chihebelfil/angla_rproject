import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nextChar'
})
export class NextCharPipe implements PipeTransform {

  transform(index:any): any {
    return String.fromCharCode("B".charCodeAt(0) + index);
  }

}
