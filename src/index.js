import onMessage from './handlers/on-message.js'

function WechatyMqttPlugin() {
  return function (bot) {
    bot.on('message', onMessage)
  }
}

export { WechatyMqttPlugin }

export default WechatyMqttPlugin
