$(document).ready(function () {

    //connect button
    $('#connect-button').click(function () {
        var con = $("#broker-input").val();
        var client = mqtt.connect(con)
        
        //var client = mqtt.connect('wss://mqtt.eclipse.org:443/mqtt')

        client.on('connect', function () {
            console.log('connected to' + " " + con)
            var span = $('<span></span>').text('Successfully connected to:'+ '\n' + con)
             $("#span").append(span).addClass('alert alert-success')
            //subscribe button is click
            var sub_button = $('#sub-button');
            sub_button.on('click', () => {

                client.subscribe($('#subscribe-topic-input').val(), function (err) {

                    if (!err) {
                        client.publish(pub_input.val(), payload_input.val())
                    }
                })
                subscribedMessage()
            })
        })
        //TOPIC AND MESSAGE IS RECEIVE
        client.on('message', function (topic, message) {
            // message is Buffer
            var top = $("<td></td>").html(topic);

            var msg = $("<td></td>").text(message);
            //TIME STAMP FIELDS
            var t = new Date()
            var setTime = t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds();
            var time = $("<td></td>").text(setTime + " " + (t.getMonth() + 1) + "/ " + t.getDate() + " /" + t.getFullYear());
            var tr = $("<tr></tr>")

            tr.append(top);
            tr.append(msg);
            tr.append(time);

            $("#results").append(tr);
            console.log(topic)
            console.log(message)
            console.log(time)


        })

        var pub_button = $('#pub-button');
        var pub_input = $('#topic-input');
        var payload_input = $('#payload-input');

        //Publish button function
        pub_button.on('click', () => {

            client.publish(pub_input.val(), payload_input.val())

            publishedMessage()
            console.log("Topic and Payload published");
        })
        //FOR PUBLISHED MESSAGES
        function publishedMessage() {

            var top = $("<td></td>").html(pub_input.val());

            var msg = $("<td></td>").text(payload_input.val());

            var t = new Date()
            var setTime = t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds();
            var time = $("<td></td>").text(setTime + " " + (t.getMonth() + 1) + "/ " + t.getDate() + " /" + t.getFullYear());
            var tr = $("<tr></tr>")

            tr.append(top);
            tr.append(msg);
            tr.append(time);

            $("#history").append(tr);

        }
        //FOR SUBCRIPTIONS MESSAGES
        function subscribedMessage() {

            var top = $("<td></td>").html(pub_input.val());

            var msg = $("<td></td>").text(payload_input.val());

            var t = new Date()
            var setTime = t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds();
            var time = $("<td></td>").text(setTime + " " + (t.getMonth() + 1) + "/ " + t.getDate() + " /" + t.getFullYear());
            var tr = $("<tr></tr>")

            tr.append(top);
            tr.append(msg);
            tr.append(time);

            $("#subscriptions").append(tr);
        }


    })

})