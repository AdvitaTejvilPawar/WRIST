song1=""
song=""
function prelaod(){
    song=loadSound("smg.mp3")
    song1=loadSound("wmbu.mp3")
    
}
rightWristX=0
rightWristY=0

leftWristX=0
leftWristY=0

rightWristScore = 0
leftWristScore = 0



function setup(){
    canvas=createCanvas(640,420);
    canvas.center();
    video=createCapture(VIDEO)
    video.hide()

    poseNet=ml5.poseNet(video,modelLoaded)
    poseNet.on('pose',gotPoses)
}


function draw(){
    image(video,0,0,640,420)
    fill("red")
    stroke("black")
    if(leftWristScore>0.2){
        if(song1.isPlaying()){
            song1.pause()
        }
        

        song.play()
circle(leftWristX,leftWristY,20)
numerical =Number(leftWristY)
integer =floor(numerical)
volume =integer/420
song.setVolume(volume)
document.getElementById("volume").innerHTML="volume"+volume

}else if (rightWristScore>0.2) {
    if(song.isPlaying()){
        song.pause()
    }
    song1.play()
    circle(rightWristX,rightWristY,20)
numerical =Number(rightWristY)
integer =floor(numerical)
volume =integer/420
song.setVolume(volume)
} 
}


function play_sound(){
    song.play()
    song.setVolume(1)
    song.rate(1)
}


function modelLoaded(){
console.log('PoseNet is Initialized ')
}
function gotPoses(results){
    if(results.length>0)
    {
   console.log(results)
   
   leftWristScore= results[0].pose.keypoints[9].score
   leftWristX=results[0].pose.leftWrist.x
   
   leftWristY=results[0].pose.leftWrist.y 
   console.log("leftWristX", leftWristX,"leftWristY",leftWristY)
   
   rightWristX=results[0].pose.rightWrist.x 
   rightWristY=results[0].pose.rightWrist.y
   
   console.log ("rightWristX", rightWristX ,"rightWristY",rightWristY)
   
    }
   }
