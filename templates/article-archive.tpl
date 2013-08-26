{{> header}}

{{> require-setup}}

<div class="row" id="contentContainer">

    <ul class="articleListItemContainer">
        {{#articles}}
            <li><a href="/articles/{{key}}/index.html">{{title}} - {{date}}</a></li>
        {{/articles}}

    </ul>
</div>


{{> footer}}
