import sqlite3

sqlite_conn = sqlite3.connect('../../image.db')

try:
    sqlite_conn.execute('''create table if not exists image(
      ID INTEGER PRIMARY KEY AUTOINCREMENT,
      url text,
      title text,
      desd text
    )
    ''')
    sqlite_conn.commit()

except Exception as e:
    print(e)


def get_conn():
    return sqlite_conn


def commit():
    sqlite_conn.commit()


def close():
    sqlite_conn.close()
