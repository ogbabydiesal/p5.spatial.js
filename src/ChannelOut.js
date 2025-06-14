class ChannelOut {
    constructor(channel = 0, context) {
        this.context = context || getAudioContext();
        this.channel = channel;
        this.input = this.context.createGain();
        let maxChannelCount = this.context.destination.maxChannelCount;
        this.context.destination.channelCount = maxChannelCount;
        this.merger = this.context.createChannelMerger(maxChannelCount);
        this.input.channelCount = 1;
        this.input.channelCountMode = 'explicit';
        this.input.channelInterpretation = 'discrete';
        this.input.connect(this.merger, 0, channel);
        this.merger.connect(this.context.destination);
    }

    //switch the channel to a different one
    switch(channel) {
        this.channel = channel;
        this.input.disconnect();
        this.input.connect(this.merger, 0, channel);
    }

    //get the audio source node
    getNode() {
        return this.input;
    }
}

export default ChannelOut;