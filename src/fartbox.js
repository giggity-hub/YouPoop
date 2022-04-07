// const farts = require('./farts-index.json')
import fartFileNames from '../static/fart-urls.json'
import uniqueRandomArray from 'unique-random-array';

const fartURLs = fartFileNames.map((file)=>{
    console.log(file);
    return chrome.runtime.getURL(file)
})


class Ass{
    constructor(src){
        this.src = src;
        this.nextSrc = uniqueRandomArray(src)
        this.audio = new Audio()
        this.audio.onended = this.play
    }
    play = () =>{
        if (!this.audio.paused) return;

        let src = this.nextSrc();
        this.audio.src = src
        this.audio.play()
    }
    pause = () =>{
        this.audio.pause();
    }
}

class FartBox{
    constructor(assCount){
        this.ass = new Ass(fartURLs)
    }
    play = ()=>{
        this.ass.play()
    }
    pause = ()=>{
        this.ass.pause()
    }
}

export default FartBox;



