song_1 ="";
song_2 =""; 

leftWristX = 0;
leftWristY = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;

rightWristX = 0;
rightWristY = 0;

function preload() {
    song_2 = loadSound("music.mp3");
    song_1 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on("pose", gotPoses );
}
function modelLoaded() {
    console.log("Posenet is initialized");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("left wrist = "+leftWristX+"left wrist y"+ leftWristY);
        
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log(" score of right wrist:- "+scoreRightWrist+"score left wrist"+scoreLeftWrist);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWrist x:-"+ rightWristX+"rightWrist y:-"+ rightWristY);
    }
}

function draw() {
    image(video, 0, 0, 600, 500);

    is_it_playing_1 = song_1.isPlaying();
    is_it_playing_2 = song_2.isPlaying();

    fill("#FF0000");
    stroke('#FF0000');

    if(scoreRightWrist > 0.0) {
        circle(rightWristX, rightWristY, 40);

        song_1.stop();

        if(is_it_playing_2 = false) {

            song_2.play();
            
            document.getElementById("song_name").innerHTML = "Song name:- Harrypotter remix";
        }
    }
    
    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 40);

        song_2.stop();

       if (is_it_playing_1 == false ) {

        song_1.play();
        console.log("Playing");
        document.getElementById("song_name").innerHTML = "Song name:- Captain song guiter";
       }
    }
}
function play() {
    if(is_it_playing_1 == false) {
        song_2.play();
    }
    if  (is_it_playing_2 == false) {
        song_1.play();
    }

}