title: Testacular+RequireJS+Node Testing
date: 2013-02-28 8:31

I just switched [Sebastian](http://mandarinconlabarba.github.com/sebastian/) over to the
[Testacular](http://testacular.github.com/0.6.0/index.html) test runner. Testacular is pretty sweet, but that's
another article written by someone else. There are a few docs and forum posts out there on how to set up
Testacular with the RequireJS adapter, but I couldn't find one that talked about how to do this for libraries
that you also want to test in the Node environment.

Sebastian uses the standard factory pattern to adapt to various environments (CJS, AMD, neither). So I take a similar
approach when writing specs that will work with Testacular+RequireJS and Node:

<script src="https://gist.github.com/MandarinConLaBarba/5066835.js"></script>

Here's the relevant portion of my testacular.conf.js:

<script src="https://gist.github.com/MandarinConLaBarba/5066913.js"></script>

What this does is tell Testacular to use Mocha, RequireJS, and to make several library dependencies available to the Testacular
server but not to include them in the page. **If you don't do this, RequireJS will not be happy.**
Because test/bootstrap does not have the 'include' attribute set, it adopts default behavior which is to include the file in the page.
This is a good thing, as test/bootstrap is where the RequireJS config is set up:

<script src="https://gist.github.com/MandarinConLaBarba/5066968.js"></script>

Here's the output from Mocha (Node environment) and Testacular (Chrome):

<script src="https://gist.github.com/MandarinConLaBarba/5067049.js"></script>

You can see the complete setup in [Sebastian source code](https://github.com/MandarinConLaBarba/sebastian/tree/dev).

