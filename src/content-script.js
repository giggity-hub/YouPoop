// const FartBox = require('./fartbox');
// const $ = require('jquery');
import $ from 'jquery';
import FartBox from './fartbox';
import { WebAccessibleResourcesExplorer } from './lib/dir-tree-parser';
import dirTree from '../static/dir-tree.json'
import waitForElm from './lib/wait-for-elem';


const resources = new WebAccessibleResourcesExplorer(dirTree)
// console.log(resources.list('farts/audio'));


const fartBox = new FartBox(
    resources.list('farts/audio'),
    5
);

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


waitForElm('.html5-main-video').then($mainVideo =>{
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
    console.log('videoPlayer', $mainVideo);
    const $fartOverlay = document.createElement('div')
    $fartOverlay.classList.add('fart-overlay')
    $videoPlayer.appendChild($fartOverlay)
})

waitForElm('.ytp-ad-module').then($adModule =>{
    adModuleObserver.observe($adModule, {childList: true});
})




// stop farting when navigating
document.addEventListener('.yt-navigate-finish', function(){
    fartBox.pause();
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



chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // 2. A page requested user data, respond with a copy of `user`
    console.log(message);
    if (message.action === 'SET_ASS_COUNT') {
        fartBox.setAssCount(message.assCount);
    }
    
    // console.log(message);
    sendResponse("du huansoooooooooooooooooohn")
    // if (message === 'get-user-data') {
    //   sendResponse(user);
    // }
  });


