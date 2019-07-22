#coding=utf-8

import os
import aiml
from flask import current_app as app

__name__ = 'talkbot'
conf = app.conf


class TalkBot(aiml.Kernel):
    def __init__(self):
        super(TalkBot, self).__init__()
        # self.verbose(settings.DEBUG)
        if os.path.exists(app.config.get('TALKBOT_BRAIN_PATH')):
            self.bootstrap(brainFile=app.config.get('TALKBOT_BRAIN_PATH'))
        else:
            self.init_bot()
            self.saveBrain(app.config.get('TALKBOT_BRAIN_PATH'))

        for p in app.config.get('TALKBOT_PROPERTIES'):
            self.setBotPredicate(p, app.config.get('TALKBOT_PROPERTIES')[p])

    def init_bot(self):
        for f in os.listdir(app.config.get('AIML_SET')):
            if f.endswith('.aiml'):
                self.learn(os.path.join(app.config.get('AIML_SET'), f))


talkbot = TalkBot()


def test(data, msg=None, bot=None):
    return True


def respond(data, session=None):

    resp = talkbot.respond(data, session)
    if ' ' in resp:
        resp = ''.join(resp.split(' '))
    return resp


if __name__ == '__main__':
    print(respond("你好"))
