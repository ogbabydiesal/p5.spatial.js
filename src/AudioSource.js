import { quad, octaphonic } from './SpeakerLayouts.js';

class AudioSource {
    constructor(speakerPositions, pickupRadius = 100, context) {
        if (typeof speakerPositions == 'string') { 
            if (speakerPositions == 'quad') {
                speakerPositions = quad();
            }
            if (speakerPositions == 'octaphonic') {
                speakerPositions = octaphonic();
            }
        }
        if (typeof speakerPositions == 'number') {
            pickupRadius = speakerPositions;
            speakerPositions = quad();
        }
        this.context = context || getAudioContext();
        this.speakerPositions = speakerPositions || quad();
        this.outputNames = Object.keys(this.speakerPositions);
        this.outputs = this.outputNames.length;
        let maxChannelCount = this.context.destination.maxChannelCount;
        this.context.destination.channelCount = maxChannelCount;
        this.audioSource = this.context.createGain();
        this.merger = this.context.createChannelMerger(this.outputs);
        this.gains = [];
        this.pickupRadius = pickupRadius;
        for (let i = 0; i < this.outputs; i++) {
            let speaker = this.context.createGain();
            this.audioSource.connect(speaker);
            speaker.gain.value = 0;
            speaker.connect(this.merger, 0, i);
            this.gains.push(speaker);
        }
        this.merger.connect(this.context.destination);
    }

    //given the coordinates update the position of the audio in all of the channels
    move(x, y) {
        this.outputNames.forEach ((key, index) => {
            //calculate the distance from the source to each speaker
            let now = this.context.currentTime;
            let distance = 1 - constrain(map(dist(x, y, this.speakerPositions[key].x, this.speakerPositions[key].y), 0, this.pickupRadius, 0, 1), 0, 1);
            this.gains[index].gain.setTargetAtTime(distance, now, 0.01);
        });
    }

    //render the layout of the speakers using p5.js rect
    renderLayout() {
        this.outputNames.forEach((key) => {
            let speaker = this.speakerPositions[key];
            push();
            rectMode(CENTER);
            rect(speaker.x, speaker.y, speaker.w, speaker.h);
            pop();
        });
    }

    //render the radius of the pickup area
    renderPickup() {
        this.outputNames.forEach((key) => {
            let speaker = this.speakerPositions[key];
            push();
            //pink
            fill(255, 192, 203, 40);
            strokeWeight(0.1);
            ellipse(speaker.x, speaker.y, this.pickupRadius * 2);
            pop();
        });
    }

    pickupRadius(x) {
        this.pickupRadius = x;
    }

    getNode() {
        return this.audioSource;
    }

    connect(destination) {
        this.audioSource.connect(destination.getNode());
    }
}

export default AudioSource;