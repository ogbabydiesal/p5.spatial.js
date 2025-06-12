//TODO: this is a stub for AudioOut
class ChannelOut {
    constructor(channel = 0, context) {
        this.context = context || getAudioContext();
        this.channel = channel;
        this.audioSource = this.context.createGain();
        let maxChannelCount = this.context.destination.maxChannelCount;
        this.context.destination.channelCount = maxChannelCount;
        this.merger = this.context.createChannelMerger(maxChannelCount);
        this.audioSource.channelCount = 1;
        this.audioSource.channelCountMode = 'explicit';
        this.audioSource.channelInterpretation = 'discrete';
        this.audioSource.connect(this.merger, 0, channel);
        this.merger.connect(this.context.destination);
    }

    //switch the channel to a different one
    switch(channel) {
        this.channel = channel;
        this.audioSource.disconnect();
        this.audioSource.connect(this.merger, 0, channel);
    }

    //get the audio source node
    getNode() {
        return this.audioSource;
    }
}

export default ChannelOut;