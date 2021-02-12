// check if any buttons have been pressed 
// if so set the array and return true if it is a change
// this should cause any parent function to drop out
function checkButtons () {
    let ret = false;
    if (!(pins.digitalReadPin(pinBigButton))) {
        if(!currentButtons[0]){
            ret = true;
        }
        currentButtons[0] = true
        
            
    } else {
        currentButtons[0] = false
    }
    if (!(pins.digitalReadPin(pinLeftArmPit))) {
        if(!currentButtons[1]){
            ret=true;
        }
        currentButtons[1] = true

    } else {
        currentButtons[1] = false
    }
    if (!(pins.digitalReadPin(pinRightArmPit))) {
         if(!currentButtons[2]){
            ret=true;
        }       
        currentButtons[2] = true
        
    } else {
        currentButtons[2] = false
    }
    
    return ret;
}
function doRightArmpit () {

   // control.waitMicros(1000000)
    // if(waitForInput(1000000)){return true;}
    redArmpitButtonSound()
    if (control.waitMicros(1000)) {
        return true
    }
    return false
}
function Glissanto (note1: number, note2: number, rate: number) {
    if (note1 < note2) {
        i = note1
        while (i < note2) {
            music.ringTone(i)
            if (waitForInput(rate)) {
                return true
            }
            i += 2
        }
    } else {
        i = note1
        while (i > note2) {
            music.ringTone(i)
            if (waitForInput(rate)) {
                return true
            }
            i += -2
        }
    }
    music.rest(0)
    return false
}
function dispense_protein () {
    which_protein = Math.randomRange(0, num_doors - 1)
    strip.setPixelColor(door_offset+which_protein, neopixel.rgb(Math.randomRange(0, 255), Math.randomRange(0, 255), Math.randomRange(0, 255)))
    strip.setPixelColor(door_offset+Math.abs((which_protein - 1) % num_doors), neopixel.rgb(Math.randomRange(0, 255), Math.randomRange(0, 255), Math.randomRange(0, 255)))
    strip.show()
    for (let index4 = 0; index4 <= 9 * num_doors - 1; index4++) {
        strip.rotate(1)
        strip.show()
        music.ringTone(index4 * index4)
        if (waitForInput(index4 * 7000)) {
            return true
        }
    }
    strip.clear()
    strip.show()
    strip.setPixelColor(door_offset+which_protein, neopixel.colors(NeoPixelColors.Green))
    strip.show()
    success_sound()
    if (waitForInput(6000000)) {
        return true
    }
    strip_rna_clear()
    strip.show()
    if (waitForInput(2000000)) {
        return true
    }
    strip_rna_clear()
    strip.show()
    music.stopAllSounds();
    return false
}
function angry_Dave_sound () {
    for (let index3 = 0; index3 <= 4; index3++) {
        for (let index23 = 0; index23 <= 1000; index23++) {
            music.ringTone(1000 - index23)
            if (waitForInput(300)) {
                return true
            }
        }
    }
   // music.rest(music.beat(BeatFraction.Whole))
    music.stopAllSounds();

    //music.stopMelody(MelodyStopOptions.All)
    return false
}
function strip_doors_clear () {
    for (let j = door_offset; j <= door_offset+num_doors; j++) {
        strip.setPixelColor(door_offset+j, neopixel.rgb(0,0,0))
    }
    strip.show()
}
// alternative to wait micros, checks for button press during wait
// returns true if it has been interupted
function waitForInput (waitTime: number) {
    startTime = input.runningTimeMicros()
    while (startTime + waitTime > input.runningTimeMicros()) {
        if (checkButtons()) {
            return true
        }
    }
    return false
}
function Tremolo (note: number, length: number, rate: number) {
    note_duration = length / rate
    pauseBetweenNotes = rate * (1 + rate / length)
    for (let index = 0; index <= rate; index++) {
        music.playTone(note, note_duration)
        music.rest(pauseBetweenNotes)
    }
    music.rest(0)
    return false
}
function doBigButton () {
 
    pins.digitalWritePin(pin_motors,1)
    pins.digitalWritePin(pin_buttonLED,0)
   
    if (waitForInput(5000000)) {
        pins.digitalWritePin(pin_motors,0)
        pins.digitalWritePin(pin_buttonLED,1);
        return true
    }
    for(i==0;i<20;i++){
        if(v==0){
            v=1
        }else{
            v=0
        }
        pins.digitalWritePin(pin_buttonLED,v)
        if(waitForInput(200000)){
            pins.digitalWritePin(pin_motors,0);
            pins.digitalWritePin(pin_buttonLED,1);
            return true;
        }
    }
    pins.digitalWritePin(pin_buttonLED,1);
    pins.digitalWritePin(pin_motors,0);
    return false
}
function doLeftArmpit () {
    greenArmpitButtonSound()
    if (waitForInput(1000)) {
        return true
    }
    return false
}
function redArmpitButtonSound () {
    rand = Math.randomRange(1, 4)
    if (rand == 1) {
        if (Glissanto(784, 392, 0)) {
            return true
        }
        if (Glissanto(392, 784, 0)) {
            return true
        }
        if (waitForInput(100000)) {
            return true
        }
        if (Glissanto(784, 392, 0)) {
            return true
        }
        if (Glissanto(392, 784, 0)) {
            return true
        }
    }
    if (rand == 2) {
        if (Glissanto(1400, 1000, 0)) {
            return true
        }
        if (Glissanto(1200, 800, 0)) {
            return true
        }
        if (Glissanto(1000, 6000, 0)) {
            return true
        }
        if (waitForInput(300000)) {
            return true
        }
        if (Tremolo(440, 30, 3)) {
            return true
        }
        if (waitForInput(100000)) {
            return true
        }
        if (Tremolo(659, 30, 12)) {
            return true
        }
    }
    if (rand > 2) {
        if (Glissanto(784, 392, 0)) {
            return true
        }
        if (waitForInput(300000)) {
            return true
        }
        if (Glissanto(784, 392, 0)) {
            return true
        }
        if (Glissanto(784, 196, 0)) {
            return true
        }
    }
    music.stopAllSounds();
    return false
}
function greenArmpitButtonSound () {
    rand = Math.randomRange(1, 5)
    if (rand == 1) {
        if (Glissanto(784, 392, 0)) {
            return true
        }
        if (waitForInput(300000)) {
            return true
        }
        if (Glissanto(880, 220, 0)) {
            return true
        }
        if (waitForInput(100000)) {
            return true
        }
        if (Tremolo(175, 30, 3)) {
            return true
        }
        if (waitForInput(100000)) {
            return true
        }
        if (Tremolo(131, 30, 3)) {
            return true
        }
        if (waitForInput(100000)) {
            return true
        }
        if (Glissanto(131, 523, 0)) {
            return true
        }
        if (Glissanto(988, 392, 0)) {
            return true
        }
    }
    if (rand == 2) {
        if (Glissanto(500, 2000, 0)) {
            return true
        }
        if (waitForInput(500000)) {
            return true
        }
        if (Tremolo(800, 30, 3)) {
            return true
        }
        if (waitForInput(100000)) {
            return true
        }
        if (Tremolo(600, 30, 3)) {
            return true
        }
        if (waitForInput(100000)) {
            return true
        }
        if (Glissanto(300, 1700, 0)) {
            return true
        }
        if (Glissanto(600, 3000, 0)) {
            return true
        }
    }
    if (rand == 3) {
        if (Glissanto(6000, 200, 0)) {
            return true
        }
        if (waitForInput(500000)) {
            return true
        }
        if (Tremolo(1000, 30, 3)) {
            return true
        }
        if (waitForInput(100000)) {
            return true
        }
        if (Tremolo(600, 30, 3)) {
            return true
        }
        if (waitForInput(100000)) {
            return true
        }
        if (Tremolo(800, 30, 3)) {
            return true
        }
        if (waitForInput(100000)) {
            return true
        }
        if (Tremolo(400, 30, 3)) {
            return true
        }
    }
    if (rand == 4) {
        if (Glissanto(6000, 5500, 100)) {
            return true
        }
        if (waitForInput(100000)) {
            return true
        }
        if (Glissanto(6000, 5500, 100)) {
            return true
        }
        if (waitForInput(300000)) {
            return true
        }
        if (Glissanto(6000, 5500, 100)) {
            return true
        }
        if (waitForInput(100000)) {
            return true
        }
        if (Tremolo(1000, 30, 3)) {
            return true
        }
        if (waitForInput(10000)) {
            return true
        }
        if (Tremolo(600, 30, 3)) {
            return true
        }
        if (waitForInput(10000)) {
            return true
        }
        if (Tremolo(800, 30, 3)) {
            return true
        }
        if (waitForInput(10000)) {
            return true
        }
        if (Tremolo(400, 30, 3)) {
            return true
        }
    }
    if (rand == 5) {
        if (Glissanto(294, 2000, 0)) {
            return true
        }
        if (waitForInput(500000)) {
            return true
        }
        if (Tremolo(1760, 30, 3)) {
            return true
        }
        if (waitForInput(100000)) {
            return true
        }
        if (Tremolo(1396, 30, 3)) {
            return true
        }
        if (waitForInput(100000)) {
            return true
        }
        if (Glissanto(5000, 2500, 0)) {
            return true
        }
        if (Glissanto(5000, 2500, 0)) {
            return true
        }
    }
    music.stopAllSounds();

    return false
}
function success_sound () {
    for (let index2 = 0; index2 <= Math.randomRange(1, 6); index2++) {
        for (let index22 = 0; index22 <= 1000; index22++) {
            music.ringTone(1000 + index22)
            if (waitForInput(300)) {
                return true
            }
        }
    }
    music.rest(music.beat(BeatFraction.Whole))
    music.stopAllSounds();
    return false
}
function strip_rna_clear () {
    for(let k=0; k<num_rna;k++){
        strip.setPixelColor(k, (0,0,0))    
    }
}
/**
 * let strip2: neopixel.Strip = null
 */
let which_LED = 0
let cog_average_before = 0
let cog_average = 0
let Dave_state = 8
let cog_voltage = 0
let rand = 0
let pauseBetweenNotes = 0
let note_duration = 0
let startTime = 0
let which_protein = 0
let currentButtons: boolean[] = []
let num_doors = 0
let strip: neopixel.Strip = null
let i = 0
let v=0
let pin_ledRNA = DigitalPin.P1
let pin_motors = DigitalPin.P12
let pin_buttonLED = DigitalPin.P8
num_doors = 6
let num_rna = 10
let RNA_led_offset = 0
let door_offset= num_rna
pins.setPull(DigitalPin.P2, PinPullMode.PullUp)
pins.setPull(DigitalPin.P5, PinPullMode.PullUp)
pins.setPull(DigitalPin.P11, PinPullMode.PullUp)
strip = neopixel.create(pin_ledRNA, num_doors+num_rna, NeoPixelMode.RGB)
strip.clear();
strip.show();
// strip2 = neopixel.create(pin_ledDoors, 6, NeoPixelMode.RGB)
let increment = 20
let dispensed_protein = 1
currentButtons = [false, false, false]
let pinBigButton = DigitalPin.P5;
let pinLeftArmPit = DigitalPin.P2;
let pinRightArmPit = DigitalPin.P11;
serial.writeLine("Started")

let cog_minimum = 0;
let maxPotValue = 875;
let minPotValue = 345;
let maxValue = 400;

basic.forever(function () {
    cog_voltage = maxPotValue - pins.analogReadPin(AnalogPin.P4)
    waitForInput(1000)
    serial.writeNumber(cog_voltage);
    serial.writeString(" min")
    if(cog_voltage < cog_minimum){
        cog_minimum = cog_voltage;
    }
    serial.writeNumber(cog_minimum);
    serial.writeString(" stat");
  //  basic.showNumber(Dave_state);
    if (Dave_state == 0) {
        strip_doors_clear()
        strip.show()
        cog_average = 0
        pins.digitalWritePin(DigitalPin.P2, 1)
        if (cog_voltage < cog_minimum+20) {
            pins.digitalWritePin(DigitalPin.P2, 0)
            strip.clear()
            // strip2.clear()
            strip.show()
            // strip2.show()
            Dave_state = 1
            cog_average_before = -100
        }
    } else if (Dave_state == 1) {
        cog_average += 0.7 * (cog_voltage - cog_average) 
            serial.writeNumber(cog_average);

        which_LED = Math.round(Math.map(cog_average-cog_minimum, 0, 1023, 0, strip.length() + 2))
        for (let index5 = 0; index5 <= which_LED; index5++) {
            strip.setPixelColor(index5, neopixel.rgb(Math.randomRange(0, 255), Math.randomRange(0, 255), Math.randomRange(0, 255)))
        }
        strip.show()
        if (cog_average > cog_average_before + increment) {
            cog_average_before = cog_average
        } else if (cog_average < cog_average_before - increment) {
            Dave_state = 2
        }
        if (cog_average > maxValue - 20){//740) {
            Dave_state = 3
        }
        if(cog_average>cog_average_before){
            cog_average_before = cog_average;
        }
        if(cog_average>maxValue){
            maxValue = cog_average;
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
    if (currentButtons[0]) {
        Dave_state=0
        serial.writeLine("big button")
        doBigButton()
    } else if (currentButtons[1]) {
        serial.writeLine("left button")
        doLeftArmpit()
    } else if (currentButtons[2]) {
        serial.writeLine("right button")
        doRightArmpit()
    }
    serial.writeNumber(Dave_state);
    serial.writeString(".\n\r")
})
