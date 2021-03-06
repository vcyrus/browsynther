import Tone from 'tone';

'use strict'
export class Synth {
  constructor(skipConstructor) {
    if (skipConstructor) {
      return
    };
    const gain = new Tone.Gain(0.5).toMaster();
    let synth = new Tone.FMSynth();
    var synthJSON = {
        "harmonicity":2,
        "modulationIndex": 2,
        "oscillator" : {
            "type": "sine"
        },
        "envelope": {
            "attack": 0.005,
            "decay": 0.2,
            "sustain": 0,
            "release": 0.001
        },
        "modulation" : {
            "type" : "square"
        },
        "modulationEnvelope" : {
            "attack": 0.005,
            "decay": 0.5,
            "sustain": 0,
            "release": 0.001
        }
    };

    // create delay
    this.effect = new Tone.PingPongDelay();
    let delayJson = {
    	"delayTime" : "8n",
    	"feedback" : 0.6,
        "wet": 0.5
    };
    this.effect.set(delayJson);

    // make connections
    synth.set(synthJSON);
    synth.connect(this.effect);
    this.effect.connect(Tone.Master);
    this.synth = synth.connect(gain);

    let self = this;
    this.repeatCallback = function(time) {
    	self.synth.triggerAttackRelease(self.note, '16n');
    };
  }

  start(note, interval, parameter) {
    this.stop();
    this.note = note;
    this.parameter = parameter;
    this.eventId = this.schedule(interval);
    // this.isOn = true;
  }

  schedule(interval) {
    return Tone.Transport.scheduleRepeat(this.repeatCallback, interval);
  }

  stop() {
    Tone.Transport.clear(this.eventId);
    // this.isOn = false;
  }

  // define deep dispose function
  deep_dispose() {
      if(this.effect != undefined && this.effect != null) {
          this.effect.dispose();
          this.effect = null;
      }
      if(this.effect1 != undefined && this.effect1 != null) {
          this.effect1.dispose();
          this.effect1 = null;
      }
      if(this.synth != undefined && this.synth != null) {
          this.synth.dispose();
          this.synth = null;
      }
  }
}
