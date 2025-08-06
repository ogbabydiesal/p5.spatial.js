import ChannelOut from './ChannelOut.js';
import AudioSource from './AudioSource';
import { quadraphonic, octophonic, fivePointOne } from './SpeakerLayouts.js';


p5.prototype.quadraphonic = quadraphonic;
p5.prototype.octophonic = octophonic;
p5.prototype.fivePointOne = fivePointOne;

p5.ChannelOut = ChannelOut;
p5.AudioSource = AudioSource;