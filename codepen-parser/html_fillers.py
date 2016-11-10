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


def insert_item_content(f, title, image):
    f.write("""
    <li class="w1-2">
        <div class="dib">
            <img src="{}" alt=""/>
            <p>{}</p>
        </div>
        </li>
    """.format(image, title))


def insert_details_box(f):
    pass


def insert_row_end(f):
    f.write("""</ul>""")


def insert_footer(f):
    f.write("""</div>

    <script>
        $( "[id^=example-toggle-]" ).click(function(event) {
            var trailingId = event.target.id.split("-")[2];
            $( "#example-content-" + trailingId ).slideToggle( "slow" );
        });
    </script>

    @@include('_footer.html')

    </body>
    </html>""")