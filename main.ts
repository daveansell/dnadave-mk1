let which_LED = 0
let cog_average_before = 0
let cog_average = 0
let Dave_state = 0
let cog_voltage = 0
let rand = 0
let pauseBetweenNotes = 0
let note_duration = 0
let which_protein = 0
let i = 0
let strip2: neopixel.Strip = null
let strip: neopixel.Strip = null
let pin_ledRNA = DigitalPin.P1
let pin_ledDoors = DigitalPin.P8
let pin_motors = DigitalPin.P12
let pin_buttonLED = DigitalPin.P2
strip = neopixel.create(pin_ledRNA, 10, NeoPixelMode.RGB)
strip2 = neopixel.create(pin_ledDoors, 6, NeoPixelMode.RGB)
let increment = 20
let dispensed_protein = 1


function Glissanto (note1: number, note2: number, rate: number) {
    if (note1 < note2) {
        i = note1
        while (i < note2) {
            music.ringTone(i)
            control.waitMicros(rate)
            i += 2
        }
    } else {
        i = note1
        while (i > note2) {
            music.ringTone(i)
            control.waitMicros(rate)
            i += -2
        }
    }
    music.rest(0)
}
function dispense_protein () {
    which_protein = Math.randomRange(0, strip2.length() - 1)
    strip2.setPixelColor(which_protein, neopixel.rgb(Math.randomRange(0, 255), Math.randomRange(0, 255), Math.randomRange(0, 255)))
    strip2.setPixelColor(Math.abs((which_protein - 1) % strip2.length()), neopixel.rgb(Math.randomRange(0, 255), Math.randomRange(0, 255), Math.randomRange(0, 255)))
    strip2.show()
    for (let index4 = 0; index4 <= 9 * strip2.length() - 1; index4++) {
        strip2.rotate(1)
        strip2.show()
        music.ringTone(index4 * index4)
        control.waitMicros(index4 * 7000)
    }
    strip2.clear()
    strip2.setPixelColor(which_protein, neopixel.colors(NeoPixelColors.Green))
    strip2.show()
    success_sound()
    control.waitMicros(6000000)
    strip.clear()
    strip.show()
    control.waitMicros(2000000)
    strip2.clear()
    strip2.show()
}

function angry_Dave_sound () {
    for (let index3 = 0; index3 <= 4; index3++) {
        for (let index23 = 0; index23 <= 1000; index23++) {
            music.ringTone(1000 - index23)
            control.waitMicros(300)
        }
    }
    music.rest(music.beat(BeatFraction.Whole))
    music.stopMelody(MelodyStopOptions.All)
}
function Tremolo (note: number, length: number, rate: number) {
    note_duration = length / rate
    pauseBetweenNotes = rate * (1 + rate / length)
    for (let index = 0; index <= rate; index++) {
        music.playTone(note, note_duration)
        music.rest(pauseBetweenNotes)
    }
    music.rest(0)
}
function redArmpitButtonSound () {
    rand = Math.randomRange(1, 4)
    if (rand == 1) {
        Glissanto(784, 392, 0)
        Glissanto(392, 784, 0)
        control.waitMicros(100000)
        Glissanto(784, 392, 0)
        Glissanto(392, 784, 0)
    }
    if (rand == 2) {
        Glissanto(1400, 1000, 0)
        Glissanto(1200, 800, 0)
        Glissanto(1000, 6000, 0)
        control.waitMicros(300000)
        Tremolo(440, 30, 3)
        control.waitMicros(100000)
        Tremolo(659, 30, 12)
    }
    if (rand > 2) {
        Glissanto(784, 392, 0)
        control.waitMicros(300000)
        Glissanto(784, 392, 0)
        Glissanto(784, 196, 0)
    }
}

input.onButtonPressed(Button.A, function () {
    greenArmpitButtonSound()
    control.waitMicros(1000)
})

input.onButtonPressed(Button.B, function () {
    redArmpitButtonSound()
    control.waitMicros(1000)
})
input.onPinPressed(TouchPin.P1, function () {
    // Big red button
    pins.digitalWritePin(pin_motors,1)
    pins.digitalWritePin(pin_buttonLED,1)
    let v=0
    for(i==0;i<20;i++){
        if(v==0){
            v=1
        }else{
            v=0
        }
        pins.digitalWritePin(pin_buttonLED,v)
        control.waitMicros(200000)
    }
    pins.digitalWritePin(pin_buttonLED,0)
    pins.digitalWritePin(pin_motors,0)
})
function greenArmpitButtonSound () {
    rand = Math.randomRange(1, 5)
    if (rand == 1) {
        Glissanto(784, 392, 0)
        control.waitMicros(300000)
        Glissanto(880, 220, 0)
        control.waitMicros(100000)
        Tremolo(175, 30, 3)
        control.waitMicros(100000)
        Tremolo(131, 30, 3)
        control.waitMicros(100000)
        Glissanto(131, 523, 0)
        Glissanto(988, 392, 0)
    }
    if (rand == 2) {
        Glissanto(500, 2000, 0)
        control.waitMicros(500000)
        Tremolo(800, 30, 3)
        control.waitMicros(100000)
        Tremolo(600, 30, 3)
        control.waitMicros(100000)
        Glissanto(300, 1700, 0)
        Glissanto(600, 3000, 0)
    }
    if (rand == 3) {
        Glissanto(6000, 200, 0)
        control.waitMicros(500000)
        Tremolo(1000, 30, 3)
        control.waitMicros(100000)
        Tremolo(600, 30, 3)
        control.waitMicros(100000)
        Tremolo(800, 30, 3)
        control.waitMicros(100000)
        Tremolo(400, 30, 3)
    }
    if (rand == 4) {
        Glissanto(6000, 5500, 100)
        control.waitMicros(100000)
        Glissanto(6000, 5500, 100)
        control.waitMicros(300000)
        Glissanto(6000, 5500, 100)
        control.waitMicros(100000)
        Tremolo(1000, 30, 3)
        control.waitMicros(10000)
        Tremolo(600, 30, 3)
        control.waitMicros(10000)
        Tremolo(800, 30, 3)
        control.waitMicros(10000)
        Tremolo(400, 30, 3)
    }
    if (rand == 5) {
        Glissanto(294, 2000, 0)
        control.waitMicros(500000)
        Tremolo(1760, 30, 3)
        control.waitMicros(100000)
        Tremolo(1396, 30, 3)
        control.waitMicros(100000)
        Glissanto(5000, 2500, 0)
        Glissanto(5000, 2500, 0)
    }
}
function success_sound () {
    for (let index2 = 0; index2 <= Math.randomRange(1, 6); index2++) {
        for (let index22 = 0; index22 <= 1000; index22++) {
            music.ringTone(1000 + index22)
            control.waitMicros(300)
        }
    }
    music.rest(music.beat(BeatFraction.Whole))
    music.stopMelody(MelodyStopOptions.All)
}

basic.forever(function () {
    cog_voltage = pins.analogReadPin(AnalogPin.P4)
    control.waitMicros(1000)
    if (Dave_state == 0) {
        strip.clear()
        strip.show()
        cog_average = 0
        pins.digitalWritePin(DigitalPin.P2, 1)
        if (cog_voltage < 20) {
            pins.digitalWritePin(DigitalPin.P2, 0)
            strip.clear()
            strip2.clear()
            strip.show()
            strip2.show()
            Dave_state = 1
            cog_average_before = 20
        }
    } else if (Dave_state == 1) {
        cog_average += (cog_voltage - cog_average) * 0.7
        which_LED = Math.round(Math.map(cog_average, 0, 1023, 0, strip.length() + 2))
        for (let index5 = 0; index5 <= which_LED; index5++) {
            strip.setPixelColor(index5, neopixel.rgb(Math.randomRange(0, 255), Math.randomRange(0, 255), Math.randomRange(0, 255)))
        }
        strip.show()
        if (cog_average > cog_average_before + increment) {
            cog_average_before = cog_average
        } else if (cog_average < cog_average_before - increment) {
            Dave_state = 2
        }
        if (cog_average > 740) {
            Dave_state = 3
        }
    } else if (Dave_state == 2) {
        angry_Dave_sound()
        Dave_state = 0
    } else if (Dave_state == 3) {
        success_sound()
        dispense_protein()
        Dave_state = 0
        strip.clear()
        strip.show()
    }
})