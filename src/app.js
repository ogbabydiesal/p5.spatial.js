import ChannelOut from './ChannelOut.js';
import AudioSource from './AudioSource';
import { quad, octophonic, fivePointOne } from './SpeakerLayouts.js';


p5.prototype.quad = quad;
p5.prototype.octophonic = octophonic;
p5.prototype.fivePointOne = fivePointOne;

p5.ChannelOut = ChannelOut;
p5.AudioSource = AudioSource;