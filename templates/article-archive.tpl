{{> header}}

{{> require-setup}}

<div id="contentContainer"></div>

<script type="text/javascript">

    define("args", {
        pageType : "article-archive",
        collection: {{{articlesJson}}}
    });

    require(["app/main"]);

</script>

{{> footer}}
