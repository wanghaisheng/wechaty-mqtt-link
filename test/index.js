import { Wechaty, ScanStatus, log } from 'wechaty'

import qrcodeTerminal from 'qrcode-terminal'

import { wechaty2chatdev } from '../src/msg-format.js'
import { ChatDevice } from '../src/chat-device.js'

const bot = new Wechaty()
const chatdev = new ChatDevice(process.env['MQTT_USERNAME'], process.env['MQTT_PASSWORD'], process.env['BOTID'])

async function onMessage(msg) {
    log.info('StarterBot', msg.toString())
    // console.debug(msg)
    let payload = await wechaty2chatdev(msg)
    chatdev.pub_event(payload)
    // console.debug(payload)
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
