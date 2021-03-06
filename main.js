var img="";
var status="";
var objects=[];
var alarm="";
function preload() {
    img=loadImage("baby.jpg");
    alarm=loadSound("classic_clock_alarm.mp3");
}

function setup() {
    canvas=createCanvas(640,420);
    canvas.center();
    objectdetecter=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="ðµï¸ââï¸ðµï¸ââï¸ðµï¸ââï¸ðµï¸ââï¸DETECTING. PLEASE WAIT.ðµï¸ââï¸ðµï¸ââï¸ðµï¸ââï¸ðµï¸ââï¸";
}


function draw() {
    image(img,0,0,640,420);
    if (status!="") {
        r=random(255);
        g=random(255);
        b=random(255);
        objectdetecter.detect(img,gotResult);
        
        for ( i = 0; i < objects.length; i++) {
            if (objects[i].label=="person") {
                document.getElementById("isbabydetected").innerHTML="âºï¸âºï¸âºï¸ YAY! The baby has been detected! âºï¸âºï¸âºï¸";
                document.getElementById("status").innerHTML="There are "+objects.length+" objects detected currently.";
                fill(r,g,b);
                accuracypercent=floor(objects[i].confidence*100);
                noFill();
                text(objects[i].label+" "+accuracypercent+"%",objects[i].x+50,objects[i].y+50);
                stroke(r,g,b);
                rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
                alarm.stop();
            }
            else{
                document.getElementById("isbabydetected").innerHTML="Baby is not detected";
                alarm.play();
            }
        }
    }
}
function modelLoaded() {
    console.log("ðµï¸ââï¸ðµï¸ââï¸MODEL IS LOADEDðµï¸ââï¸ðµï¸ââï¸");
    status=true;
}
function gotResult(error,results) {
    if (error) {
        console.error(error);
    }
    else{ 
        console.log(results);
        objects=results;
    }
}

