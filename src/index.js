import ChatDevice from './chat-device.js'

import onMessage from './handlers/on-message.js'



function WechatyMQTTPlugin() {

    return function (bot) {
        bot.on('message', onMessage)
    }
}

export { ChatDevice, WechatyMQTTPlugin }

export default ChatDevice