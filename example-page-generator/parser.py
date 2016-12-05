import logging
import requests
import xmltodict
import json
import pprint


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


def parse_collection():
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
        },
        "groups": {
            "label": "Groups"
        },
        "hacks": {
            "label": "Hacks"
        }
    }

    # this will contain parsed data
    cat_content = {}

    data_list = []

    # read the input JSON
    with open('input.json') as input_file:
        data_list = json.load(input_file)

    for item in data_list:

        oembed_url = "https://codepen.io/api/oembed?url=" + item["link"] + "&format=json"
        r = requests.get(oembed_url)
        item_title = find_between(r.text, '"title": "', '"')

        if r.status_code == 200:
            item_details = {
                "link": item["link"],
                "description": item["description"],
                "image": item["link"] + "/image/small.png",
                "title": item_title
            }
            add_to_category(item=parse_item(item_details), categories=cat_content, cat_link=cat_link)

    return cat_content
