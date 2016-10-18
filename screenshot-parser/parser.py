import requests

screenshots_dir = "screenshots"
username = "NEXTSUPPORT"
associations = [
    {
        "pen_id": "NNLdzQ",
        "image_name": "base"
    }
]

for link in associations:
    print(link["image_name"])

    r = requests.get("https://codepen.io/" + username + "/pen/" + link["pen_id"] + "/image/small.png")
    print(r)

    # image_file = open('Failed.py', 'w')
    # file_.write('whatever')
    # file_.close()