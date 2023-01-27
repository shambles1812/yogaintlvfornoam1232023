
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
    filename = "bikram3.csv"
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
                class_teacher = ''.join(reversed(class_teacher))
                print(f"Class name: {target_class['box_categories']['name']}")
                class_name = f"{target_class['box_categories']['name']}"
                # class_name = ''.join(reversed(class_name))
                print(f"Class Date: {target_class['date']}")
                class_date = f"{target_class['date']}"
                print(f"Class hours {target_class['time']} {target_class['end_time']}")
                # class_hours = f"{target_class['time']} {target_class['end_time']}"
                class_start_hour = target_class['time']
                class_end_hour = target_class['end_time']
                hebrew_teacher = re.sub(r'\s\s+', ' ', class_teacher.replace("\n","").lstrip().rstrip())
                
                yield {
                            "studio_logo":"https://bikramyoga.co.il/wp-content/uploads/2016/02/logo.png",
                            "class_date": re.sub(r'\s\s+', ' ', class_date.replace("\n","").lstrip().rstrip()),
                            "class_name": re.sub(r'\s\s+', ' ', class_name.replace("\n","").lstrip().rstrip()),
                            "class_start_hour": re.sub(r'\s\s+', ' ', class_start_hour.replace("\n","").lstrip().rstrip()),
                            "class_end_hour": re.sub(r'\s\s+', ' ', class_end_hour.replace("\n","").lstrip().rstrip()),
                            "class_teacher":hebrew_teacher,
                            "studio_address":"ביקראם יוגה - בן אביגדור 26",
                            "phone_number":"+9726241807",
                            "url":r"https://bikramyoga.co.il/%d7%9c%d7%95%d7%97-%d7%a9%d7%99%d7%a2%d7%95%d7%a8%d7%99%d7%9d/",
                        }


process = CrawlerProcess()
process.crawl(WebSpider)
process.start()

