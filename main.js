prediction = ""

Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
  });

camera = document.getElementById("camera");

Webcam.attach('#camera');

      
function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

  console.log('ml5 version:', ml5.version);
  
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/0pzoyQCAV/model.json',modelLoaded);

  function modelLoaded() {
    console.log('Model Loaded!');
  }
      
function speak(){
  var synth = window.speechSynthesis;
  speak_data_1 = "The first prediction is " + prediction1;
  var utterThis = new SpeechSynthesisUtterance(speak_data_1);
  synth.speak(utterThis);
}
  function check()
  {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
  }

  function gotResult(error, results) {
    if (error) {
      console.error(error);
    } else {
      console.log(results);
      
      document.getElementById("result_emotion_name").innerHTML = results[0].label;
  
      prediction = results[0].label;
      toSpeak = "";
      
      if(results[0].label == "AMAZING")
      {
        toSpeak = "This is looking amazing";
        document.getElementById("update_emoji").innerHTML = "&#128076;";
      }
      else if(results[0].label == "BEST")
      {
        toSpeak = "All the best";
        document.getElementById("update_emoji").innerHTML = "&#128077;";
      }
      else if(results[0].label == "VICTORY")
      {
        toSpeak = "That was the marvelous victory";
        document.getElementById("update_emoji").innerHTML = "&#9996;";
      }
  
      speak();
    }
  }


