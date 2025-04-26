import AudioOut from './AudioOut';
import AudioSource from './AudioSource';
import { quad, octophonic } from './SpeakerLayouts.js';


p5.prototype.quad = quad;
p5.prototype.octophonic = octophonic;

p5.AudioOut = AudioOut;
p5.AudioSource = AudioSource;