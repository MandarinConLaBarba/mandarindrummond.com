    {{> header}}

    <div class="row" id="contentContainer">

        {{#articles}}
            <div class="panel-article large-12 columns">
                <div class="large-12 columns">
                    <h4 class="subheader"><a href="/articles/{{key}}/index.html">{{title}}</a></h4>
                </div>
                <div class="large-12 columns">
                    {{{html}}}
                </div>

                <div class="large-4 large-offset-8 columns">
                    <ul class="inline-list">
                        <li>Added {{date}}</li>
                        <li><a href="/articles/{{key}}/index.html">permalink</a></li>
                    </ul>
                </div>
            </div>

        {{/articles}}

    </div>


    {{> footer}}
