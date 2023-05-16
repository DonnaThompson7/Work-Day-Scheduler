// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {
    var largeContainerEl = $('.container-lg');
    // TODO: Add a listener for click events on the save button. 
    var saveButtonEl = $('.saveBtn');
    saveButtonEl.on('click', saveSchedule);

    //This code should use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    function saveSchedule() {
        console.log('called saveSchedule');
    }

    // Use Day.js to to get the current hour in 24-hour time:
    var currentHour = dayjs().hour();
    console.log("Current hour = " + currentHour);
    
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? 

    //loop thru array of standard business hours 8am-5pm
    for (var i = 8; i < 18; i++) {
        var timeBlockDivEl;
        var index = i;
        console.log('entered for loop to create time blocks and index = ' + index + " and currentHour = " + currentHour);
        if (index < currentHour) {
            console.log('creating PAST time blocks');
            //create time block and add class = "past"
            timeBlockDivEl = $('<div id="hour-9" class="row time-block past">');
        } else if (index === currentHour) {
            //create time block and add class = "present"
            console.log('creating PRESENT time blocks');
            timeBlockDivEl = $('<div id="hour-10" class="row time-block present">');
        } else {
            //create time block and add class = "future"
            console.log('creating FUTURE time blocks');
            timeBlockDivEl = $('<div id="hour-11" class="row time-block future">');
        }
        largeContainerEl.append(timeBlockDivEl);
        var timeBlockLabelEl = $('<div class="col-2 col-md-1 hour text-center py-3"></div>');
        timeBlockLabelEl.text(index);
        var timeBlockTextEl = $('<textarea class="col-8 col-md-10 description" rows="3"> </textarea>');
        var timeBlockSaveBtnEl = $('<button class="btn saveBtn col-2 col-md-1" aria-label="save"></button>');
        var timeBlockInputEl = $('<i class="fas fa-save" aria-hidden="true"></i>');
    
        timeBlockDivEl.append(timeBlockLabelEl);
        timeBlockDivEl.append(timeBlockTextEl);
        timeBlockDivEl.append(timeBlockSaveBtnEl);
        timeBlockSaveBtnEl.append(timeBlockInputEl);

    }

    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?

    // TODO: Add code to display the current date in the header of the page.
    var currentDate = dayjs();
    $('#current-date-time').text(currentDate.format('MMM DD, YYYY'));
  });
  