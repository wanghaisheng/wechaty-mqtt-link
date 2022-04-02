## 简介

wechaty-mqtt-link是一个基于wechaty+mqtt的聊天机器人客户端，可以使用mqtt与云端保持连接，向部署在异构环境的业务应用同步聊天消息及接受远程控制。

配合聊天机器人控制器使用 https://github.com/atorber/easy-chatbot-controller

wechaty <= v0.6.9

## 实现架构

本地或云服务器运行wechaty client=》使用百度云物联网核心套件中MQTT+规则引擎实现微信消息转发函数计算 =》百度云或腾讯云函数计算实现业务逻辑

![image](https://user-images.githubusercontent.com/19552906/161385026-0c6c4de6-f2fd-45d6-9994-827579d0a561.png)

## 示例

```
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
```

## 功能支持

### 接收消息

- 文本
- 图片
- 文件
- 视频
- 动图
- 联系人
- 小程序卡片

### 发布消息

- 单发消息
- 群内@某人
- 创建群
- 请求全部联系人列表
- 请求全部群列表
