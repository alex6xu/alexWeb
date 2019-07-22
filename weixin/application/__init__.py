from flask import Flask
# from .middlewares import HTTPMethodOverrideMiddleware
from logging.config import dictConfig
from .views import bp_wechat

app = Flask(__name__)
# app.wsgi_app = HTTPMethodOverrideMiddleware(app.wsgi_app)
app.config.from_object('config')

# 配置日志
dictConfig(app.config['LOG_CONFIG'])

app.register_blueprint(bp_wechat)
