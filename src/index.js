import onMessage from './handlers/on-message.js'
import onLogin from './handlers/on-login.js'

function WechatyMqttPlugin() {
  return function (bot) {
    bot.on('message', onMessage)
    bot.on('login', onLogin)
  }
}

export { WechatyMqttPlugin }

export default WechatyMqttPlugin
