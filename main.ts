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
        while (!(tinkercademy.crashSensor()) && servoangle < 175) {
            servoangle += 5
            servos.P2.setAngle(Math.constrain(servoangle, 90, 175))
            basic.pause(100)
            OLED.drawLoading(Math.map(servoangle, 90, 175, 0, 100))
        }
    }
})
