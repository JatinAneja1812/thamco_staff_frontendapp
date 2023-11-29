import moment from "moment";

export function compareDates(dateStrA, dateStrB) {
    if (dateStrA == null && dateStrB == null) {
        return 0;
    }
    if (dateStrA == null) {
        return 1;
    }
    if (dateStrB == null) {
        return -1;
    }
    const dateA = new Date(dateStrA);
    const dateB = new Date(dateStrB);
    return dateA.getTime() - dateB.getTime();
};


export function TransformIntoDateString(date, isModal = true) {
  if (
    date !== "0001-01-01T00:00:00Z" &&
    date !== "01/01/0001 00:00:00" &&
    date !== "01/01/2000 00:00:00" &&
    date !== "1/1/0001 12:00:00 AM" &&
    date !== "1/1/2000 12:00:00 AM"
  ) 
  {
    var dateFormat = getDateFormat(date);

    if (date == null) {
      return;
    }
    if (isModal) {
      return moment(date, dateFormat);
    }
    return moment(date, dateFormat).format('Do MMMM YYYY');
  }
}

export function TransformIntoDateTimeString(date, isModal = true) {
  if (
    date !== "0001-01-01T00:00:00Z" &&
    date !== "01/01/0001 00:00:00" &&
    date !== true &&
    date !== "01/01/2000 00:00:00" &&
    date !== "1/1/0001 12:00:00 AM" &&
    date !== "1/1/2000 12:00:00 AM"
  ) {

    var dateFormat = getDateFormat(date);

    if (date == null) {
      return;
    }
    if (isModal) {
      return moment(date, dateFormat);
    }
    return moment(date, dateFormat).format('Do MMMM YYYY HH:mm');
  }
}

/**
 * This function will check the date coming from server to client app from common date formates
 * used and return the correct formate for date string
 * @param {getDateFormat} dateString 
 * @returns Format of the Date
 */
function getDateFormat(dateString) {
  var formatsToCheck = [
    "M/D/YYYY h:mm:ss A",
    "D/M/YYYY h:mm:ss A",
    "YYYY/M/D h:mm:ss A",
    "M-D-YYYY h:mm:ss A",
    "D-M-YYYY h:mm:ss A",
    "YYYY-M-D h:mm:ss A",
    "M/D/YYYY",
    "D/M/YYYY",
    "YYYY/M/D",
    "M-D-YYYY",
    "D-M-YYYY",
    "YYYY-M-D",
    "MMM D, YYYY h:mm:ss A",
    "MMM D, YYYY",
    "Do MMMM YYYY h:mm A",
    "Do MMMM YYYY",
    "MMMM D, YYYY h:mm:ss A",
    "MMMM D, YYYY",
    "dddd, MMMM D, YYYY h:mm:ss A",
    "dddd, MMMM D, YYYY"
  ];

  var format = null;

  for (var i = 0; i < formatsToCheck.length; i++) {
    if (moment(dateString, formatsToCheck[i], true).isValid()) {
      format = formatsToCheck[i];
      break;
    }
  }

  return format;
}