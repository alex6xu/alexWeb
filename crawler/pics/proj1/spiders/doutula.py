# -*- coding: utf-8 -*-
import scrapy
from bs4 import BeautifulSoup
# import js2xml
# from lxml import etree


class Doutula(scrapy.Spider):
    name = 'doutula'
    details = []
    base_url = 'http://www.doutula.com/'

    url = 'http://www.doutula.com/index.php'

    def start_requests(self):
        yield scrapy.Request(url=self.url, callback=self.parse, method='GET', headers=self.headers, dont_filter=True)

    def parse(self, response):
        soup = BeautifulSoup(response.body, 'lxml', from_encoding='utf-8')
        content = soup.find_all('a', attrs={'class': 'col-xs-6 col-sm-3'})

        if content is not None:
            for ct in content:
                image = ct.find('img', attrs={"referrerpolicy": "no-referrer"})
                image_url = image.src
                print(image_url)
