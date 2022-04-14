// const FartBox = require('./fartbox');
// const $ = require('jquery');
import $ from 'jquery';
import FartBox from './fartbox';

const fartBox = new FartBox(5);

function adOverlayExists(){
    // an ad is playing only if the ytp-ad-player-overlay exists
    const ytpAdPlayerOverlay = document.querySelector('.ytp-ad-player-overlay')
    return Boolean(ytpAdPlayerOverlay)
}

const adModuleObserver = new MutationObserver(()=>{
    if (adOverlayExists()) {
        fartBox.play()
    }else{
        fartBox.pause();
    }
})

// callback must return boolean which determines if event listener is removed
function waitForNavigation(pathname, callback){

        const listener = () => {
            if(window.location.pathname === pathname){
                let removeEventListener = callback();
                if (removeEventListener) {
                    document.removeEventListener('yt-navigate-finish', listener);
                }
            }
        }
        document.addEventListener('yt-navigate-finish', listener);
        listener();
}

// The user must navigate to /watch once for the video player and ad-module nodes to be inserted
waitForNavigation('/watch', ()=>{
    // Observe ad Module 

    // add Main Video Eventlisteners
    const $mainVideo = document.querySelector('.html5-main-video')

    $mainVideo.onvolumechange = (event)=>{
        const {volume, muted} = event.target
        fartBox.volume = muted ? 0 : volume;
        console.log(volume, muted);
    }
    
    $mainVideo.onpause = (event)=>{
        console.log('paused shit');
        fartBox.pause();
    }
    
    $mainVideo.onplay = (event)=>{
        console.log('resumed shit');
        if (adOverlayExists()) {
            fartBox.play()
        }
    }

    const $videoPlayer = document.querySelector('.html5-video-player');
    console.log('videoPlayer', $videoPlayer);
    const $fartOverlay = document.createElement('div')
    $fartOverlay.classList.add('fart-overlay')
    $videoPlayer.appendChild($fartOverlay)

    // stop listening
    return true;
    // insert fart overlay

})

waitForNavigation('/watch', ()=>{
    const $adModule = document.querySelector('.ytp-ad-module');
    if ($adModule) {
        adModuleObserver.observe($adModule, {childList: true});
        return true;
    }
    return false;
})




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

