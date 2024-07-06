import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateName',
  standalone: true
})
export class TruncateNamePipe implements PipeTransform {

  transform(value: string, maxLenght: number = 16, elliosis = "..."): unknown {
    if (value.length > maxLenght) {
      return value.slice(0, maxLenght) + elliosis;
    }
    return value;
  }

}
