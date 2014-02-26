module.exports = function (grunt) {

    var mustache = require('mustache');
    var marked = require('marked');
    var highlight = require('highlight.js');
    var yaml = require('js-yaml');
    var beautify = require('js-beautify').html;

    // setup marked to highlight code snippets
    marked.setOptions({

        highlight: function (code) {
            return highlight.highlightAuto(code).value;
        }

    });

    var Blog = function (options) {
        this.options = options;
        this.templates = this.compileTemplates();
        this.posts = grunt.file.expand(options.posts).map(this.compilePost.bind(this));
        this.pages = grunt.file.expand(options.pages).map(this.compilePage.bind(this));
    };

    Blog.prototype = {

        months: [
            'Jan',
            'Feb',
            'March',
            'April',
            'May',
            'June',
            'July',
            'Aug',
            'Sept',
            'Oct',
            'Nov',
            'Dec'
        ],

        extend: function (target) {

            var sources = [].slice.call(arguments, 1);

            sources.forEach(function (source) {

                for (var key in source) {
                    if (source.hasOwnProperty(key)) {
                        target[key] = source[key];
                    }
                }

            });

            return target;
        },
        
        compileTemplates: function () {

            var templates = {};

            grunt.file.expand({
                cwd: this.options.templatesDir,
                filter: 'isFile'
            }, '**/*').forEach(function (template) {
                templates[template.replace('.mustache', '')] = grunt.file.read(this.options.templatesDir + '/' + template);
            }.bind(this));

            return templates;
        },

        /**
         *
         * @param path
         * @returns {*}
         */
        compilePost: function (path) {

            var post = {};
            post.path = path;
            post.isPost = true;

            post.src = grunt.file.read(path);

            // add all front matter data to post object
            this.extend(post, this.parseFrontMatter(post.src));

            if (!post.template) {
                post.template = 'index';
            }

            post.contentRaw = this.parseMarkdownContent(post.src);
            post.summaryRaw = post.contentRaw.trim().split('\n')[0];

            post.content = marked(post.contentRaw);
            post.summary = marked(post.summaryRaw);

            if (post.date) {
                post.dateString = this.createDateString(post.date);
            }

            post.destPath = ['posts'];
            post.destPath.push(this.getNormalizedDate(post.date));
            post.destPath.push(post.title.toLowerCase().replace(/ /g, '-').replace(/,/g, ''));
            post.destPath.push('index.html');
            post.destPath = post.destPath.join('/');

            post.link = '/' + post.destPath.replace('index.html', '');

            return post;
        },

        /**
         *
         * @param path
         * @returns {*}
         */
        compilePage: function (path) {

            var post = {};
            post.path = path;
            post.isPage = true;

            post.src = grunt.file.read(path);

            // add all front matter data to post object
            this.extend(post, this.parseFrontMatter(post.src));

            if (!post.template) {
                post.template = 'index';
            }

            post.contentRaw = this.parseMarkdownContent(post.src);
            post.content = marked(post.contentRaw);

            post.destPath = post.path.split('/').pop().replace('.md', '.html');
            post.name = post.destPath.replace('.html', '');
            post.link = '/' + post.destPath;

            return post;
        },

        /**
         *
         * @param src
         * @returns {*}
         */
        parseFrontMatter: function (src) {

            var lines = src.split('\n');
            var frontMatter = [];

            if (lines[0][0] !== '-') {
                return {};
            }

            // remove start of front matter
            lines.shift();

            // get yaml front matter
            while (lines[0][0] !== '-') {
                frontMatter.push(lines.shift());
            }

            // remove end of front matter
            lines.shift();

            // add all front matter data to post object
            return yaml.safeLoad(frontMatter.join('\n'));
        },

        /**
         *
         * @param src
         * @returns {string}
         */
        parseMarkdownContent: function (src) {

            var lines = src.split('\n');

            if (lines[0][0] !== '-') {
                return lines.join('\n');
            }

            lines.shift();

            // get yaml front matter
            while (lines[0][0] !== '-') {
                lines.shift();
            }

            lines.shift();

            return lines.join('\n').trim();
        },

        /**
         *
         * @param date
         * @returns {string}
         */
        createDateString: function (date) {
            return [
                this.paddedNumber(date.getDate()),
                this.months[date.getMonth()],
                date.getFullYear()
            ].join(' ');
        },

        /**
         * @param {Date} date The date object
         * @param {String} [separator] Separator string, default is '/'
         * @returns {String}
         */
        getNormalizedDate: function (date, separator) {

            separator = separator || '/';

            var year = date.getFullYear();
            var month = this.paddedNumber(date.getMonth() + 1);
            var day = this.paddedNumber(date.getDate());

            return [year, month, day].join(separator);
        },

        /**
         * Pads a number with a leading '0'.
         * @param {Number} n
         * @returns {string}
         */
        paddedNumber: function (n) {
            return n < 10 ? '0' + n : n;
        },

        /**
         * Renders a single page or post.
         * @returns {Blog}
         */
        render: function (obj) {

            this.page = obj;

            obj.content = mustache.render(obj.content, this);

            if (obj.summary) {
                obj.summary = marked(mustache.render(obj.summary, this));
            }

            // generate html for this page
            var html = mustache.render(this.templates[obj.template], this, this.templates);
            html = beautify(html.replace(/\n/g, '').replace(/ +/g, ' '));

            // write page to destination
            grunt.file.write(this.options.dest + obj.destPath, html);
            grunt.log.ok(obj.destPath + ' created');
            return this;
        },

        /**
         * Renders all posts.
         * @returns {Blog}
         */
        renderPosts: function () {
            grunt.log.subhead('Rendering posts:');

            this.posts.sort(function (a, b) {
                return b.date - a.date;
            }).forEach(this.render.bind(this));

            return this;
        },

        /**
         * Renders all pages.
         * @returns {Blog}
         */
        renderPages: function () {
            grunt.log.subhead('Rendering pages:');
            this.pages.forEach(this.render.bind(this));
            return this;
        }

    };

    grunt.registerTask('blog', function () {

        var blog = new Blog(this.options({
            production: false,
            dest: 'build/',
            posts: 'posts/**/*',
            pages: 'pages/**/*',
            templatesDir: 'templates'
        }));

        blog.renderPosts();
        blog.renderPages()

    });

};