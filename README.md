## 简介

wechaty+vika+mqtt聊天机器人无服务架构方案

wechaty <= v0.6.9

本地或云服务器运行wechaty client=》使用百度云物联网核心套件中MQTT+规则引擎实现微信消息转发函数计算 =》百度云或腾讯云函数计算实现业务逻辑 =》vika维格表作为数据库读写数据
