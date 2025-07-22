class ChannelOut {
    constructor(channel = 0, context) {
        this.context = context || getAudioContext();
        this.input = this.context.createGain();
        let maxChannelCount = this.context.destination.maxChannelCount;
        this.context.destination.channelCount = maxChannelCount;
        if (channel <= maxChannelCount) {
            this.channel = channel
        }
        else {
            console.warn("You are trying to send a signal to an output that doesn't exist, are you sure your multichannel hardware is configured as your default sound output?")
            channel = maxChannelCount - 1
            this.channel = channel
        }
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