import { quad, octophonic, fivePointOne } from './SpeakerLayouts.js';

class AudioSource {
    //if no pickup radius is given, determine how many speakers are in the layout and set the pickup radius to that number
    constructor(speakerPositions, pickupRadius = (width / speakerPositions.length * speakerPositions.length), context) {
        if (typeof speakerPositions == 'string') { 
            if (speakerPositions == 'quad') {
                speakerPositions = quad();
            }
            if (speakerPositions == 'octophonic') {
                speakerPositions = octophonic();
            }
            if (speakerPositions == 'fivePointOne') {
                speakerPositions = fivePointOne();
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
            fill(0, 0, 0, 150);
            rect(speaker.x, speaker.y, speaker.w, speaker.h);
            pop();
        });
    }

    //render the radius of the pickup area
    renderPickup() {
        this.outputNames.forEach((key) => {
            let speaker = this.speakerPositions[key];
            push();
            fill(0, 0, 0, 10);
            ellipse(speaker.x, speaker.y, this.pickupRadius * 2);
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

    //change the pickup radius of the audio source
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