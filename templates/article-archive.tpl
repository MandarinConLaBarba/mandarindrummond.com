{{> header}}

<div class="row" id="contentContainer">

    <h4>Past Articles</h4>

    <ul class="articleListItemContainer">
        {{#articles}}
            <li><a href="/articles/{{key}}/index.html">{{title}} - {{date}}</a></li>
        {{/articles}}

    </ul>
</div>


{{> footer}}
