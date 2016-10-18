import logging
import requests
import xmltodict

# Target file to
target_file = "examples.html"
# Donor collection's ID
collection_id = "nrBeEQ" # nMWevE
# URL of the collection
feed_url = "http://codepen.io/collection/" + collection_id + "/feed"

# link categories' IDs to labels
cat_link = [
    {
        "tag": "base",
        "label": "Base"
    }
]

# this will contain parsed
cat_content = {}


def find_between(s, first, last):
    try:
        start = s.index(first) + len(first)
        end = s.index(last, start)
        return s[start:end]
    except ValueError:
        return ""


def parse_item(item):
    tag = find_between(item["description"], "tag[", "]")
    description = find_between(item["description"], "description[", "]")
    item_data = {
        "link": item["link"],
        "image": item["link"] + "/image/small.jpg",
        "title": item["title"],
        "tag": tag,
        "description": description
    }
    return item_data

# read the feed
r = requests.get(feed_url)

if r.status_code == 200:

    feed_root = xmltodict.parse(r.text)
    feed_items = feed_root["rss"]["channel"]["item"]

    if isinstance(feed_items, list):
        for feed_item in feed_items:
            print(parse_item(feed_item))
    else:
        print(parse_item(feed_items))

else:
    print(r.status_code)
    logging.error(msg="Could not fetch data from codepen")
