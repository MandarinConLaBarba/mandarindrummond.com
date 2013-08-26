    {{> header}}

    {{> require-setup}}

    <div id="contentContainer"></div>

    <script type="text/javascript">

        define("args", {
            pageType : "article",
            model: {{{json}}}
        });

        require(["app/main"]);

    </script>

    {{> footer}}
