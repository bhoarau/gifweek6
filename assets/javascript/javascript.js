$(document).ready(function () {

    $('button').on('click', function () {

        var nba = $(this).data('name');
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + nba + "&api_key=dc6zaTOxFJmzC&limit=10";

        //search for gifs 
        $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function (response) {


                console.log(response)

                var results = response.data;

                for (var i = 0; i < results.length; i++) {

                    var nbaDiv = $('<div/>');

                    var p = $('<p/>');

                    p.text(results[i].rating);

                    var nbaImage = $('<img/>');

                    nbaImage.addClass('anImg')

                    nbaImage.attr('src', results[i].images.fixed_height.url);

                    nbaImage.attr('data-still', results[i].images.fixed_height_still.url)

                    nbaImage.attr('data-animate', results[i].images.fixed_height.url)

                        .attr('data-state', 'still');

                    nbaDiv.append(p);

                    nbaDiv.append(nbaImage);

                    nbaDiv.prependTo($('#gifs'));
                }

                $('.anImg').on('click', function () {

                    // stop and play
                    var state = $(this).attr('data-state');
                    console.log(this);

                    if (state == 'still') {

                        $(this).attr('src', $(this).data('animate'));
                        $(this).attr('data-state', 'animate');

                    } else {

                        $(this).attr('src', $(this).data('still'));
                        $(this).attr('data-state', 'still');
                    }
                });
            });
    });

    // buttons 

    var nbas = [''];

    $('#aButton').on('click', function () {
        var nbaButton = $("#gif-search").val();

        var newButton = $("<button/>").addClass("btn nba").attr('data-name', nbaButton).html(nbaButton)

        $("#nbasbuttons").append(newButton);
        console.log("Work");

        queryURL = "https://api.giphy.com/v1/gifs/search?q=" + nbaButton + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(nbaButton);

        $.ajax({
                url: queryURL,
                method: 'GET'
            })
                
            .done(function (response) {

                var results = response.data;

                for (var i = 0; i < results.length; i++) {

                    var nbaDiv = $('<div/>');

                    var p = $('<p/>');

                    p.text(results[i].rating);

                    var nbaImage = $('<img/>');

                    nbaImage.addClass('anImg')

                    nbaImage.attr('src', results[i].images.fixed_height_still.url);

                    nbaImage.attr('data-still', results[i].images.fixed_height_still.url)

                    nbaImage.attr('data-animate', results[i].images.fixed_height.url)

                        .attr('data-state', 'still');

                    nbaDiv.append(p);

                    nbaDiv.append(nbaImage);

                    nbaDiv.prependTo($('#gifs'));
                }

                $('.anImg').on('click', function () {

                    //stop and play
                    var state = $(this).attr('data-state');
                    console.log(this);

                    if (state == 'still') {

                        $(this).attr('src', $(this).data('animate'));

                        $(this).attr('data-state', 'animate');

                    } else {

                        $(this).attr('src', $(this).data('still'));

                        $(this).attr('data-state', 'still');
                    }

                });

            });

        $("#gif-search").val("");
        return false;

    })
});