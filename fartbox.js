// const farts = require('./farts-index.json')
import fartFileNames from './farts-index.json'
import uniqueRandomArray from 'unique-random-array';

function randomInteger(min, max){
    return Math.floor(Math.random() * (max - min) ) + min;
}

class FartBox{
    constructor(){
        this.farts = []
        this.isFarting = false;
        this.fartIndex = 0;

        // create fart audio objects
        this.farts = []
        fartFileNames.forEach(fileName => {
            const src = chrome.runtime.getURL(fileName)
            const audioObj = new Audio(src)
            this.farts.push(audioObj)
        })

        // random fart 
        this.randomFart = uniqueRandomArray(this.farts)
    }

    playRandomFart(){
        this.randomFart().play()
    }

    play(){
        this.isFarting = true;
        this.playRandomFart()
        let rand = randomInteger(50,500)
        let timeout = setTimeout(this.moped.bind(this),rand)

    }
    

    moped(){
        if (this.isFarting) {
            this.playRandomFart()
            let rand = randomInteger(50,500)
            setTimeout(this.moped.bind(this), rand);
        }
    }

    pause(){
        this.isFarting = false;
        this.farts.forEach(fart => {
            fart.pause()
        })
    }
}

export default FartBox;



