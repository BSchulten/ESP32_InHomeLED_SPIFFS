
var mode;
var solidColor;
var date_current;
var lastmillis = 0;

var sendJSON_possible = true;

function sendClick(){
    var button = document.getElementById('button1');
    button.title = "Gedrueckt";
    var input = document.getElementById('messageinput');
    websocket.send(input.value);
  }

function onMessage(evt)
  {
    writeToScreen('<span style="color: blue;">RESPONSE: ' + evt.data+'</span>');
  }

function onRadioChange(){
  if (document.getElementById("radio_solid").checked){
    mode = 4;
  }

  if (document.getElementById("radio_night").checked){
    mode = 1;
  }

  if (document.getElementById("radio_runner").checked){
    mode = 2;
  }

  if (document.getElementById("radio_rainbow").checked){
    mode = 5;
  }

  if (document.getElementById("radio_off").checked){
    mode = 0;
  }
  sendJSON();
}

  
function writeToScreen(message)
  {
    var pre = document.getElementById("output");
    pre.style.wordWrap = "break-word";
    pre.innerHTML = message;
  }

function sendColor(jscolor){
  solidColor = jscolor;
  date_current = Date.now();

  if (lastmillis < (date_current + 10)){
      lastmillis = date_current;
      sendJSON();
  };
  
}

function getJsonString(){
  var jsonstring = "{MODE:" +  mode + ",COMMAND:" + "InputTransmit" + ",COLOR:" + solidColor + "}";
  return jsonstring;
}
function sendJSON(){
  if(!sendJSON_possible) return;

  websocket.send(getJsonString());
  sendJSON_possible = false;
   setTimeout(function()
      {
        sendJSON_possible = true;
      }
   , 50);
}

window.onbeforeunload = function() {
  websocket.onclose = function () {}; // disable onclose handler first
  websocket.close();
};

var prefix = "ws:";
var host = window.location.host;
var complhost = prefix + host;
var fixedhost = "ws://192.168.0.16";
var websocket = new WebSocket(complhost);
websocket.onmessage = function(evt) { onMessage(evt) };


var button = document.getElementById('button1');
button.addEventListener('click', sendClick);