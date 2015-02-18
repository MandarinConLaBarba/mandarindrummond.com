title: React Tree Menu Component
date: 2015-02-18 3:50

What is it? A stateless tree component with the following features:

* Checkboxes
* Collapsible nodes
* Dynamic tree generation
* Declarative tree menus
* Built with the Flux proposal in mind (i.e. trickle-down state)

### Check out the [GitHub repository](https://github.com/MandarinConLaBarba/react-tree-menu)

### Please check out the [Demo](http://mandarinconlabarba.github.io/react-tree-menu/example/index.html).

### Install

```
npm install --save react-tree-menu
```

### General Usage

```

var TreeMenu = require('react-tree-menu').TreeMenu,
    TreeNode = require('react-tree-menu').TreeNode;;

    ...

    <TreeMenu/>
    <TreeMenu>
        <TreeNode/>
    </TreeMenu>

```



