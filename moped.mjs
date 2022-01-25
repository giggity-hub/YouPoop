// const FartBox = require('./fartbox');
// const $ = require('jquery');
import $ from 'jquery';
import FartBox from './fartbox';


function main(){
    const fartBox = new FartBox();

let target = document.querySelector('.ytp-ad-module');
const $video = document.querySelector('.html5-main-video');

console.log("content script ran");


function activatePoop(){
    fartBox.play()
    console.log("poop activated");
}

function deactivatePoop(){
    fartBox.pause();
    console.log("poop deactivated");
}

function updatePoopPlayer(){
    // const ytpAdPlayerOverlay = document.querySelector('.ytp-ad-player-overlay')

    // if (ytpAdPlayerOverlay && !poopActivated) {
    //     activatePoop()
    // }else if (!ytpAdPlayerOverlay && poopActivated){
    //     deactivatePoop()
    // }
}

const observer = new MutationObserver(updatePoopPlayer)

if (target) {
    observer.observe(target, {childList: true})
}

// initialize poop player
updatePoopPlayer()
// add Audio Player


// on run
// check if ytp ad module exists
document.addEventListener('yt-navigate-finish', function(){
    let target = document.querySelector('.ytp-ad-module');
    const $video = document.querySelector('.html5-main-video');

    if (target){
        observer.observe(target, {childList: true})
    }
})



const $startBtn = $('<button/>', {text: "start", css: {
    zIndex: 10000,
    position: 'relative'
}})
$startBtn.on('click', activatePoop)
$('body').prepend($startBtn)

const $stopBtn = $('<button/>', {text: "stop", css: {
    zIndex: 10000,
    position: 'relative'
}})
$stopBtn.on('click', deactivatePoop)
$('body').prepend($stopBtn)
}


export default main
