
var sendJSON_possible = true;

function sendClick(){
    var button = document.getElementById('button1');
    button.title = "Gedrueckt";
    var input = document.getElementById('messageinput');
    websocket.send(input.value);

    var form = document.getElementById('wificonfigform');
    var y = document.createElement("radio");
    form.appendChild(y);
  }

function onMessage(evt)
  {
    writeToScreen('<span style="color: blue;">RESPONSE: ' + evt.data+'</span>');
  }

function writeToScreen(message)
  {
    var pre = document.getElementById("output");
    pre.style.wordWrap = "break-word";
    pre.innerHTML = message;
  }

function sendJSON(){
  if(!sendJSON_possible) return;

  websocket.send("f");
  sendJSON_possible = false;
   setTimeout(function()
      {
        sendJSON_possible = true;
      }
   , 50);
}

function formToJson(form){
  var ssid = form.ssid.value;   
  var pass = form.pass.value;
  var isdefault = form.isdefault.checked;
  var features = form.extrafeatures.value;
  if (form.isMaster.checked){
      var ismaster = "MASTER";
  }
  else{
      var ismaster = "SLAVE";
  }
  if (form.isWSLed.checked){
    var isws = "WS";
  }
  else{
    var isws = "RGB";
  }
  var numleds = form.leds.value;
   
  var jsonFormInfo = JSON.stringify({
      COMMAND:"config",
      stationPWD:pass, 
      stationSSID: ssid,
      isDefault: isdefault,
      isMaster: ismaster,
      LEDVariant: isws,
      numberLEDS: numleds,
      extrafeatures:features
  });
  websocket.send(jsonFormInfo);
  sendJSON_possible = false;
   setTimeout(function()
      {
        sendJSON_possible = true;
      }
   , 50);
  window.alert(jsonFormInfo);
   
}

var prefix = "ws:";
var host = window.location.host;
var complhost = prefix + host;
var fixedhost = "ws://192.168.0.16";
var websocket = new WebSocket(complhost);
websocket.onmessage = function(evt) { onMessage(evt) };


var button = document.getElementById('button1');
button.addEventListener('click', sendClick); 