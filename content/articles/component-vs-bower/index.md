title: Web Packages - Component vs Bower
date: 2013-01-28 7:31

Over the past 6-12 months the JavaScript community has been abuzz about two new web packaging APIs with
increasing momentum. Most of the attention thus far seems to have been directed toward
[Bower](https://github.com/twitter/bower), but there's a strong contingent of
[Component](https://github.com/component/component) followers as well. While both packaging platforms aim to
corral client-side dependencies, they go about things quite differently.

### Bower

Bower is best described by a quote straight from the [Bower FAQ](https://github.com/twitter/bower#faq):

>#####*Bower offers a generic, unopinionated solution to the problem of package management, while exposing an API that can be consumed by a more opinionated build stack.*

Basically what this means is that Bower aims to be compatible w/ your packaging philosophy, whether it be AMD, CJS, or
whatever.

#### Distinguishing Features:

* Neutral stance on module definition
* Only a package manager
* Public registry

### Component

I couldn't find a concise synopsis in [TJ Holowaychuk's](http://tjholowaychuk.com/) [post](http://tjholowaychuk.com/post/27984551477/components)
on the subject, so here's my attempt:

>#####Component is a CommonJS packaging solution and build tool.

#### Distinguishing features:

* Favors CommonJS Module Format
* Uses GitHub as Public Registry
* More than just a package manager, also build tool
* Serious effort to write CommonJS client-side packages for Component

The reason I find Bower more appealing is that if I want to use AMD, I can. I can write a lot of modules in AMD format
and register them in the Bower registry and get to work. If someone else likes CJS, they can do the same. I can also mix
package formats in my project with Bower - it's just up to you on how to get those packages not to step on one another!
Since Bower doesn't have a build step, it doesn't care what format the package is in.