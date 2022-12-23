song1 = " ";
song2 = " ";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
songStatus1 = " ";
songStatus2 = " ";
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload(){
    song1 = loadSound('music.mp3');
    song2 = loadSound('music2.mp3');
}

function setup(){
    canvas = createCanvas(500, 400);
    canvas.position(400,200);

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded(){
    console.log("PoseNet Is Intialized");
}

function gotPoses(results)
{
    if(results.length > 0){
        console.log(results);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist + "scoreRightWrist = " + scoreRightWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}

function draw(){
    image(video, 0, 0, 500, 400);

    fill("#FF0000");
    stroke("#FF0000");

    songStatus1 = song1.isPlaying();
    songStatus2 = song2.isPlaying();
    if(scoreLeftWrist > 0.2){
        circle(leftWristX,leftWristY,20);
        song2.stop();
        if(songStatus1 == false){
            song1.play();
            document.getElementById("song_name").innerHTML = "peter pam song";
        }
    }
    songStatus = song2.isPlaying();
    if(scoreRightWrist > 0.2){
        circle(rightWristX,rightWristY,20);
        song1.stop();
        if(songStatus2 == false){
            song2.play();
            document.getElementById("song_name").innerHTML = "harry potter theme song";
        }
    }
}