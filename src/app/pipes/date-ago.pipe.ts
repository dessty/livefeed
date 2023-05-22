import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'dateAgo',
    pure: true
})
export class DateAgoPipe implements PipeTransform {

    transform(value: any): string {
        if (value) {
          const currentDate: Date = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }))
          // sqlite is saving dates on GMT + 4, so we need substract 4 hours from the time we get from the DB
          const commentDate: Date = new Date(new Date(value).setHours(new Date(value).getHours() - 4)) 
          const seconds = Math.floor((currentDate.getTime() - commentDate.getTime()) / 1000);
          // console.log("seconds", currentDate, commentDate, currentDate > commentDate);
          if (seconds < 59) // less than 60 seconds ago will show as 'Just now'
              return 'Just now';
          const intervals: { [key: string]: number } = {
              'year': 31536000,
              'month': 2592000,
              'week': 604800,
              'day': 86400,
              'hour': 3600,
              'minute': 60,
              'second': 1
          };
          let counter;
          for (const i in intervals) {
              counter = Math.floor(seconds / intervals[i]);
              if (counter > 0)
                  if (counter === 1) {
                      return counter + ' ' + i + ' ago'; // singular (1 day ago)
                  } else {
                      return counter + ' ' + i + 's ago'; // plural (2 days ago)
                  }
          }
        }
        return value;
    }

}