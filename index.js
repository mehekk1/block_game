var userpattern=[];
var buttons=["yellow","green","red","blue"];
var pattern=[];



var started=false;
var level=0;
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextseq();
        started = true;
    }
});
$(".btn").click(function(){
    var clicked=$(this).attr("id");
    userpattern.push(clicked); 
    sounds(clicked);
    animation(clicked);
    checkAns(userpattern.length-1);
});

function nextseq(){
    level++;
    $("#level-title").text("Level " + level);
    userpattern=[];
    
    var g=Math.floor(Math.random()*4);
    var random=buttons[g];
    pattern.push(random);
    
    $("#"+random).fadeIn(100).fadeOut(100).fadeIn(100);
    sounds(random);
}
function checkAns(current){
    if(pattern[current]===userpattern[current]){
        if(userpattern.length===pattern.length){
           setTimeout(function(){
            nextseq();
           },1000);
        }
    }
    else{
        sounds("wrong");
        $("body").addClass("game-over");
        
        $("#level-title").text("Game Over!");
            setTimeout(function(){
                $("#level-title").text("Press a key to start again");},1000);

        setTimeout(function(){
            $("body").removeClass("game-over");
        },500);

        restart();
    }
}
function animation(current){
    $("#" + current).addClass("pressed");
  setTimeout(function () {
    $("#" + current).removeClass("pressed");
  }, 100);
}
function sounds(clicked){
    var audio=new Audio("sounds/"+clicked+".mp3");
    audio.play();
}
function restart(){
    started=false;
    level=0;
    pattern=[];
    
}
