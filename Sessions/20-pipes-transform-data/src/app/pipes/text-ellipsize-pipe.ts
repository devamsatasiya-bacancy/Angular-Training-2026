import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'adharNumberEllipsize',
})
export class AdharNumberEllipsizePipe implements PipeTransform {
  /* lastLength is the number of characters to show from the end of the string */
  transform(value: string, lastLength: number = 4 , ellipsis: string = 'XXXX '): unknown {

    if (typeof value !== 'string') {
      return null;
    }

    if (lastLength >= value.length) {
      return value;
    }

    const end = value.slice(-lastLength); 
    return `${ellipsis.repeat(Math.ceil((value.length - lastLength) / ellipsis.length))}${end}`;
  }
  
}

@Pipe({
  name: 'textEllipsize',
})
export class TextEllipsizePipe implements PipeTransform {
  /* maxlength is the maximum number of characters to show */
  transform(value: string, maxlength: number = 20 , ellipsis: string = '...'): unknown {

    if (typeof value !== 'string') {
      return null;
    }

    if (maxlength >= value.length) {
      return value;
    }

    return `${value.slice(0, maxlength-3)}${ellipsis}`;
  }
  
}
