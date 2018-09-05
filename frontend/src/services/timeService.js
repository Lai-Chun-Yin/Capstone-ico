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
