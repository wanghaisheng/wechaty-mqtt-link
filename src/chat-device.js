import mqtt from 'mqtt'
import { v4 } from 'uuid'
import { FileBox } from 'file-box'

class ChatDevice {
    constructor(username, password, botId, message, bot) {
        this.mqttclient = mqtt.connect(`mqtt://chatbot.iot.gz.baidubce.com:443`, {
            username: username,
            password: password,
            clientId: botId
        })
        this.isConnected = ''
        this.propertyApi = `$iot/${botId}/events`
        this.eventApi = `$iot/${botId}/events`
        this.commandApi = `$iot/${botId}/msg`
    }

    async init() {
        let that = this
        this.mqttclient.on('connect', function () {
            this.isConnected = true
            console.debug('connect to Wechaty mqtt----------')
        })
        this.mqttclient.on('reconnect', function (e) {
            console.log('subscriber on reconnect')
        })
        this.mqttclient.on('disconnect', function (e) {
            console.log('disconnect--------', e)
            this.isConnected = false
        })
        this.mqttclient.on('error', function (e) {
            console.debug('error----------', e)
        })
        this.mqttclient.on('message', async function (topic, message) {
            // const content = JSON.parse(message.toString())
            let content = MessageMessage.decode(message);
            console.debug(content)
            content.params = JSON.parse(content.params)
            content.timestamp = Number(content.timestamp)
            console.debug(content)
            const name = content.name
            const params = content.params

            if (name == 'start') {

            }
            if (name == 'stop') {

            }
            if (name == 'logout') {

            }
            if (name == 'logonoff') {

            }
            if (name == 'userSelf') {

            }
            if (name == 'say') {

            }
            if (name == 'send') {
                that.send(params)
            }
            if (name == 'sendAt') {
                that.sendAt(params)
            }

            if (name == 'aliasGet') {

            }
            if (name == 'aliasSet') {

            }
            if (name == 'roomCreate') {

            }
            if (name == 'roomAdd') {

            }
            if (name == 'roomDel') {

            }
            if (name == 'roomAnnounceGet') {

            }
            if (name == 'roomAnnounceSet') {

            }
            if (name == 'roomQuit') {

            }
            if (name == 'roomTopicGet') {

            }
            if (name == 'roomTopicSet') {

            }
            if (name == 'roomQrcodeGet') {

            }
            if (name == 'memberAllGet') {

            }
            if (name == 'contactAdd') {

            }
            if (name == 'contactAliasSet') {

            }
            if (name == 'contactFindAll') {

            }
            if (name == 'contactFind') {

            }
            if (name == 'config') {

            }

        })
    }

    sub_command() {
        this.mqttclient.subscribe(this.commandApi, function (err) {
            if (err) {
                console.log(err)
            }
        })
    }

    pub_property(msg) {
        this.mqttclient.publish(this.propertyApi, msg);
    }

    pub_event(msg) {
        this.mqttclient.publish(this.eventApi, msg);
    }

    async send(params) {
        console.debug(typeof (params))
        console.debug(params)

        let msg = ''
        if (params.messageType == 'Text') {
            /* {
          "reqId":"442c1da4-9d3a-4f9b-a6e9-bfe858e4ac43",
          "method":"thing.command.invoke",
          "version":"1.0",
          "timestamp":1610430718000,
          "name":"send",
          "params":{
              "toContacts":[
                  "tyutluyc",
                  "5550027590@chatroom"
              ],
              "messageType":"Text",
              "messagePayload":"welcome to wechaty!"
          }
        } */
            msg = params.messagePayload

        } else if (params.messageType == 'Contact') {
            /* {
              "reqId":"442c1da4-9d3a-4f9b-a6e9-bfe858e4ac43",
              "method":"thing.command.invoke",
              "version":"1.0",
              "timestamp":1610430718000,
              "name":"send",
              "params":{
                  "toContacts":[
                      "tyutluyc",
                      "5550027590@chatroom"
                  ],
                  "messageType":"Contact",
                  "messagePayload":"tyutluyc"
              }
          } */
            const contactCard = await this.bot.Contact.find({ id: params.messagePayload })
            if (!contactCard) {
                console.log('not found')
                return {
                    msg: '无此联系人'
                }
            } else {
                msg = contactCard
            }

        } else if (params.messageType == 'Attachment') {
            /* {
            "reqId":"442c1da4-9d3a-4f9b-a6e9-bfe858e4ac43",
            "method":"thing.command.invoke",
            "version":"1.0",
            "timestamp":1610430718000,
            "name":"send",
            "params":{
                "toContacts":[
                    "tyutluyc",
                    "5550027590@chatroom"
                ],
                "messageType":"Attachment",
                "messagePayload":"/tmp/text.txt"
            }
        } */
            if (params.messagePayload.indexOf('http') != -1 || params.messagePayload.indexOf('https') != -1) {
                msg = FileBox.fromUrl(params.messagePayload)
            } else {
                msg = FileBox.fromFile(params.messagePayload)
            }


        } else if (params.messageType == 'Image') {
            /* {
            "reqId":"442c1da4-9d3a-4f9b-a6e9-bfe858e4ac43",
            "method":"thing.command.invoke",
            "version":"1.0",
            "timestamp":1610430718000,
            "name":"send",
            "params":{
                "toContacts":[
                    "tyutluyc",
                    "5550027590@chatroom"
                ],
                "messageType":"Image",
                "messagePayload":"https://wechaty.github.io/wechaty/images/bot-qr-code.png"
            }
        } */
            // msg = FileBox.fromUrl(params.messagePayload)
            if (params.messagePayload.indexOf('http') != -1 || params.messagePayload.indexOf('https') != -1) {
                msg = FileBox.fromUrl(params.messagePayload)
            } else {
                msg = FileBox.fromFile(params.messagePayload)
            }

        } else if (params.messageType == 'Url') {
            /* {
            "reqId":"442c1da4-9d3a-4f9b-a6e9-bfe858e4ac43",
            "method":"thing.command.invoke",
            "version":"1.0",
            "timestamp":1610430718000,
            "name":"send",
            "params":{
                "toContacts":[
                    "tyutluyc",
                    "5550027590@chatroom"
                ],
                "messageType":"Url",
                "messagePayload":{
                    "description":"WeChat Bot SDK for Individual Account, Powered by TypeScript, Docker, and Love",
                    "thumbnailUrl":"https://avatars0.githubusercontent.com/u/25162437?s=200&v=4",
                    "title":"Welcome to Wechaty",
                    "url":"https://github.com/wechaty/wechaty"
                }
            }
        } */
            msg = new UrlLink(params.messagePayload)

        } else if (params.messageType == 'MiniProgram') {
            /* {
            "reqId":"442c1da4-9d3a-4f9b-a6e9-bfe858e4ac43",
            "method":"thing.command.invoke",
            "version":"1.0",
            "timestamp":1610430718000,
            "name":"send",
            "params":{
                "toContacts":[
                    "tyutluyc",
                    "5550027590@chatroom"
                ],
                "messageType":"MiniProgram",
                "messagePayload":{
                    "appid":"wx36027ed8c62f675e",
                    "description":"群组大师群管理工具",
                    "title":"群组大师",
                    "pagePath":"pages/start/relatedlist/index.html",
                    "thumbKey":"",
                    "thumbUrl":"http://mmbiz.qpic.cn/mmbiz_jpg/mLJaHznUd7O4HCW51IPGVarcVwAAAuofgAibUYIct2DBPERYIlibbuwthASJHPBfT9jpSJX4wfhGEBnqDvFHHQww/0",
                    "username":"gh_6c52e2baeb2d@app"
                }
            }
        } */
            msg = new MiniProgram(params.messagePayload)

        } else {
            return {
                msg: '不支持的消息类型'
            }
        }

        const toContacts = params.toContacts

        for (let i = 0; i < toContacts.length; i++) {
            if (toContacts[i].split('@').length == 2) {
                console.debug(`向群${toContacts[i]}发消息`)
                let room = await this.bot.Room.find({ id: toContacts[i] })
                if (room) {
                    try {
                        await room.say(msg)
                    } catch (err) {
                        console.error(err)
                    }
                }
            } else {
                console.debug(`好友${toContacts[i]}发消息`)
                let contact = await this.bot.Contact.find({ id: toContacts[i] })
                if (contact) {
                    try {
                        await contact.say(msg)
                    } catch (err) {
                        console.error(err)
                    }
                }
            }
        }

    }

    async sendAt(params) {
        let atUserIdList = params.toContacts
        let room = await this.bot.Room.find({ id: params.room })
        const atUserList = [];
        for (const userId of atUserIdList) {
            const cur_contact = await this.bot.Contact.load(userId);
            atUserList.push(cur_contact);
        }
        await room.say(params.messagePayload, ...atUserList)
    }

}

export { ChatDevice }
export default ChatDevice