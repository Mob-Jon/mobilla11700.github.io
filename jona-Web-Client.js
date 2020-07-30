$(document).ready(function(){

  //console.log(jona.js);
  var client  = mqtt.connect('wss://test.mosquitto.org:8081/mqtt')
  //var client = mqtt.connect('wss://mqtt.eclipse.org:443/mqtt')

client.on('connect', function () {
    console.log('connected')

    var sub_button = $('#sub-button');
    sub_button.on('click', () => {

        client.subscribe($('#subscribe-topic-input').val() , function (err) {
                
            if (!err) {
                    client.publish(pub_input.val(), payload_input.val())
            }
        })
    })
})

//TOPIC AND MESSAGE IS RECEIVE
client.on('message', function (topic, message) {
    // message is Buffer
    var top = $("<td></td>").html(topic);

    var msg = $("<td></td>").text(message);
    var tr = $("<tr></tr>")
    
    tr.append(top);
    tr.append(msg);

    $("#results").append(tr);
    console.log(topic)
    console.log(message)

})

var pub_button = $('#pub-button');
var pub_input = $('#topic-input');
var payload_input = $('#payload-input');

//Publish button function
pub_button.on('click', () => {
    
    client.publish(pub_input.val(), payload_input.val())

    console.log("Topic and Payload published");
})


})