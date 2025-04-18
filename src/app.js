import AudioOut from './AudioOut';
import AudioSource from './AudioSource';
import { quad, octaphonic } from './SpeakerLayouts.js';


p5.prototype.quad = quad;
p5.prototype.octaphonic = octaphonic;

p5.AudioOut = AudioOut;
p5.AudioSource = AudioSource;