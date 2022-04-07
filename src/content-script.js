// const FartBox = require('./fartbox');
// const $ = require('jquery');
import $ from 'jquery';
import FartBox from './fartbox';

const fartBox = new FartBox();

function updatePoopPlayer(){
    // an ad is playing only if the ytp-ad-player-overlay exists
    const ytpAdPlayerOverlay = document.querySelector('.ytp-ad-player-overlay')
    
    if (ytpAdPlayerOverlay) {
        fartBox.play()
    }else if (!ytpAdPlayerOverlay){
        fartBox.pause();
    }
}

// the ytp-ad-module is persistent but may not exist initially
let target = document.querySelector('.ytp-ad-module');
const observer = new MutationObserver(updatePoopPlayer)

if (target) {
    observer.observe(target, {childList: true})
    updatePoopPlayer()
}else{
    // listen for navigations until the user navigates to a video which will add the ytp-ad-module node
    function listener(){
        console.log("navigated");
        let target = document.querySelector('.ytp-ad-module');

        if (target){
            observer.observe(target, {childList: true})
            document.removeEventListener('yt-navigate-finish', listener)
        }
    }
    document.addEventListener('yt-navigate-finish', listener)
}





const $startBtn = $('<button/>', {text: "start", css: {
    zIndex: 10000,
    position: 'relative'
}})
$startBtn.on('click', fartBox.play)
$('body').prepend($startBtn)

const $stopBtn = $('<button/>', {text: "stop", css: {
    zIndex: 10000,
    position: 'relative'
}})
$stopBtn.on('click', fartBox.pause)
$('body').prepend($stopBtn)

