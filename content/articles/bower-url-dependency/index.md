title: Bower URL Dependencies
date: 2013-09-27 05:55

I don't know what took me so long, but I just discovered you can define a dependency as a URL in Bower configuration. This
is handy when your favorite project doesn't have a Bower component, OR the Bower component doesn't actually have a compiled
library. This is the case with Sinon, my favorite test-stubbing utility for Javascript...and until I found this solution
I was managing the dependency on my own:

```
  "devDependencies": {
    "sinon": "http://sinonjs.org/releases/sinon-1.7.3.js"
  }
```