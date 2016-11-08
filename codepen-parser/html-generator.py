import parser

collection_content = parser.parse_collection(collection_id="nMWevE")

f = open('examples.html', 'w')

# generate header
f.write("""@@include('_head.html')
@@include('_nav.html', {
    "navActiveItem": "examples"
})

<div class="auto wrap">""")

for category in collection_content:
    cat = collection_content[category]

    # add opening  tags for a category
    f.write("""<h2 class="mx20 f16" style="margin:16px 0 10px 95px;"><strong>{}</strong></h2>
    <section style="margin-left:95px;">
    <ul class="clfix l_ m-example-list">""".format(cat["meta"]["label"]))

    # add items
    for item in cat["items"]:
        f.write("""
        <li class="w1-2">
            <div class="dib">
                <img src="{}" alt=""/>
                <p>{}</p>
            </div>
            </li>
        """.format(item.get("image"), item.get("description")))
        pass

    # add training tags
    f.write("</ul></section>")

# add footer
f.write("""</div>

@@include('_footer.html')

</body>
</html>""")

print("finished")
