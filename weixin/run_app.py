from application import app
import os

host = os.environ.get('APP_HOST', '0.0.0.0')
port = os.environ.get('APP_PORT', 8100)


if __name__ == '__main__':
    app.run(host = host, port = port)
