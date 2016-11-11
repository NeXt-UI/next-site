def insert_header(f):
    f.write("""@@include('_head.html')
    @@include('_nav.html', {
        "navActiveItem": "examples"
    })

    <div class="auto wrap">""")


def insert_section_start(f, label):
    f.write("""<h2 class="mx20 f16" style="margin:16px 0 10px 95px;"><strong>{}</strong></h2>
        <section style="margin-left:95px;">""".format(label))


def insert_section_end(f):
    f.write("""</section>""")


def insert_row_start(f):
    f.write("""<ul class="clfix l_ m-example-list">""")


def insert_item_content(f, item_id, item):
    f.write("""
    <li class="w1-2">
        <div class="dib">
            <img src="{image}" class="pointer" id="example-toggle-{item_id}" alt=""/>
            <p>{title}</p>
        </div>
        </li>
    """.format(title=item.get("title"),
               image=item.get("image"),
               item_id=item_id))


def insert_details_box(f, item_id, item):
    f.write("""
    <div id="example-content-{item_id}" class="display-none example-content">
    <p class="f24 tc hlh60 c-qin">{title}</p>
    <div>

        <p class="example-content-description">{description}</p>

        <p data-height="400"
           data-theme-id="dark"
           data-slug-hash="{hash}"
           data-default-tab="result"
           data-user="NEXTSUPPORT"
           data-embed-version="2"
           data-pen-title="{title}"
           class="codepen">
            See the Pen <a href="{link}">{title}</a>
            by Aikepaer Abuduweili (<a href="http://codepen.io/NEXTSUPPORT">@NEXTSUPPORT</a>)
            on <a href="http://codepen.io">CodePen</a>.
        </p>

        <div class="clear example-content-button-block">
            <a href="http://codepen.io/NEXTSUPPORT/pen/{hash}/?editors=0010#0"
               class="bg-orange f16 radius3 cf dib mt10 btnv1"
               style="padding:10px;"
               target="_blank">
                Hack Code on Codepen
            </a>
        </div>

    </div>""".format(title=item.get("title"),
                     hash=item.get("hash"),
                     description=item.get("description"),
                     link=item.get("link"),
                     item_id=item_id))
    pass


def insert_row_end(f):
    f.write("""</ul>""")


def insert_footer(f):
    f.write("""</div>
    <script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
    <script>
        $( "[id^=example-toggle-]" ).click(function(event) {
            var trailingId = event.target.id.split("-")[2];
            $( "#example-content-" + trailingId ).slideToggle( "slow" );
        });
    </script>

    @@include('_footer.html')

    </body>
    </html>""")