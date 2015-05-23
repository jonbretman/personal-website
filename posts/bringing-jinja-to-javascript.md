---
title: Bringing Jinja to JavaScript
date: 2015-05-23
categories: [javascript, python]

name: '{{ name }}'
numberKey: '{{ number }}'
nameKey: '{{ name }}'
mustacheLoopExample: '{{#numbers}}{{ . }}{{/numbers}}'
---

About 6 months ago I was trying to work out how we ([Lyst](http://www.lyst.com)) could share templates between the server (Python) and the browser. On the server we are using [Jinja2](http://jinja.pocoo.org/docs/dev/) templates, and in the browser we are using [Underscore](http://underscorejs.org/#template) templates, and although both were working fine there were many occasions where we would have liked the felixibility to be able to render the same template in multiple environments.


### Finding some common ground
My initial thoughts were to find a templating language that had implementations in both Python and JavaScript, of which the most obvious seemed to be Mustache. Both [mustache.js](https://github.com/janl/mustache.js/) and [pystache](https://github.com/defunkt/pystache) are well maintained libraries and seemed like good choices, so I started with a quick benchmark between pystache and Jinja2 to check that we wouldn't be sacrificing any performance.

```
In [40]: import pystache
In [41]: t = pystache.parse(u'{{ page.mustacheLoopExample }}')
In [42]: %timeit pystache.render(t, dict(numbers=list(range(100))))
1000 loops, best of 3: 661 µs per loop

In [43]: import jinja2
In [44]: t = jinja2.Template('{% for number in numbers %}{{ page.numberKey }}{% endfor %}')
In [45]: %timeit t.render(numbers=list(range(100)))
10000 loops, best of 3: 30.8 µs per loop
```

This is far from the most complete benchmark but it's still clear that Jinaj2 is a **lot** faster than pystache. This is not that suprising when you look at the difference between the compiled version of each template.

```
In [51]: pystache.parse(u'{{ page.mustacheLoopExample }}')
Out[51]: [_SectionNode(key=u'numbers', index_begin=12, index_end=19, parsed=[_EscapeNode(key=u'.')])]

In [52]: jinja2.Environment().compile('{% for number in numbers %}{{ page.numberKey }}{% endfor %}', raw=True)
Out[52]: "from __future__ import division\nfrom jinja2.runtime import LoopContext, TemplateReference, Macro, Markup, TemplateRuntimeError, missing, concat, escape, markup_join, unicode_join, to_string, identity, TemplateNotFound\nname = None\n\ndef root(context, environment=environment):\n    l_numbers = context.resolve('numbers')\n    if 0: yield None\n    l_number = missing\n    for l_number in l_numbers:\n        if 0: yield None\n        yield to_string(l_number)\n    l_number = missing\n\nblocks = {}\ndebug_info = '1=9'"
```

Whereas pystache compiles a template into a data structure that it then later has to execute against, Jinja compiles a template into actual Python code. Here is that Python code with a little formatting:

```python
from __future__ import division
from jinja2.runtime import (
    LoopContext, TemplateReference, Macro, Markup, TemplateRuntimeError, 
    missing, concat, escape, markup_join, unicode_join, to_string, identity, 
    TemplateNotFound
)
name = None
def root(context, environment=environment):
    l_numbers = context.resolve('numbers')
    if 0: 
        yield None
    l_number = missing
    for l_number in l_numbers:
        if 0: 
            yield None
        yield to_string(l_number)
    l_number = missing
blocks = {}
debug_info = '1=9'
```

This is actually one of the strenghts of Underscore templates, like Jinja templates they compile into actual JavaScript code. After reading the Jinja documentation (and digging around a little in the source code) I found that Jinja first creates an [AST](http://en.wikipedia.org/wiki/Abstract_syntax_tree) (Abstract Syntax Tree) from the template string, and then uses that to create Python code. What I needed was a way of turning a Jinja AST into an Underscore template string. From that I could create JavaScript code using the `_.template()` function.

### All the cool kids are taking AST these days
It is possible to get the AST Jinja generates by using the `parse` method on a `jinja2.Environment` instance. For example:

```
In [88]: jinja2.Environment().parse('{{ page.nameKey }}')
Out[88]: Template(body=[Output(nodes=[Name(name='name', ctx='load')])])
```

Now I just needed to write an implementation for each node in the AST that output the relevant Underscore string. For example the following Jinja template:

```jinja

{% for number in numbers %}
    {{ page.numberKey }}
{% endfor %}
```

...would compile to the following Underscore template:
```
<% _.each(numbers, function (number) { %>
    <%- number %>
<% }); %>
```

If you are interested you can see the code that handles a `jinja2.nodes.For` node [here](https://github.com/jonbretman/jinja-to-js/blob/0.0.2/jinja_to_js/__init__.py#L282-L340).

### When life gives you Underscore... use all the functions
It is worth noting at this point that I am making heavy use of Underscore functions in the compiled output, which seemed like a sensible thing to do as Underscore provides a lot of functional utilities that make implementing Jinja functionality easier and it is a very common library to have available. Underscore functions were particularly useful when implementing some of the filters, for example the [JS version](https://github.com/jonbretman/jinja-to-js/blob/0.0.2/jinja_to_js/js_functions.py#L15-L38)  of the `batch` filter makes use of `_.isUndefined()`, `_.last`, and `_.reduce()`.

### I made a thing
The end result of this work is [jinja-to-js](https://github.com/jonbretman/jinja-to-js) (I hate naming things!) - a Python module for converting a Jinja template into an Underscore template. It uses a recursive approach to visit each node in the AST and output a relevant Underscore style template. It can be installed via pip and the command line API is pretty straight forward, for example the following command reads **example.jinja**, converts into an Underscore template, and then writes it to **example.underscore**.

```sh
$ jinja_to_js -f example.jinja -o example.underscore
```

### But is it web scale?
I knew from my previous benchmarks that Jinja was faster than pystache, but what about Underscore vs. Mustache.js in the browser? A [jsPerf test](http://jsperf.com/underscore-vs-mustache) using the same template string and data as I used for the Python benchmark gives the following results:

![benchmark](/img/mustache-vs-underscore-benchmark.png)

Again we can see that an approach that turns a template into code is much faster than one that has to execute against an AST each time it renders.

### Can't tell if real or joke
This was definitely a fun project to work, but the proof is in the production pudding and just this week we have starting to use it in production at Lyst. There is still some work to do to support all Jinja features but enough are supported for it to be useful for us, and hopefully for some other people too. If you are already using Jinja templates in your backend, or if you are using a Jinja-like language written in JS, check it out and let me know what you think.
