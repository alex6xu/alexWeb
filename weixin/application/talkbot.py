#coding=utf-8

import os
import aiml
# from flask import current_app as app

__name__ = 'talkbot'


class TalkBot(aiml.Kernel):
    def __init__(self, app):
        super(TalkBot, self).__init__()
        # self.verbose(settings.DEBUG)
        if os.path.exists(app.config.get('TALKBOT_BRAIN_PATH')):
            self.bootstrap(brainFile=app.config.get('TALKBOT_BRAIN_PATH'))
        else:
            self.init_bot(app)
            self.saveBrain(app.config.get('TALKBOT_BRAIN_PATH'))

        for p in app.config.get('TALKBOT_PROPERTIES'):
            self.setBotPredicate(p, app.config.get('TALKBOT_PROPERTIES')[p])

    def init_bot(self, app):
        for f in os.listdir(app.config.get('AIML_SET')):
            if f.endswith('.aiml'):
                self.learn(os.path.join(app.config.get('AIML_SET'), f))

