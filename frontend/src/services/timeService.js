/* tslint:disable */
const moment = require('moment-timezone');

export default function getDateTimeHK(isoString, format="dt") {
  const dateObj = moment(isoString).tz("Asia/Hong_Kong");

  let dateString ="";

  if(format==="dt"){
    dateString = moment().format('Do, MMM HH:mm Z');
  }
  if(format==="d"){
    dateString = moment().format('MMMM Do YYYY');
  }

  return dateString;
}



// The following functiions are for calculate how long ago

export function timeAgo (isoString, DWMY_timeAgo = true) { // DWMY_timeAgo = [Days,Weeks,Months,Years] ago
  let momentDate  = moment(isoString); // Getting date and time with iso string
  let dateTime    = {
        seconds        : moment().diff(momentDate, 'seconds'),
        minutes        : moment().diff(momentDate, 'minutes'),
        hours          : moment().diff(momentDate, 'hours'),
        days           : moment().diff(momentDate, 'days'),
        weeks          : moment().diff(momentDate, 'weeks'),
        months         : moment().diff(momentDate, 'months'),
        years          : moment().diff(momentDate, 'years'),
        today          : isToday(momentDate),
        yesterday      : isYesterday(momentDate),
        dayName        : momentDate.format('dddd'),
        fullDateTime   : momentDate.format('LLLL'),
        date           : momentDate.format('LL'),
        time           : momentDate.format('LT'),
        calendar       : momentDate.calendar()
      };
      
  let datetime = dateTime.date + ' at ' + dateTime.time
  let outputTime = '';
  
  if (dateTime.seconds > 0) {
    outputTime = '1 Second ago';
  }
  if (dateTime.seconds > 1) {
    outputTime = dateTime.seconds + ' Seconds ago';
  }

  if (dateTime.minutes == 1) {
    outputTime = '1 Minute ago';
  }
  if (dateTime.minutes > 1) {
    outputTime = dateTime.minutes + ' Minutes ago';
  }

  if (dateTime.hours == 1) {
    outputTime = '1 hour ago';
  }
  if (dateTime.hours > 1) {
    outputTime = dateTime.hours + ' hours ago';
  }

  if (dateTime.days == 1) {
    if (DWMY_timeAgo) {
      outputTime = '1 Day ago';
    } else {
      outputTime = datetime;
    }
  }
  if (dateTime.days > 1) {
    if (DWMY_timeAgo) {
      outputTime = dateTime.days + ' Days ago';
    } else {
      outputTime = datetime;
    }
  }

  //weeks
  if (dateTime.weeks == 1) {
    if (DWMY_timeAgo) {
      outputTime = dateTime.weeks + ' Week';
    } else {
      outputTime = datetime;
    }
  }
  if (dateTime.weeks > 1) {
    if (DWMY_timeAgo) {
      outputTime = dateTime.weeks + ' Weeks';
    } else {
      outputTime = datetime;
    }
  }

  if (dateTime.months == 1) {
    if (DWMY_timeAgo) {
      outputTime = '1 Month ago';
    } else {
      outputTime = datetime;
    }
  }
  if (dateTime.months > 1) {
    if (DWMY_timeAgo) {
      outputTime = dateTime.months + ' Months ago';
    } else {
      outputTime = datetime;
    }
  }

  if (dateTime.years == 1) {
    if (DWMY_timeAgo) {
      outputTime = '1 Year ago';
    } else {
      outputTime = datetime;
    }
  }
  if (dateTime.years > 1) {
    if (DWMY_timeAgo) {
      outputTime = dateTime.yeras + ' Years ago';
    } else {
      outputTime = datetime;
    }
  }

  if (dateTime.yesterday) {
    outputTime = dateTime.calendar;
    // Will show yesterday date
    // example: Yesterday at 11:24 PM
  }
  return outputTime;
}

function isToday(momentDate) {
  let yesterday = moment().clone().startOf('day');
  return momentDate.isSame(yesterday , 'd');
}

function isYesterday(momentDate) {
  let yesterday = moment().clone().subtract(1, 'days').startOf('day');
  return momentDate.isSame(yesterday , 'd');
}


// return current timestamp iso string

export function currentTime(){
  let CurrentDate = moment().toISOString();
  
  return CurrentDate;
}
