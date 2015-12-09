var createCalendar;

createCalendar = function(scope) {
  var calendarClass, calendarHTML, daysIndex, getTrackHint, monthLeadingDays, nonDeliveryDays, numberOfDays,
      rangeEndDate, rangeEndMonth, rangeEndYear, rangeLastDate,
      rangeStartDate, rangeStartMonth, rangeStartYear,
      weekDayList,
      i, j;

  /* Retrieve values from the page. */
  rangeStartDate = scope.estimated_delivery.range_start.date;
  rangeStartMonth = scope.estimated_delivery.range_start.month + 1;
  rangeStartYear = scope.estimated_delivery.range_start.year;
  rangeEndDate = scope.estimated_delivery.range_end.date;
  rangeEndMonth = scope.estimated_delivery.range_end.month + 1;
  rangeEndYear = scope.estimated_delivery.range_end.year;

  /* Create an index for creating the calendar grid. */
  numberOfDaysInMonth = new Date(rangeStartYear, rangeStartMonth, 0).getDate();
  rangeLastDate = rangeEndDate >= rangeStartDate ? rangeEndDate : numberOfDaysInMonth;
  monthLeadingDays = new Date(rangeStartYear, rangeStartMonth - 1, 1).getDay();
  daysIndex = [];
  for (i = 1; i <= numberOfDaysInMonth; i += 1) {
    daysIndex[monthLeadingDays + i] = i;
  }
  nonDeliveryDays = createNonDeliveryDaysObject(getTrackHint, scope);

  calendarHTML = "";
  for (i = 0; i < 7; i += 1) {
    calendarHTML += "<span class='calendar-date'>" + lg.weekDayList[i] + "</span>";
  }
  $(".calendar-days").html(calendarHTML);

  j = 1;
  calendarHTML = "";
  do {
    calendarHTML += "<div class='calendar-row'>";
    for (i = 1; i < 8; i += 1) {
      if ((daysIndex[j] >= rangeStartDate) && (daysIndex[j] <= rangeLastDate)) {
        calendarClass = isHighlighted(rangeStartYear, rangeStartMonth, daysIndex[j], nonDeliveryDays) ? " highlighted" : " not-highlighted";
      } else {
        calendarClass = "";
      }
      calendarHTML += "<span class='calendar-date" + calendarClass + "'>" + (daysIndex[j] || "") + "</span>";
      j += 1;
    }
    calendarHTML += "</div>";
  } while (daysIndex[j]);

  $(".calendar-container").append(calendarHTML);
};

function createNonDeliveryDaysObject(data, scope) {
  var returnObject,
      day, month, year,
      item;

  returnObject = {};

  returnObject.holidayObject = {};
  returnObject.carrierStartDay = scope.carrier.start_day;
  if (isNaN(returnObject.carrierStartDay)) {
    returnObject.carrierWeek = parseInt($('input[name="numWorkingDays"]', data).val(), 10);
    returnObject.carrierStartDay = parseInt($('input[name="numStartWorkingDay"]', data).val(), 10);
    returnObject.carrierEndDay = returnObject.carrierStartDay + returnObject.carrierWeek - 1;
    returnObject.holidays = $('input[name="holidays"]', data).val().split(",");
    for (item in returnObject.holidays) {
      year = item.slice(-4);
      month = item.slice(0, 2);
      day = item.slice(2, 4);
      returnObject.holidayObject[new Date(year, month - 1, day)] = true;
    }
  } else {
    returnObject.carrierEndDay = scope.carrier.end_day;
    returnObject.holidays = scope.carrier.holidays;
    for (item in returnObject.holidays) {
      year = item.slice(0, 4);
      month = item.slice(5, 7);
      day = item.slice(-2);
      returnObject.holidayObject[new Date(year, month - 1, day)] = true;
    }
  }

  returnObject.workingDays = [true, true, true, true, true, true, true];
  if (1 === returnObject.carrierStartDay) {
    returnObject.workingDays[0] = false;
  } else if (2 === returnObject.carrierStartDay) {
    returnObject.workingDays[0] = false;
    returnObject.workingDays[1] = false;
  }
  if (5 === returnObject.carrierEndDay) {
    returnObject.workingDays[6] = false;
  }

  return returnObject;
}

function isHighlighted(yy, mm, dd, data) {
  var thisDay;

  thisDay = new Date(yy, mm - 1, dd, 0, 0, 0);
  return data.workingDays[thisDay.getDay()] && !data.holidayObject[thisDay];
}
