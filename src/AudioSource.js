class AudioSource {
    constructor(context, speakerPositions, pickupRadius = 100) {
        this.context = context;
        this.outputNames = Object.keys(speakerPositions);
        this.outputs = this.outputNames.length;
        let maxChannelCount = context.destination.maxChannelCount;
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
        this.speakerPositions = speakerPositions;
    }

    //given the coordinates update the position of the audio in all of the channels
    move(x, y) {
        this.outputNames.forEach ((key, index) => {
            //calculate the distance from the source to each speaker
            let distance = 1 - constrain(map(dist(x, y, this.speakerPositions[key].x, this.speakerPositions[key].y), 0, this.pickupRadius, 0, 1), 0, 1);
            this.gains[index].gain.value = distance;
        });
    }

    getNode() {
        return this.audioSource;
    }

    connect(destination) {
        this.audioSource.connect(destination.getNode());
    }
}

export default AudioSource;