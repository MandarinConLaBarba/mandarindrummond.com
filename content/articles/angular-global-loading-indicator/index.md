title: AngularJS: Loading Indicator, The Angular Way
date: 2013-10-01 06:47

Looking around the net and on StackOverflow, I saw some examples ([here](http://jsfiddle.net/dBR2r/8/), and [here](https://gist.github.com/maikeldaloo/5140733))
of loading indicators that reference the DOM, or do things in a way that seem to run against "The Angular Way". After poking
around a bit, I came up with my own answer, [check out the complete code here](https://github.com/MandarinConLaBarba/angular-examples/blob/master/loading-indicator/index.html).

Basically it uses a combination of an httpInterceptor and custom directive:

```
        app.config(function($httpProvider) {

            $httpProvider.interceptors.push(function($q, $rootScope) {
                return {
                    'request': function(config) {
                        $rootScope.$broadcast('loading-started');
                        return config || $q.when(config);
                    },
                    'response': function(response) {
                        $rootScope.$broadcast('loading-complete');
                        return response || $q.when(response);
                    }
                };
            });

        });


        app.directive("loadingIndicator", function() {
            return {
                restrict : "A",
                template: "<div>Loading...</div>",
                link : function(scope, element, attrs) {
                    scope.$on("loading-started", function(e) {
                        element.css({"display" : ""});
                    });

                    scope.$on("loading-complete", function(e) {
                        element.css({"display" : "none"});
                    });

                }
            };
        });


```
<br/>
Then in the markup you just drop the directive in:


```
        <div ng-controller="simpleListController">
            <h3>Controller 1</h3>

            <div loading-indicator></div>

            <div ng-repeat="row in rows">
                <div>{{row.id}} - {{row.content}}</div>
            </div>

        </div>
```
<br/>
And in the controller do something w/ $http:

```
        app.controller("simpleListController", function($scope, $http) {

            ...

            $http.jsonp("http://www.filltext.com", config, {})
                    .success(function(data) {
                        $scope.rows = data;
                    });

        });
```
<br/>

What I like about this solution:

 1. You don't need to explicitly declare that you are loading inside the controller, as demonstrated in [this video](http://www.youtube.com/watch?v=mMxQHmvQ1pA).
 2. There's no reference to a specific DOM element or anything like that, it's using a proper directive.

What I don't like about this solution:

 1. You can only load one thing at a time. For many cases, this is OK..pages are either loading or not. For cases where you have specific portions
 that update independently of other views/controllers/etc, you'll have to do something a little different. Maybe I'll cover that later.