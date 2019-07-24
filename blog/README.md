##部署

pip install -r requirements/common.txt

数据库默认sqlite
python manage.py db init
python manage.py deploy product

启动：
gunicorn manage:app

如有疑问在；
https://blog.51cto.com/xpleaf/1748629