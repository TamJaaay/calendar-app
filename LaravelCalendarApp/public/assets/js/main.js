$(function () {

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    //Initialize Datepickers
    $('.inp-datepicker').datepicker({
        format: 'yyyy-mm-dd',
        startDate: new Date('07-01-2018'),
        endDate: new Date('07-31-2018'),
        autoclose: true
    });

    const month = 7 //July
    const year = 2018 // Year 2018

    let currdates = [];
    let dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let activeMonth = month - 1;
    let activeMonthDate = new Date(year,activeMonth, 1);
    let events = [];
    let ajax_events = $.ajax({
        method: "GET",
        url: WebURL + "/events",
        dataType: "json",
        success: function(data) {
            events = data;
        },
        async: false
      });

    while (activeMonthDate.getMonth() == activeMonth) {
        formatFullDate = activeMonthDate.getFullYear() + '-' + addLeadingZeroes((activeMonthDate.getMonth() + 1)) + '-' + addLeadingZeroes(activeMonthDate.getDate());
        currdates.push({
            date: activeMonthDate.getDate(),
            name: activeMonthDate.getDate() + " " + dayNames[activeMonthDate.getDay()],
            fulldate: formatFullDate
        });

        activeMonthDate.setDate(activeMonthDate.getDate() + 1);
    }

    //Table Rows
    let html = '';
    currdates.forEach((cd) => {
        cd.title = '';
        if(events.length > 0) {
            events.forEach((ev) => {
                if(cd.fulldate == ev.date) {
                    cd.title = ev.title;
                }
            })
        }
        html += '<tr class="' + (cd.title != '' ? 'table-success' : '') + '"><td class="w-25">'+ cd.name + '</td><td>' + cd.title + '</td></tr>'; 
    });

    $('.calendar-table').find('tbody').html(html);

    $('body').on('click', '#btn-save-event', function () {
        
        let btn = $(this);
        let title = $('#inp_event').val();
        let dFrom = $('#inp_from').val();
        let dTo   = $('#inp_to').val()
        let dates = getBetweenDates(dFrom, dTo);
        let days  = $("input[name='cb-day']:checked");
        let formData = { title: title, dfrom: dFrom, dto:dTo, dates: dates };
        let error = false;

        if(title.length == 0) {
            error = true;
        }

        if(dFrom.length > 0 && dTo.length > 0) {
            if(new Date(dFrom) > new Date(dTo)) {
                error = true;
            }
        } else {
            error = true;
        }

        if(days.length == 0) {
            error = true;
        }

        if(error == false) {
            loadButton(btn);
            $.ajax({
                url: WebURL + "/save/events",
                method: "POST",
                data: formData,
                dataType: "json",
                success: function(data) {
                    resetButton(btn);
                    loadCalendarTable(currdates);
                }
            });
        } else {
            $.toast({
                text: 'Invalid inputs',
                icon: 'error',
                position: 'top-right',
                loader: false, 
            });
        }
        
    })
})



addLeadingZeroes = (num) => {
    if(num <= 9) {
        return "0" + num;
    }

    return num;
}

getBetweenDates = (dFrom, dTo) => {

    let days = [];
    let betweenDates = '';
    let dateStartFrom = new Date(dFrom);
    let dateStartTo = new Date(dTo);

    $.each($("input[name='cb-day']:checked"), function() {
        days.push($(this).val());
    })

    while (dateStartFrom <= dateStartTo) {
        if(days.includes(dateStartFrom.getDay().toString())) {
            betweenDates += formatDate(dateStartFrom) + ',';
        }
        dateStartFrom.setDate(dateStartFrom.getDate() + 1);
    }

    return betweenDates.slice(0, -1);
    
}

loadCalendarTable = (currdates) => {

    let events = [];

    $.ajax({
        method: "GET",
        url: WebURL + "/events",
        dataType: "json",
        success: function(data) {
            events = data;
            $.toast({
                text: 'Event successfully saved',
                icon: 'success',
                position: 'top-right',
                loader: false, 
            });
        },
        async: false

      });

    let html = '';
    currdates.forEach((cd) => {
        cd.title = '';
        if(events.length > 0) {
            events.forEach((ev) => {
                if(cd.fulldate == ev.date) {
                    cd.title = ev.title;
                }
            })
        }
        html += '<tr class="' + (cd.title != '' ? 'table-success' : '') + '"><td class="w-25">'+ cd.name + '</td><td>' + cd.title + '</td></tr>'; 
    });

    $('.calendar-table').find('tbody').html(html);
}

formatDate = (date) => {
    
    formattedDate = date.getFullYear() + '-' + addLeadingZeroes((date.getMonth() + 1)) + '-' + addLeadingZeroes(date.getDate());

    return formattedDate;
}

loadButton = (btn) => {
    btn.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>');
    btn.prop('disabled', true);
}

resetButton = (btn) => {
    btn.html('Save');
    btn.attr('disabled', false);
}