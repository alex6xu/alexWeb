#!/usr/bin/env python
# encoding: utf-8

"""
@author: data

"""

import os
import socket
from datetime import timedelta

# # 网站运营配置
# from .settings import *
# from .settings.thirdapi import *

DEBUG = False

PROJECT_NAME = 'weichatserver'

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

# 获取服务器名称
HOST_NAME = socket.getfqdn(socket.gethostname())
# 获取服务器内网ip
# HOST_IP = socket.gethostbyname(HOST_NAME)


SQLALCHEMY_DATABASE_URI_MYSQL = \
    'mysql+pymysql://%s:%s@%s:%s/%s?charset=%s'

SQLALCHEMY_DATABASE_URI = SQLALCHEMY_DATABASE_URI_MYSQL
SQLALCHEMY_TRACK_MODIFICATIONS = True
SQLALCHEMY_POOL_SIZE = 5  # 默认 pool_size=5
SQLALCHEMY_POOL_TIMEOUT = 10  # 默认 10秒
SQLALCHEMY_POOL_RECYCLE = 500  # 配置要小于 数据库配置 wait_timeout
SQLALCHEMY_ECHO = False

REDIS = {
    'host': '',
    'port': 6379,
    'db': 0,
    'password': 'RnH1eVyX'
}

DB_MONGO = {
    'host': '',
    'port': 3717,
    'username': '',
    'password': '',
    'database': ''
}


MONGO_URI = ''

RABBIT_MQ = {
    'host': '',
    'user': 'xjd_data',
    'password': 'ZXAMnYmIaeOnGi6SgzBQ',
    'virtual_host': 'xjd_data',
    'exchange': 'teldetail',
    'port': 25672
}

EXCHANGE_NAME = 'data_interface'

CSRF_ENABLED = True
SECRET_KEY = '\x03\xabjR\xbbg\x82\x0b{\x96f\xca\xa8\xbdM\xb0x\xdbK%\xf2\x07\r\x8c'

# 会话配置
# PERMANENT_SESSION_LIFETIME = timedelta(minutes=20)             # 登录状态保持，默认31天
REMEMBER_COOKIE_DURATION = timedelta(days=14)  # 记住登录状态，默认365天
LOGIN_MESSAGE = u'请登录后操作'
LOGIN_MESSAGE_CATEGORY = 'warning'  # 默认'message'

# 后台登录前台配置
ADMIN_TO_USER_LOGIN_TIME_OUT = 1200
ADMIN_TO_USER_LOGIN_SIGN_KEY = ' '

# 文件上传配置
UPLOAD_FOLDER = os.path.join(BASE_DIR, 'media/uploads/')
# ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
MAX_CONTENT_LENGTH = 2.6 * 1024 * 1024  # 2.6Mb
MIN_CONTENT_LENGTH = 2.0 * 1024  # 2.0Kb

# 日志参数配置
LOG_CONFIG = {
    'version': 1,
    'formatters': {
        'detail': {
            'format': '%(asctime)s - %(pathname)s - line: %(lineno)d - %(funcName)s() - %(levelname)s - %(message)s'
        }
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'detail',
            'level': 'DEBUG'
        },
        'file_app': {
            'class': 'logging.handlers.TimedRotatingFileHandler',
            'formatter': 'detail',
            'level': 'DEBUG',
            'when': 'D',
            'filename': BASE_DIR + '/logs/app.log'
        },
        'file_db': {
            'class': 'logging.handlers.TimedRotatingFileHandler',
            'formatter': 'detail',
            'level': 'DEBUG',
            'when': 'D',
            'filename': BASE_DIR + '/logs/db.log'
        }
    },
    'loggers': {
        'app': {
            'handlers': ['console', 'file_app'],
            'level': 'DEBUG'
        },
        'db': {
            'handlers': ['file_db'],
            'level': 'DEBUG'
        }
    }
}
