---
title: Jon Bretman
---

### Posts

<ul>
{{ # posts }}
    <li>
        <a href="/{{{ link }}}">
            <p>{{ title }}</p>
            <p>{{ dateString }}</p>
            {{{ summary }}}
        </a>
    </li>
{{ / posts }}
</ul>