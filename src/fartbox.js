// const farts = require('./farts-index.json')
import fartFileNames from '../static/fart-urls.json'
import uniqueRandomArray from 'unique-random-array';

const fartURLs = fartFileNames.map((file)=>{
    console.log(file);
    return chrome.runtime.getURL(file)
})

class Ass{
    constructor(src){
        console.log('new ass');
        this.src = src;
        this.nextSrc = uniqueRandomArray(src)
        this.audio = new Audio()
        this.audio.src = this.nextSrc();
        this.audio.onended = this.play
    }
    play = () =>{
        if (this.audio.ended){
            this.audio.src = this.nextSrc()
        }
        this.audio.play()
    }
    pause = () =>{
        this.audio.pause();
    }
    stop = () =>{
        this.audio.pause();
        // set new src to enjoy whole fart on next play
        this.audio.src = this.nextSrc();
    }
    set volume(value){
        this.audio.volume = value;
    }
}

class FartBox{
    constructor(assCount){
        this.asses = []
        for (let i = 0; i < assCount; i++) {
            let ass = new Ass(fartURLs);
            this.asses.push(ass)
        }
        this.ass = new Ass(fartURLs)
    }
    play = ()=>{
        for (let ass of this.asses){
            ass.play()
        }
    }
    pause = ()=>{
        for (let ass of this.asses){
            ass.pause()
        }
    }
    stop = () =>{
        for (let ass of this.asses){
            ass.stop()
        }
    }
    set volume(value){
        for (let ass of this.asses){
            ass.volume = value;
        }
        
    }
}

export default FartBox;



