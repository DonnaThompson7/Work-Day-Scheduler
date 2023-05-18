// All code is in a call to jQuery to ensure that the code isn't run until the browser
//  has finished rendering all the elements in the html.

$(function () {
    var largeContainerEl = $('.container-lg');    

    // Use Day.js to to get the current hour in 24-hour time:
    var currentHour = dayjs().hour();
    
    //loop thru array of standard business hours 8am-5pm
    for (var i = 8; i < 18; i++) {
        var timeBlockDivEl;
        var savedActivityKey = "hour-"+i;
        //get saved activities from local storage. If null, use empty string
        var savedActivity = localStorage.getItem(savedActivityKey) || "";

        if (i < currentHour) {
            //create time block and add class = "past"
            timeBlockDivEl = $('<div class="row time-block past">');
        } else if (i === currentHour) {
            //create time block and add class = "present"
            timeBlockDivEl = $('<div class="row time-block present">');
        } else {
            //create time block and add class = "future"
            timeBlockDivEl = $('<div class="row time-block future">');
        }
        //assign id as a name containing the specific hour
        timeBlockDivEl.attr("id", savedActivityKey);

        //create, assign and append the rest of the elements
        largeContainerEl.append(timeBlockDivEl);
        var timeBlockLabelEl = $('<div class="col-2 col-md-1 hour text-center py-3"></div>');
        timeBlockLabelEl.text(i);
        var timeBlockTextEl = $(`<textarea class="col-8 col-md-10 description" rows="3">${savedActivity}</textarea>`);
        var timeBlockSaveBtnEl = $('<button class="btn saveBtn col-2 col-md-1" aria-label="save"></button>');
        var timeBlockIconEl = $('<i class="fas fa-save" aria-hidden="true"></i>');
        timeBlockDivEl.append(timeBlockLabelEl);
        timeBlockDivEl.append(timeBlockTextEl);
        timeBlockDivEl.append(timeBlockSaveBtnEl);
        timeBlockSaveBtnEl.append(timeBlockIconEl);
    }

    // Add a listener for click events on all save buttons. 
    var saveButtonEl = $('.saveBtn');
    saveButtonEl.on('click', saveSchedule);

    function saveSchedule() {
        var activity = $(this).siblings('.description').val();
        //capture this parent's id to use as the key in local storage
        var hourId = $(this).parent().attr('id');
        //save to local storage
        localStorage.setItem(hourId, activity);
    }

    // Display the current date in the header of the page.
    var currentDate = dayjs();
    $('#current-date-time').text(currentDate.format('MMM DD, YYYY'));
  });
  