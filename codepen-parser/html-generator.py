import parser
import os
import html_fillers as filler

items_in_row = 2  # max number of items in a row

collection_content = parser.parse_collection(collection_id="nMWevE")

dir_path = os.path.dirname(os.path.realpath(__file__))
f = open(dir_path + "/examples.html", "w")

# generate header
filler.insert_header(f)


item_id = 1
for category in collection_content:
    cat = collection_content[category]

    # add opening  tags for a category
    filler.insert_section_start(f, cat["meta"]["label"])

    filler.insert_row_start(f)

    flag = 1
    # add items
    for item in cat["items"]:
        print(item_id)
        filler.insert_item_content(f=f, item_id=item_id, item=item)
        filler.insert_details_box(f=f, item_id=item_id, item=item)
        item_id += 1
        flag += 1

    # add trailing tags
    filler.insert_row_end(f)
    filler.insert_section_end(f)

# add footer
filler.insert_footer(f)

print("finished")


