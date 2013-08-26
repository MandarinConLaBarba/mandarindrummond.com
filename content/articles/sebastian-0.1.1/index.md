title: Sebastian - 0.1.1
date: 2013-02-22 5:31

Been pretty busy lately, but that hasn't stopped me from working a bit here and there on
[Sebastian](http://mandarinconlabarba.github.com/sebastian/). For original post on Sebastian, go
[here](http://mandarindrummond.com/articles/introducing-sebastian/).

###New in 0.1.1

* Ability to use a flow as a step in another flow. [Example](https://github.com/MandarinConLaBarba/sebastian/blob/master/examples/node/general-using-flow-as-step.js).
* Ability to pass arguments from begin() to first step (in waterfall mode) or all steps (in parallel mode). Examples [1](https://github.com/MandarinConLaBarba/sebastian/blob/master/examples/node/waterfall-begin-with-arguments.js), [2](https://github.com/MandarinConLaBarba/sebastian/blob/master/examples/node/parallel-begin-with-arguments.js).
* Addition of .context() method, for specifying 'this' context to be used with steps in flow. [Example](https://github.com/MandarinConLaBarba/sebastian/blob/master/examples/node/general-context.js).
* Fix to waterfall argument logic.
* More tests

For all examples, go [here](https://github.com/MandarinConLaBarba/sebastian/blob/master/examples/node/).

