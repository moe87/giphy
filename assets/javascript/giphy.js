
        $(document).ready(function () {
            var animals = ["cat", "rat", "lion", "dog", "turtle", "horse", "donkey"];
            for (i = 0; i < animals.length; i++) {
                addButton(animals[i], animals[i], animals[i]);
            }

            $("form").submit(function (event) {
                event.preventDefault();
                var addText = $("input[type=text][id=addText]").val();
                addButton(addText, addText, addText);
            });

            function addButton(id, value, text) {
                $("<button></button>", {
                    id: id,
                    value: value,
                    "class": "key",
                    text: text,
                    click: function () {
                        $("#results").html("");
                        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=10&q=" + this.value;

                        $.ajax({
                            url: queryURL,
                            method: "GET"
                        }).then(function (response) {
                            for (i = 0; i < response.data.length; i++) {
                                console.log(response.data[i].images.fixed_height_small_still.url);
                                var image = $("<img></img>", {
                                    src: response.data[i].images.fixed_height_still.url,
                                    "data-still": response.data[i].images.fixed_height_still.url,
                                    "data-animate": response.data[i].images.fixed_height.url,
                                    "data-state": "still",
                                    "class": "gif",
                                    click: function () {
                                        var state = $(this).attr("data-state");
                                        if (state === "still") {
                                            $(this).attr("src", $(this).attr("data-animate"));
                                            $(this).attr("data-state", "animate");
                                        } else {
                                            $(this).attr("src", $(this).attr("data-still"));
                                            $(this).attr("data-state", "still");
                                        }
                                    }
                                });
                                $("<div> Rating: " + response.data[i].rating + "<br></div>").append(image).appendTo("#results");
                            }

                        });

                    }

                }).appendTo("#buttons");
            }
        });