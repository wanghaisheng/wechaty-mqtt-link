import { Wechaty, ScanStatus, log } from 'wechaty'

import qrcodeTerminal from 'qrcode-terminal'

import { wechaty2chatdev } from '../src/msg-format.js'

const bot = new Wechaty()

async function onMessage(msg) {
    log.info('StarterBot', msg.toString())
    // console.debug(msg)
    let payload = wechaty2chatdev(msg)
    console.debug(payload)
    if (msg.text() == 'ding') {
        msg.say('dong')
    }
}

bot
    .on('message', onMessage)

bot.start().catch((e) => console.error(e))
