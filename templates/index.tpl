    {{> header}}

    {{> require-setup}}

    <script type="text/javascript">

        define("args", {
            articles: {{{articlesJson}}}
        });

        require(["app/main"]);

    </script>

    {{> footer}}
