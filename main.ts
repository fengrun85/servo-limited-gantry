input.onButtonPressed(Button.A, function () {
    servos.P2.setAngle(90)
    servoangle = 90
    OLED.drawLoading(Math.map(servoangle, 90, 175, 0, 100))
})
function UpdateTS () {
    ESP8266ThingSpeak.connectThingSpeak(
    "api.thingspeak.com",
    "your_write_api_key",
    NumberOfPeople,
    0,
    0,
    0,
    0,
    0,
    0,
    0
    )
}
let NumberOfPeople = 0
let servoangle = 0
music.setVolume(51)
OLED.init(128, 64)
servoangle = 90
NumberOfPeople = 0
let MaxPplAllowed = 5
servos.P2.setAngle(servoangle)
tinkercademy.crashSensorSetup(DigitalPin.P13)
ESP8266ThingSpeak.connectWifi(
SerialPin.P8,
SerialPin.P12,
BaudRate.BaudRate115200,
"yourSSID",
"yourPW"
)
basic.pause(5000)
basic.forever(function () {
    OLED.writeStringNewLine("Capacity : " + NumberOfPeople + "/" + MaxPplAllowed)
    basic.pause(1000)
    OLED.clear()
    if (tinkercademy.PIR(DigitalPin.P6) && NumberOfPeople < MaxPplAllowed) {
        NumberOfPeople += 1
        servoangle = 90
        servos.P2.setAngle(servoangle)
        OLED.writeStringNewLine("Opening")
        basic.pause(1000)
        OLED.clear()
        OLED.writeStringNewLine("Enter")
        basic.pause(1000)
        OLED.clear()
        OLED.writeStringNewLine("Closing")
        // Closes the gantry slowly.
        while (!(tinkercademy.crashSensor()) && servoangle < 175) {
            servoangle += 5
            servos.P2.setAngle(Math.constrain(servoangle, 90, 175))
            basic.pause(150)
            OLED.drawLoading(Math.map(servoangle, 90, 175, 0, 100))
        }
        UpdateTS()
    } else if (tinkercademy.PIR(DigitalPin.P6) && NumberOfPeople == MaxPplAllowed) {
        OLED.writeStringNewLine("Full : " + NumberOfPeople + "/" + MaxPplAllowed)
        music.playTone(262, music.beat(BeatFraction.Whole))
        basic.pause(1000)
        OLED.clear()
    }
})
