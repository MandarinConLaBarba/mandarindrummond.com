    {{> header}}

    {{> require-setup}}

    <div class="row" id="contentContainer">

        {{#articles}}
            <div>
                <h4>{{title}}</h4>
                <h5>{{date}}</h5>

                <p>
                    {{{html}}}
                </p>

                <a href="/articles/{{key}}/index.html">permalink</a>
            </div>
        {{/articles}}

    </div>


    {{> footer}}
