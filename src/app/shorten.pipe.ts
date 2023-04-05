import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  transform(value: string, start: number = 4, end: number = 4): string {
    if(value.length < (start + end)) { return value }
    const startString = value.substring(0, start)
    const endString = value.substring((value.length - (end) - 1), (value.length - 1))
    return `${startString}...${endString}`
  }

}
