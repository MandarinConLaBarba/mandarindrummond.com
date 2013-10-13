title: AngularJS: Loading Indicator, Part 2
date: 2013-10-01 09:21

I've added another example for global loading indicators with Angular. Check it out [here](https://github.com/MandarinConLaBarba/angular-examples/blob/master/loading-indicator-route-change/index.html).
In this case I'm using route dependencies to load data for controllers, and attaching to $routeChange* events:


```
    app.controller("appController", function($scope, $rootScope) {

        $rootScope.$on("$routeChangeStart", function(e) {
            //show indicator
            $rootScope.$broadcast("loading-started");
        });
        $rootScope.$on("$routeChangeSuccess", function(e) {
            //hide indicator
            $rootScope.$broadcast("loading-complete");
        });
        $rootScope.$on("$routeChangeError", function(e) {
            //show error..
        });

    });

```
<br/>

And the same directive used in the previous example will respond to the broadcast events:

```
    app.directive("loadingIndicator", function() {
        return {
            restrict : "A",
            template: "<div>Loading...</div>",
            link : function(scope, element, attrs) {
                scope.$on("loading-started", function(e) {
                    console.log("loading started")
                    element.css({"display" : ""});
                });

                scope.$on("loading-complete", function(e) {
                    console.log("loading completed");
                    element.css({"display" : "none"});
                });

            }
        };
    });
```