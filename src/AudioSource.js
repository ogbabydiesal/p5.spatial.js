import { quadraphonic, octophonic, fivePointOne } from './SpeakerLayouts.js';

class AudioSource {
    constructor(speakerPositions, maxDistance = 100, context) {
        if (typeof speakerPositions == 'string') { 
            if (speakerPositions == 'quad') {
                speakerPositions = quadraphonic();
            }
            if (speakerPositions == 'octophonic') {
                speakerPositions = octophonic();
            }
            if (speakerPositions == '5.1') {
                speakerPositions = fivePointOne();
            }
        }
        if (typeof speakerPositions == 'number') {
            maxDistance = speakerPositions;
            speakerPositions = quadraphonic();
        }
        this.context = context || getAudioContext();
        this.speakerPositions = speakerPositions || quadraphonic();
        this.outputNames = Object.keys(this.speakerPositions);
        this.outputs = this.outputNames.length;
        let maxChannelCount = this.context.destination.maxChannelCount;
        this.context.destination.channelCount = maxChannelCount;
        this.audioSource = this.context.createGain();
        this.merger = this.context.createChannelMerger(this.outputs);
        this.gains = [];
        this.label = "label me!";
        this.textSize = 12;
        this.maxDistance = maxDistance;
        for (let i = 0; i < this.outputs; i++) {
            let speaker = this.context.createGain();
            this.audioSource.connect(speaker);
            speaker.gain.value = 0;
            speaker.connect(this.merger, 0, i);
            this.gains.push(speaker);
        }
        this.merger.connect(this.context.destination);
        this.x = width / 2;
        this.y = height / 2;
    }

    //given the coordinates update the position of the audio in all of the channels
    move(x, y) {
        this.x = x;
        this.y = y;
        this.outputNames.forEach ((key, index) => {
            //calculate the distance from the source to each speaker
            let now = this.context.currentTime;
            let distance = 1 - constrain(map(dist(x, y, this.speakerPositions[key].x, this.speakerPositions[key].y), 0, this.maxDistance, 0, 1), 0, 1);
            this.gains[index].gain.setTargetAtTime(distance, now, 0.01);
        });
    }

    //render the layout of the speakers using p5.js rect
    renderLayout() {
        this.outputNames.forEach((key) => {
            let speaker = this.speakerPositions[key];
            push();
            rectMode(CENTER);
            fill(0, 0, 0, 150);
            rect(speaker.x, speaker.y, speaker.w, speaker.h);
            pop();
        });
    }
    
    //render the maximum radius
    renderDistance() {
        this.outputNames.forEach((key) => {
            let speaker = this.speakerPositions[key];
            push();
            fill(0, 0, 0, 10);
            ellipse(speaker.x, speaker.y, this.maxDistance * 2);
            pop();
        });
    }

    //render the audio source as a white square
    renderSource() {
        push();
        fill(255, 255, 255, 200);
        rectMode(CENTER);
        rect(this.x, this.y, 10, 10);
        pop();
    }

    //label the audio source
    applyLabel(label = 'label me!') {
        this.label = label;
    }

    //render the audio source as a white square
    renderLabel(size = this.textSize) {
        push();
        fill(255, 255, 255, 200);
        textAlign(CENTER);
        textSize(size);
        text(this.label, this.x, this.y + 15);
        pop();
    }

    //change the maximum distance of the audio source
    maxDistance(x) {
        this.maxDistance = x;
    }

    getNode() {
        return this.audioSource;
    }
}

export default AudioSource;