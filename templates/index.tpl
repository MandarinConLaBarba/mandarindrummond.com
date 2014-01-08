    {{> header}}

        {{#articles}}
                <div class="row article">
                    <div class="small-12 medium-12 large-12">
                        <h3><a href="/articles/{{key}}/index.html">{{title}}</a></h3>
                    </div>
                    <div class="small-12 medium-12 large-12">
                        {{{html}}}
                    </div>
                    <div class="small-12 medium-12 large-12 article-end">
                        <hr/>
                    </div>
                </div>

        {{/articles}}

    {{> footer}}
