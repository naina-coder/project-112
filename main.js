prediction = "";


Webcam.set({
width: 350,
height: 420,
image_format: "png",
png_quality:90

});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot()
{
   Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML = '<img id="captured_image" src= "'+data_uri+'"/>'
   });
}

console.log("ml5 version:",ml5.version )

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/JC_Hx5fd9/model.json', modelLoaded())
 function modelLoaded()
 {
     console.log("model loaded")
 }


 function check()
{
    img = document.getElementById('captured_image');
classifier.classify(img, gotResult);
}


function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The First predition is "+prediction;

    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}


function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();
        if(results[0].label == "ok"){
            document.getElementById("result_emoji").innerHTML = "&#128076;";

        }
        if(results[0].label == "victory"){
            document.getElementById("result_emoji").innerHTML = "&#9996;";
        }
        if(results[0].label == "fingerHeart"){
            document.getElementById("result_emoji").innerHTML = "&#10084;&#65039;";
        }
        if(results[0].label == "horns"){
            document.getElementById("result_emoji").innerHTML = "&#129304;";
        }
    }
}