#!/usr/bin/env python
# encoding: utf-8

"""
@author: data

"""

import os
import socket
from datetime import timedelta
import logging

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


CSRF_ENABLED = True

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
        }
    },
    'loggers': {
        'app': {
            'handlers': ['console'],
            'level': 'DEBUG'
        }
    }
}


#weixin
WX_APPID = 'wxd1d8bc45f048100c'
WX_APPKEY =  os.getenv("wx_appkey")
WX_TOKEN = "wxtoken"
USER_NAME = "Alex"
# SIMSIMI_KEY =  os.getenv("SIMSIMS_KEY")
TALKBOT_PROPERTIES = {'name': USER_NAME,
                      "master": USER_NAME,
                      'birthday': '',
                      'gender': '直男',
                      'city': '上海',
                      'os': 'OS X'}
TALKBOT_BRAIN_PATH = os.path.join(BASE_DIR, 'brain.txt')
AIML_SET = os.path.join(BASE_DIR, 'aiml_set')
