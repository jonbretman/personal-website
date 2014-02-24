module.exports = function (grunt) {

    var mustache = require('mustache');
    var _ = require('underscore');
    var marked = require('marked');
    var hljs = require('highlight.js');
    var yaml = require('js-yaml');

    var Templates = function (dir) {

        grunt.file.expand({
            cwd: dir,
            filter: 'isFile'
        }, '**/*').forEach(function (template) {
            this[template.replace('.mustache', '')] = grunt.file.read(dir + '/' + template);
        }.bind(this));

        marked.setOptions({

            highlight: function (code) {
                return hljs.highlightAuto(code).value;
            }

        });
    };

    Templates.prototype = {

        render: function (name, data) {
            data.content = marked(mustache.render(data.content, data));
            data.summary = marked(mustache.render(data.summary, data));
            return mustache.render(this[name], data, this);
        }

    };

    var Page = function (src, type) {

        this.path = src;
        this.type = type;

        src = grunt.file.read(src);

        var lines = src.split('\n');

        if (lines[0][0] !== '-') {
            console.log('Invalid blog post file!');
        }

        var frontMatter = [];

        lines.shift();

        while (lines[0][0] !== '-') {
            frontMatter.push(lines.shift());
        }

        lines.shift();

        this.src = src;

        frontMatter = yaml.safeLoad(frontMatter.join('\n'));
        for (var key in frontMatter) {
            this[key] = frontMatter[key];
        }

        if (!this.template) {
            this.template = 'index';
        }

        this.content = lines.join('\n');
        this.summary = this.content.trim().split('\n')[0];

        if (this.date) {
            this.createDateString();
        }

        this.createDestPath();
    };

    Page.prototype = {

        getSrc: function () {
            return this.src;
        },

        getRawContent: function () {
            return this.rawContent;
        },

        getParsedDate: function () {
            var dateObj = this.date;

            var year = dateObj.getFullYear();

            var month = dateObj.getMonth() + 1;
            month = month < 10 ? '0' + month : month;

            var date = dateObj.getDate();
            date = date < 10 ? '0' + date : date;

            return year + '/' + month + '/' + date;
        },

        createDateString: function () {
            var date = this.date;
            var day = date.getDate();
            var month = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Oct', 'Nov', 'Dec'][date.getMonth()];
            var year = date.getFullYear();
            this.dateString = day + ' ' + month + ' ' + year;
        },

        createDestPath: function () {

            if (this.type === Page.POST) {
                this.destPath = ['posts'];
                this.destPath.push(this.getParsedDate());
                this.destPath.push(this.title.toLowerCase().replace(/ /g, '-').replace(/,/g, ''));
                this.destPath = this.destPath.join('/') + '.html';
            }
            else {
                var parts = this.path.split('/');
                this.destPath = parts.pop().replace('.md', '.html');
            }

        }

    };

    Page.POST = 'POST';
    Page.PAGE = 'PAGE';

    grunt.registerTask('blog', function () {

        var options = this.options({
            dest: 'build/',
            posts: 'posts/**/*',
            pages: 'pages/**/*',
            templatesDir: 'templates',
            assetsDir: 'assets'
        });

        var data = {};

        var templates = new Templates(options.templatesDir);

        var render = function (page) {
            grunt.file.write(options.dest + page.destPath, templates.render(page.template, _.extend({}, data, page)));
        };

        // data for posts
        data.posts = grunt.file.expand(options.posts).map(function (post) {
            return new Page(post, Page.POST);
        }).sort(function (a, b) {
            return b.date - a.date;
        });

        // data for pages
        data.pages = grunt.file.expand(options.pages).map(function (page) {
            return new Page(page, Page.PAGE);
        });

        // create posts
        data.posts.forEach(render);

        // create pages
        data.pages.forEach(render);

        // static assets
        grunt.file.expand({filter: 'isFile'}, options.assetsDir + '/**/*').forEach(function (file) {
            grunt.file.write(options.dest + file, grunt.file.read(file));
        });

    });

};