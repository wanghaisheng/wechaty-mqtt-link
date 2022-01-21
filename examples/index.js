import { Wechaty, ScanStatus, log } from 'wechaty'

import qrcodeTerminal from 'qrcode-terminal'

import { ChatDevice } from 'wechaty-mqtt-link'

const bot = new Wechaty()
const chatdev = new ChatDevice(process.env['MQTT_USERNAME'], process.env['MQTT_PASSWORD'], process.env['BOTID'])

async function onMessage(msg) {
    log.info('StarterBot', msg.toString())
    // console.debug(msg)
    chatdev.pub_message(msg)
    if (msg.text() == 'ding') {
        msg.say('dong')
    }
}

bot
    .on('login', (user) => {
        console.log(`User ${user} logined`)
        chatdev.init(bot)
    })
    .on('message', onMessage)
    .start()
    .catch((e) => console.error(e))
