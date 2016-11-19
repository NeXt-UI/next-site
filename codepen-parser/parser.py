import logging
import requests
import xmltodict


def find_between(s, first, last):
    try:
        start = s.index(first) + len(first)
        if last != "":
            end = s.index(last, start)
            return s[start:end]
        else:
            return s[start:]
    except ValueError:
        return ""


def parse_item(item):

    tags = [x.strip() for x in find_between(item["description"], "tags[", "]").split(',')]
    description = find_between(item["description"], "description[", "]")
    item_hash = find_between(item["link"], "/pen/", "")
    item_data = {
        "link": item["link"],
        "image": item["link"] + "/image/small.png",
        "title": item["title"],
        "hash": item_hash,
        "tags": tags,
        "description": description
    }
    return item_data


def add_to_category(item, categories, cat_link):
    tags = item["tags"]
    for tag in tags:
        if categories.get(tag) is None:
            category_linked_data = cat_link.get(tag)
            if category_linked_data is not None:
                category_label = cat_link.get(tag).get("label")
            else:
                category_label = tag.title()
            categories[tag] = {
                "meta": {
                    "label": category_label
                },
                "items": [
                    item
                ]
            }
        else:
            categories[tag]["items"].append(item)
    return categories


def parse_collection(collection_id):
    # link categories' IDs to labels
    cat_link = {
        "basic": {
            "label": "Basic"
        },
        "path": {
            "label": "Paths"
        },
        "topomods": {
            "label": "Topology Modifications"
        }
    }

    # this will contain parsed
    cat_content = {}

    # URL of the collection
    feed_url = "http://codepen.io/collection/" + collection_id + "/feed"

    # read the feed
    r = requests.get(feed_url)

    if r.status_code == 200:

        feed_root = xmltodict.parse(r.text)
        feed_items = feed_root["rss"]["channel"]["item"]

        if isinstance(feed_items, list):
            for feed_item in feed_items:
                add_to_category(item=parse_item(feed_item), categories=cat_content, cat_link=cat_link)
        else:
            add_to_category(item=parse_item(feed_items), categories=cat_content, cat_link=cat_link)

    else:
        logging.error(msg="Could not fetch data from codepen")

    return cat_content

