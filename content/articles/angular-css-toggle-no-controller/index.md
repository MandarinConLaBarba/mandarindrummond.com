title: AngularJS: Toggle CSS Classes, The Angular Way
date: 2013-10-14 10:31

Over and over again I see examples of people referencing specific CSS selectors and/or DOM elements in Angular controllers. When I see this I
often wonder why these folks are using Angular at all. If you want to do that kind of thing, why not use Backbone or something else?

Here's a simple example of how to toggle a CSS class without involving the controller at all:

```
    <div
       ng-class="{'button': !isActive, 'button active': isActive}"
       ng-init="isActive = false"
       ng-click="isActive = !isActive">
        Click Me
    </div>
```
This will add the class 'active' every other time the element is clicked. All you need to do is initialize Angular and it will work:

```
<script>
    var app = angular.module("exampleApp", []);
</script>
```
Full example [here](https://github.com/MandarinConLaBarba/angular-examples/tree/master/toggle-css).

