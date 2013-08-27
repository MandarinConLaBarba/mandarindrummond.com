    {{> header}}

    <div class="row" id="contentContainer">

        {{#articles}}
            <div>
                <h4><a href="/articles/{{key}}/index.html">{{title}}</a></h4>
                <h5>{{date}}</h5>

                <p>
                    {{{html}}}
                </p>

                <a href="/articles/{{key}}/index.html">permalink</a>
            </div>
        {{/articles}}

    </div>


    {{> footer}}
