
from subprocess import call
from unicodedata import category
from urllib.parse import urlencode,quote
from bs4 import BeautifulSoup
from numpy import product
import scrapy
import json
from scrapy.crawler import CrawlerProcess

import re
import datetime

class WebSpider(scrapy.Spider):
    name = 'bikramspider'
    filename = "bikram.csv"
    custom_settings = {
        'FEED_FORMAT': 'csv',
        'FEED_URI': filename,
        'FEED_OVERWRITE':True,
        'CONCURRENT_REQUESTS': 1,  #set as needed
        "DOWNLOAD_DELAY":5,
        "AUTOTHROTTLE_ENABLED": True, # Recommended seting to avoid being flagged by the target site
        #'LOG_FILE': "bikram.txt",  # comment to reduce terminal clutter when running , log file created may take up a lot of space
        "URLLENGTH_LIMIT":999999,
        "RETRY_HTTP_CODES":[302],
        "RETRY_TIMES": 9999,
        "REDIRECT_ENABLED":False,
    }
    start_url = "https://apiappv2.arboxapp.com/api/v2/site/schedule/betweenDates"
    
    # Get the current date 
    today = datetime.date.today() 

     # Get the first day of the week (Monday)
    first_day = today - datetime.timedelta(days=today.weekday())

    # Get the last day of the week (Sunday)
    last_day = first_day + datetime.timedelta(days=6)

    # Check if today is Saturday and if not find this week's saturday
    if today.weekday() == 5:
        saturday_param = today
    else:
        # Get the date of this week's Saturday
        saturday_param = last_day - datetime.timedelta(days=1)
        


    # Check if today is Sunday
    if today.weekday() == 6:
        sunday_param = today
        # Get the date of next week's Saturday
        saturday_param = last_day + datetime.timedelta(weeks=1)
    else:
        # Get the date of the last Sunday
        sunday_param = last_day - datetime.timedelta(weeks=1)

    # sunday_param = sunday_param - datetime.timedelta(days=1)
    headers = {
        "User-agent":"PostmanRuntime/7.30.0",
        'Content-Type':'application/json',
    
    }
    params = {
        "from":sunday_param.strftime('%Y-%m-%d') + "T16:00:00.000Z",
        "to":saturday_param.strftime('%Y-%m-%d') + "T15:59:59.999Z",
        "no_format":"true",
        "location":1864,
        "isFromDropdown":"false",
    }
    body = {
        "from":sunday_param.strftime('%Y-%m-%d') + "T16:00:00.000Z",
        "to":saturday_param.strftime('%Y-%m-%d') + "T15:59:59.999Z",
        "locations_box_id":257
    }
    
    def start_requests(self):  #initial request on target url
        print(self.body)
        """ Initiates the scraper from the url variable"""
        request = scrapy.Request(url = self.start_url ,headers = self.headers,body=json.dumps(self.body), method='POST',callback= self.parse_home_page)
        f = open(self.filename, "w+")
        f.close()
        yield request

    def parse_home_page(self,response): #parses the timetable from the raw html
  
        parsed_response = json.loads(response.text)
        
        for target_class in parsed_response["data"]:
                print(f"Class instructor: {target_class['coach']['full_name']}")
                class_teacher = f"{target_class['coach']['full_name']}"
                print(f"Class name: {target_class['box_categories']['name']}")
                class_name = f"{target_class['box_categories']['name']}"
                print(f"Class Date: {target_class['date']}")
                class_date = f"{target_class['date']}"
                print(f"Class hours {target_class['time']} {target_class['end_time']}")
                class_hours = f"{target_class['time']} {target_class['end_time']}"
                yield {
                            "Class name": re.sub(r'\s\s+', ' ', class_name.replace("\n","").lstrip().rstrip()),
                            "Class hour": re.sub(r'\s\s+', ' ', class_hours.replace("\n","").lstrip().rstrip()),
                            "Class teacher":re.sub(r'\s\s+', ' ', class_teacher.replace("\n","").lstrip().rstrip()),
                            "Class Date": re.sub(r'\s\s+', ' ', class_date.replace("\n","").lstrip().rstrip()),
                        }


process = CrawlerProcess()
process.crawl(WebSpider)
process.start()

