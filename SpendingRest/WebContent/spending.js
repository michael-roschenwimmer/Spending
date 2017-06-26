$(document).ready(function() {
    console.log("loaded");
    startUp();

});

var startUp = function() {
    var myReq = $.ajax({
        type: "GET",
        url: "rest/trackers",
        dataType: "json"
    });
    myReq.done(function(data, status) {
        console.log(data);
        console.log(status);
        buildList(data);
    });

    myReq.fail(function(xhr, status, error) {
        console.log('It blew up again');
        console.log(error);
    });
}


var buildList = function(data) {
    var table = $('<table>');
    var thead = $('<thead>');
    var tr = $('<tr>');
    var th = $('<th>').text("Restaurant Bills");
    var h1Total = $("<h1>");
    tr.append(th);
    thead.append(tr);
    table.append(thead);
    var billTotal = 0;
    data.forEach(function(tracker, idx, array) {
        if (idx % 2) {
            var tr = $('<tr>').css("background-color", "#ff9999");
        } else {
            var tr = $('<tr>')
        }
        var tbody = $('<tbody>');
        var td = $('<td>');
        var input = $('<button>');
        input.addClass('button');
        input.attr('id', tracker.id);
        input.text('Edit');
        input.on('click', function() {
            var myReq = $.ajax({
                type: "GET",
                url: "rest/trackers/" + $(this).attr('id'),
                dataType: "json"
            });
            myReq.done(function(data, status) {
                console.log(data);
                console.log(status);
                $("#table").empty();
                buildDesc(data);

                var EditRestaurantBill = $("<h3>");
                createRestaurantBill.text("Edit a new Bill");
                var tablediv = $("<div>");
                var contentdiv = $("<div>");
                contentdiv.attr('id', 'content');
                tablediv.attr('id', 'table');
                $("body").append(contentdiv);
                $("#content").append(tablediv);
                $("#table").append(EditRestaurantBill);

                var restaurantName = $("<input/>").attr({
                    type: "text",
                    id: "restaurantName",
                    placeholder: "Restaurant Name"
                }).appendTo("#table");
                var billAmount = $("<input/>").attr({
                    type: "text",
                    id: "bill",
                    placeholder: "Bill Amount in Dollars"
                }).appendTo("#table");
            });
            myReq.fail(function(xhr, status, error) {
                console.log('It blew up again');
                console.log(error);
            });
        })
        var deleteItem = $('<button>');
        deleteItem.addClass('button');
        deleteItem.attr('id', tracker.id); // Remind
        deleteItem.text('Delete Restaurant Bill');
        deleteItem.on('click', function() {
            var myReq = $.ajax({
                type: "DELETE",
                url: "rest/trackers/" + $(this).attr('id'),
            });
            myReq.done(function(data, status) {
                console.log(data);
                console.log(status);
                $("#table").empty();

                var tablediv = $("<div>");
                tablediv.attr('id', 'table');
                $("body").append(tablediv);
                $("#content").append(tablediv);
                startUp();
            });
            myReq.fail(function(xhr, status, error) {
                console.log('It blew up again');
                console.log(error);
            });
        })
        td.text(tracker.id + ". " + tracker.restaurantName + "  " + "Amount Spent $" + tracker.bill);


        billTotal = tracker.bill + billTotal;
        console.log("bill total: " + tracker.bill);
        console.log("total: " + billTotal);


        h1Total.text("Total Spent: " + "$" + billTotal);
        tr.append(td);
        tr.append(input);
        tr.append(deleteItem);
        tbody.append(tr);
        table.append(tbody);
    })
    $('#table').append(table);
    $('#table').append(h1Total);

    var createRestaurantBill = $("<h3>");
    createRestaurantBill.text("Create a new Bill");
    $("#table").append(createRestaurantBill);

    var restaurantName = $("<input/>").attr({
        type: "text",
        id: "restaurantName",
        placeholder: "Restaurant Name"
    }).appendTo("#table");
    var billAmount = $("<input/>").attr({
        type: "text",
        id: "bill",
        placeholder: "Bill Amount in Dollars"
    }).appendTo("#table");

    var createRestaurantBillButton = $('<button>');
    createRestaurantBillButton.addClass('button').text("Create New Bill").appendTo("#table");



    createRestaurantBillButton.on('click', function() {
        var restaurantBillObj = {
            restaurantName: $("#restaurantName").val(),
            bill: $("#bill").val(),

        };
        console.log(restaurantBillObj);

        var myPost = $.ajax({
            type: "POST",
            url: "rest/trackers",
            dataType: "json",
            contentType: 'application/json',
            data: JSON.stringify(restaurantBillObj)
        });


        myPost.done(function(data, status) {
            console.log(data);
            console.log(status);
            startUp();
            console.log("back button clicked");
            $("body").empty();
            $("body").css('background-image', 'url(http://wallpapercave.com/wp/k4eop3o.jpg)');
            $("body").css('background-position', 'center');
            $("body").css('background-attachment', 'fixed');
            $("body").css('background-size', 'cover');

            var tablediv = $("<div>");
            var contentdiv = $("<div>");
            contentdiv.attr('id', 'content');
            tablediv.attr('id', 'table');
            $("body").append(contentdiv);
            $("#content").append(tablediv);

        });
        myPost.fail(function(xhr, status, error) {
            console.log('It blew up again');
            console.log(error);
        });
        $("#table").append(createRestaurantBillButton);
    })


}

var buildDesc = function(tracker) {
    $("#content").empty();
    $("body").css('background-image', 'url(http://wallpapercave.com/wp/d4emJ2t.jpg)');
    $("body").css('background-size', '100%');
    $("body").css('background-repeat', 'no-repeat');
    var h1 = $('<h1>');
    var ul = $('<ul>');
    var li2 = $('<li>');

    h1.text(tracker.restaurantName);
    $('body').append(h1);
    // img.attr('src', pokemon.img);
    // li.append(img);
    li2.text("$" + tracker.bill);
    ul.append(li2);
    $('body').append(ul);

    var backbutton = $('<button>');
    backbutton.addClass('backbutton');
    backbutton.text('Submit Changes');
    backbutton.on('click', function() {

        var updatedTracker = {
          restaurantName: $("#restaurantName").val(),
          bill: $("#bill").val(),
        }; //object with updated name

        var myPut = $.ajax({
            type: "PUT",
            url: "rest/trackers/" + tracker.id,
            dataType: "json",
            contentType: 'application/json', //setting the request headers content-type
            data: JSON.stringify(updatedTracker) //the data being added to the request body
        });
        myPut.done(function(data, status) {
            console.log(data);
            console.log(status);

            startUp();
            console.log("back button clicked");
            $("body").empty();
            $("body").css('background-image', 'url(http://wallpapercave.com/wp/k4eop3o.jpg)');
            $("body").css('background-position', 'center');
            $("body").css('background-attachment', 'fixed');
            $("body").css('background-size', 'cover');

            var tablediv = $("<div>");
            var contentdiv = $("<div>");
            contentdiv.attr('id', 'content');
            tablediv.attr('id', 'table');
            $("body").append(contentdiv);
            $("#content").append(tablediv);
        });
        myPut.fail(function(xhr, status, error) {
            console.log('It blew up again');
            console.log(error);
        });

    });
    $("body").append(backbutton);
}
