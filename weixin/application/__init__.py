from flask import Flask
# from .middlewares import HTTPMethodOverrideMiddleware
from logging.config import dictConfig


app = Flask(__name__)
# app.wsgi_app = HTTPMethodOverrideMiddleware(app.wsgi_app)
app.config.from_object('conf')

# 配置日志
dictConfig(app.config['LOG_CONFIG'])

#libs

from .talkbot import TalkBot
talkbot = TalkBot(app)

from wechatpy import WeChatClient
weChatClient = WeChatClient(app.config.get('WX_APPID'), app.config.get('WX_APPKEY'))

# blueprint
from .views import bp_wechat
app.register_blueprint(bp_wechat)
