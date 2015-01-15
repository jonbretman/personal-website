---
title: Giving in to BEM
date: 2014-01-15
categories: [css]
---

For those not familiar with BEM (block, element, modifier) it's basically a naming convention for CSS that is designed to make it easy for other developers to understand what the hell your CSS does. I think when I first saw it I thought it was a joke created by some disgruntled Java developers tired of XML being the ugliest thing in software development, or that maybe two developers couldn't decide whether to use hyphens or underscores for their class names so just decided to use both.

Joking aside, I think anyone who has worked with CSS a lot will agree that it's actually pretty hard. Not hard in the same way that C is hard, but hard in the sense that it seems whatever you do, however good your intentions and no matter how much you try, you end up with a load of unstructured nonsense. I think the reason for this is that a huge amount of writing CSS is naming things, and naming things is basically the hardest thing ever.

Lets look a very simple example:

```html
<div class="alert">
    <div class="alert-title">The Title</div>
</div>
```

Here we have some basic HTML for some kind of alert that contains a title. It wouldn't be unreasonable if a developer wrote the following CSS.

```css
.alert { ... }
.alert-title { ... }
```

Now at this point everything is fine and dandy, but then the inevitable happens. Turns out that sometimes this alert just doesn't cut it, and we need to do the only thing that can reasonably be done when things need to be made better, we need to make it bigger. So the developer goes back to his CSS and thinks "OK, I'll just add a modifier class that can be used to make the alert bigger".

```css
.alert { ... }
.alert-title { ... }
.alert-large { ... }
```

But wait... now we have `alert-title` which is an element inside `alert` and `alert-large` which is a modifier that can possibly be used as well as or instead of `alert`. Now this is already a little confusing as it's not possible just from looking at the class names what is a child (or element) of the component (or block) and what is a modifier. This is pretty much why I have changed my mind about BEM. Re-written using BEM the CSS would look like this.

```css
.alert { ... }
.alert__title { ... }
.alert--large { ... }
```

Now as long as you understand that `__` is used to denote a parent to child relationship, and `--` is used to denote a modifier, it's incredibly clear what is going on. It's kind of like the bum bag (fanny pack for US readers), it's not a good look but you don't loose all your things. I have worked at 3 different companies as a web developer, and although some CSS has been better than others, I don't think I can say I have ever worked on a project where I have felt the CSS was really well structured. Not to say any of it was particularly bad, just not particularly good either.

One of the things we'll be working on at [Lyst](http://developers.lyst.com/) this year will be taming our CSS, and although we haven't yet decided exactly how we'll do this I think that the BEM concepts will probably play a big part in whatever approach we take.

If you want to know more about BEM [this is a great intro](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) by Harry Roberts.
