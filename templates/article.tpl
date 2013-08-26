    {{> header}}

    {{> require-setup}}

    <div id="articleContainer"></div>

    <script type="text/javascript">

        define("args", {
            article: {{{json}}}
        });

        require(["app/main"]);

    </script>

    {{> footer}}
