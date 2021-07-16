var main=document.getElementById('main')
var diana=document.getElementById('diana')
var side=document.getElementsByClassName('side')
var vWidth,aWidth,aHeight
var nowPlay=-1,nowVideo=1,MAXVideo=4
var musics=document.getElementsByClassName('song-controller')
var plays=document.getElementsByClassName('song-play')
var playIcons=document.getElementsByClassName('song-play-icon')
var songs=document.getElementsByClassName('song-item')
var announceWarpper=document.getElementById('announce')
var announce=document.getElementById('announce-video')
var selectBtn=document.getElementsByClassName('select-btn')
var timeDiv=document.getElementById('time')
diana.addEventListener('load',function(){
    vWidth=this.clientWidth
    resize()
})
announce.addEventListener('canplay',function(){
    aWidth=this.clientWidth
    aHeight=this.clientHeight
    resize()
})
announce.addEventListener('play',function(){
    announce.paused=false
})
announce.addEventListener('pause',function(){
    announce.paused=true
})
announce.addEventListener('ended',function(){
    nowVideo=nowVideo==MAXVideo?1:nowVideo+1
    announce.src="res/video/"+nowVideo+'.mp4'
    announce.play()
})
for(let i=0;i<musics.length;i++){
    musics[i].oncanplay=function(){
        plays[i].onclick=()=>{
            play(i);
        }
        console.log(i)
    }
    musics[i].addEventListener('play',function(){
        playIcons[i].setAttribute('src','res/image/pause.png')
        songs[i].className=songs[i].className+' playing'
        musics[i].paused=false
    })
    musics[i].addEventListener('pause',function(){
        playIcons[i].setAttribute('src','res/image/play.png')
        songs[i].className=songs[i].className.replace(' playing','')
        musics[i].paused=true
    })  
    musics[i].addEventListener('ended',function(){
        playIcons[i].setAttribute('src','res/image/play.png')
        songs[i].className=songs[i].className.replace(' playing','')
        musics[(i+1)%musics.length].play()
    })
}
function resize(){
    console.log("resize")
    var maxWidth=main.clientWidth
    var sideWidth=((maxWidth-vWidth)/2)-2
    for(var i=0;i<side.length;i++){
        side[i].style.width=sideWidth+'px'
        side[i].style.height=main.clientHeight-1+'px'
    }
    diana.style.marginLeft=sideWidth+'px'
    var aww=aWidth+52
    announceWarpper.style.width=aww+'px'
    announceWarpper.style.marginLeft=(sideWidth-aww)/2+'px'
    selectBtn[0].style.height=aHeight-6+'px'
    selectBtn[1].style.height=selectBtn[0].style.height
    timeDiv.style.left=(sideWidth-timeDiv.clientWidth)/2+'px'
}
function play(i){
    if(nowPlay==i){
        if(!musics[i].paused) {
            musics[i].pause()
        }else{
            musics[i].play()
        } 
    }else{
        for(var j=0;j<musics.length;j++){
            musics[j].pause()
        }
        musics[i].play()
        nowPlay=i
    }
}
function playAnnounce(e){
    if(!e.paused) {
        e.pause()
    }else{
        e.play()
    } 
}
function nextVideo(){
    nowVideo=nowVideo==MAXVideo?1:nowVideo+1;
    announce.src="res/video/"+nowVideo+'.mp4';
}
function preVideo(){
    nowVideo=nowVideo==1?MAXVideo:nowVideo-1;
    announce.src="res/video/"+nowVideo+'.mp4';
}
window.setInterval(function updateTime(){
    document.getElementById('time-text').innerText=new Date().toLocaleString()
},1000);
window.onresize=resize
announce.onclick=()=>{
    playAnnounce(announce)
} 
document.getElementById('preVideoBtn').onclick=()=>{
    preVideo()
}
document.getElementById('nextVideoBtn').onclick=()=>{
    nextVideo()
}
var cursor=document.createElement('img')
cursor.width=30
cursor.height=30
cursor.style.position='fixed'
cursor.style.zIndex=99999
cursor.src="/res/image/cursor.ico"
document.body.appendChild(cursor)
window.onmousemove=(event)=>{
    cursor.style.left=event.clientX+20+'px'
    cursor.style.top=event.clientY+'px'
}