input.onButtonPressed(Button.A, function () {
    servos.P2.setAngle(90)
    servoangle = 90
    OLED.drawLoading(Math.map(servoangle, 90, 175, 0, 100))
})
input.onButtonPressed(Button.B, function () {
    servos.P2.setAngle(180)
    servoangle = 180
    OLED.drawLoading(Math.map(servoangle, 90, 175, 0, 100))
})
let servoangle = 0
music.setVolume(51)
OLED.init(128, 64)
servos.P2.setAngle(90)
servoangle = 90
tinkercademy.crashSensorSetup(DigitalPin.P16)
OLED.drawLoading(Math.map(servoangle, 90, 175, 0, 100))
basic.forever(function () {
    if (tinkercademy.PIR(DigitalPin.P13)) {
        servos.P2.setAngle(90)
        OLED.writeStringNewLine("Opening")
        basic.pause(1000)
        OLED.clear()
        basic.showIcon(IconNames.Yes)
        OLED.writeStringNewLine("Enter")
        basic.pause(1000)
        OLED.clear()
        OLED.writeStringNewLine("Closing")
        basic.showIcon(IconNames.No)
        while (!(tinkercademy.crashSensor()) && servoangle < 175) {
            music.playTone(262, music.beat(BeatFraction.Whole))
            servoangle += 5
            servos.P2.setAngle(Math.constrain(servoangle, 90, 175))
            basic.pause(150)
            OLED.drawLoading(Math.map(servoangle, 90, 175, 0, 100))
        }
    }
})
