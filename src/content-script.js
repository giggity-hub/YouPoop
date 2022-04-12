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

function waitForNavigation(pathname, callback){
    if (window.location.pathname === pathname) {
        callback()
    }else{
        const listener = () => {
            if(window.location.pathname === pathname){
                callback()
                document.removeEventListener('yt-navigate-finish', listener)
            }
        }
        document.addEventListener('yt-navigate-finish', soos)
    }
}

waitForNavigation('/watch', ()=>{
    // Observe ad Module 
    const $adModule = document.querySelector('.ytp-ad-module');
    adModuleObserver.observe($adModule, {childList: true})

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

