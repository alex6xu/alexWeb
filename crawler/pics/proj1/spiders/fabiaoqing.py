import scrapy
from bs4 import BeautifulSoup
# import js2xml
# from lxml import etree
from proj1 import get_conn, commit, close


class Doutula(scrapy.Spider):
    name = 'doutula'
    details = []
    base_url = 'http://www.fabiaoqing.com/'

    url = 'http://www.fabiaoqing.com/index.php'
    headers = {'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
               'Accept-Encoding': 'gzip, deflate, br',
               'Accept-Language': 'zh-CN,zh;q=0.9',
               'pragma': 'no-cache',
               'Connection': 'keep-alive',
               'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36'
               }

    conn = get_conn()

    def start_requests(self):
        yield scrapy.Request(url=self.url, callback=self.parse, method='GET', headers=self.headers, dont_filter=True)
