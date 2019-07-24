# coding: utf-8
from flask import render_template, redirect, request, url_for, flash
from flask.ext.login import login_user, login_required, logout_user
from . import auth
from ..models import User
from .forms import LoginForm
from .utils import WxAuthToken
from flask import current_app

appid = 'wxd1d8bc45f048100c'

@auth.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user is not None and user.verify_password(form.password.data):
            login_user(user)
            flash(u'登陆成功！欢迎回来，%s!' % user.username, 'success')
            return redirect(request.args.get('next') or url_for('main.index'))
        else:
            flash(u'登陆失败！用户名或密码错误，请重新登陆。', 'danger')
    if form.errors:
        flash(u'登陆失败，请尝试重新登陆.', 'danger')

    return render_template('auth/login.html', form=form)


@auth.route('/logout')
@login_required
def logout():
    logout_user()
    flash(u'您已退出登陆。', 'success')
    return redirect(url_for('main.index'))


@auth.route('/notify', methods=['GET', 'POST'])
def notify():
    appkey = current_app.config.get('APPKEY')
    auth_client = WxAuthToken(appid, appkey)
    acode = request.args.get('code')
    print('acode', acode)
    token, openid = auth_client.get_access_token(acode)
    print('token', token)
    print('openid', openid)
    if token:
        user = User(openid=openid, access_token=token)
        login(request, user)
        if request.args.get('state') == "8":
            userinfo = auth_client.get_userinfo()
            # print(userinfo)
            ctx = {'username': userinfo.get('openid')}
        else:
            ctx = {'username': 'test'}
        flash('登陆成功')
        return redirect(url_for('main.index'), **ctx)
    else:
        form = LoginForm()
        flash(u'登陆失败！用户名或密码错误，请重新登陆。', 'danger')
        return render_template(
            'auth/login.html', form=form
        )
