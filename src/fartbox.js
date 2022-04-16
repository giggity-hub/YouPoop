// const farts = require('./farts-index.json')
import fartFileNames from '../static/fart-urls.json'
import uniqueRandomArray from 'unique-random-array';
// import staticTree from '../static/dir-tree.json';
// import { TreeParser } from './lib/dir-tree-parser';

// const tree = new TreeParser(staticTree)


// resources.list farts
// const fartAudioURLs = 


// const fartURLs = fartFileNames.map((file)=>{
//     return chrome.runtime.getURL(file)
// })

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
    constructor(src, assCount=1){
        this.asses = []
        for (let i = 0; i < assCount; i++) {
            let ass = new Ass(src);
            this.asses.push(ass)
        }
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



