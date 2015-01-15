{{ # recentPosts }}
<div class="post-summary">
    <h2 class="post-summary-title"><a href="{{ link }}">{{ title }}</a></h2>
    <p class="post-date">Posted {{ dateString }}</p>
    {{{ summary }}}
    <a class="post-summary-read-more" href="{{ link }}">&raquo; Read more</a>
</div>
{{ / recentPosts }}
