import parser
import os
import html_fillers as filler

items_in_row = 2  # max number of items in a row

collection_content = parser.parse_collection(collection_id="nMWevE")

dir_path = os.path.dirname(os.path.realpath(__file__))
f = open(dir_path + "/examples.html", "w")

# generate header
filler.insert_header(f)

for category in collection_content:
    cat = collection_content[category]

    # add opening  tags for a category
    filler.insert_section_start(f, cat["meta"]["label"])

    filler.insert_row_start(f)

    flag = 1
    # add items
    for item in cat["items"]:
        flag += 1
        filler.insert_item_content(f=f,
                                   title=item.get("title"),
                                   image=item.get("image"))

        filler.insert_details_box(f)

    # add trailing tags
    filler.insert_row_end(f)
    filler.insert_section_end(f)

# add footer
filler.insert_footer(f)

print("finished")


