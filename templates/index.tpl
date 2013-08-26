    {{> header}}

    {{> require-setup}}

    <div id="contentContainer"></div>

    <script type="text/javascript">

        define("args", {
            pageType : "index",
            collection: {{{articlesJson}}}
        });

        require(["app/main"]);

    </script>

    {{> footer}}
