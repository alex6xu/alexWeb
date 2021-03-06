from flask import request, Response
from flask import Blueprint
from wechatpy import parse_message, create_reply
from wechatpy.utils import check_signature
from wechatpy.exceptions import InvalidSignatureException
from wechatpy.replies import ImageReply
import sqlite3
import json
from application.utils import logger, image_process
from application import talkbot, app, weChatClient


bp_wechat = Blueprint('weichat', __name__, url_prefix='/wechat')


def respond(data, session=None):

    resp = talkbot.respond(data, session)
    if ' ' in resp:
        resp = ''.join(resp.split(' '))
    return resp


@bp_wechat.route('/call', methods=['GET', 'POST'])
def wechat_msg():
    token = app.config.get('WX_TOKEN')
    sign = request.args.get('signature', '')
    timestamp = request.args.get('timestamp', '')
    nonce = request.args.get('nonce', '')
    echostr = request.args.get('echostr', '')

    if request.method == 'GET':
        try:
            check_signature(token, sign, timestamp, nonce)
        except InvalidSignatureException:
            logger.warning("Signature check failed.")
        return Response(echostr)

    # if request.method == "POST":

    header = {"content_type": "application/xml;charset=utf-8"}
    body = request.data
    logger.info(body)
    msg = parse_message(body)
    if not msg:
        logger.info('Empty message, ignored')
        return

    if msg.type == 'text':
        logger.info('message type text from %s', msg.source)
        response = respond(msg.content, msg.source)
        if response:
            pass
        else:
            response = '你说的我接不上啊，试着夸夸我鸭'

        reply = create_reply(response, msg, render=True)
        logger.info('Replied to %s with "%s"', msg.source, response)
        return Response(reply, content_type=header['content_type'])

    elif msg.type == 'location':
        # if options.debug:
        logger.info('message type location from %s', msg.source)

    elif msg.type == 'image':
        # if options.debug:
        logger.info('message type image from %s', msg.source)
        logger.info(msg.image)
        myimage = image_process(msg.image)
        if not myimage:
            replay = create_reply('失败', msg, render=True)
        elif myimage == "":
            replay = create_reply(myimage, msg, render=True)
        else:
            myimage_id = weChatClient.api.WeChatMaterial.add('image', myimage)
            replay = ImageReply(type='image' ,media_id =myimage_id).render()
        return Response(replay, content_type=header['content_type'])

    else:
        logger.info('message type unknown')


@bp_wechat.route('/images', methods=['GET', 'POST'])
def wechat_images(p):
    sqlite_conn = sqlite3.connect('../image.db')
    sql = 'select url from image limit 20;'
    result = sqlite_conn.execute(sql).fetchall()
    image = {
        '1': [],
        '2': [],
        '3': [],
        '4': [],
        '5': []
    }
    num, p = 1, 1

    for i in result:
        if num < 5:
            image[str(p)].append(i[0])
            num += 1
        else:
            p += 1
            image[str(p)].append(i[0])
            num = 2

    return Response(json.dumps({'images': image['1'], 'image1': image['2'], 'image2': image['3'], 'image3': image['4'], 'image4': image['5']}))


@bp_wechat.route('/images/<int:p>', methods=['GET', 'POST'])
def wechat_images_more(p):
    # import pdb; pdb.set_trace()
    sqlite_conn = sqlite3.connect('../image.db')
    sql = 'select url from image limit 20;'
    if p:
        sql += ''
    result = sqlite_conn.execute(sql).fetchall()
    image = {
        '1': [],
        '2': [],
        '3': [],
        '4': [],
        '5': []
    }
    num, p = 1, 1

    for i in result:
        if num < 5:
            image[str(p)].append(i[0])
            num += 1
        else:
            p += 1
            image[str(p)].append(i[0])
            num = 2

    return Response(json.dumps({'images': image['1'], 'image1': image['2'], 'image2': image['3'], 'image3': image['4'], 'image4': image['5']}))


@bp_wechat.route('/images/search', methods=['GET', 'POST'])
def search_images():
    pass