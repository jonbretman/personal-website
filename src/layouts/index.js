import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

import './main.less';

const Header = () => (
    <header className={'main-header'}>
        <div className={'container'}>
            <h1 className={'main-header__heading text-center'}>
                <Link to="/">jon.bretman</Link>
            </h1>
            <ul className={'social-icons'}>
                <li className={'social-icons-item'}>
                    <a
                        href="http://www.github.com/jonbretman/"
                        className={'social-icons-img social-icons-img-github'}
                    ></a>
                </li>
                <li className={'social-icons-item'}>
                    <a
                        href="http://www.twitter.com/jonbretman/"
                        className={'social-icons-img social-icons-img-twitter'}
                    ></a>
                </li>
            </ul>
        </div>
    </header>
);

function Footer() {
    return (
        <footer className={"main-footer"}>
            <div className={"container"}>
                <div className={"grid"}>
                    <div className={"unit one-of-two"}>
                        <h4>About</h4>
                        <p>
                            Director of Engineering at <a href="https://www.echo.co.uk">Echo</a>. Sometimes I say
                            things on <a href="http://twitter.com/jonbretman">Twitter</a>, put code 
                            on <a href="http://www.github.com/jonbretman">Github</a>, and occasionally 
                            give <a href="https://speakerdeck.com/jonbretman">talks</a> on code related matters.
                            If I'm not doing any of these things I am probably <a href="https://soundcloud.com/jonbretman">playing guitar</a>.
                        </p>
                        <p><Link to={"/about.html"}>Read More...</Link></p>
                    </div>
                    <div className={"unit one-of-two"}>
                        <h4>Credits</h4>
                        <p>
                            This site is built using <a href="https://www.gatsbyjs.org/">Gatsby</a>, fonts are
                            from <a href="http://www.google.com/fonts/">Google Fonts</a>, CSS 
                            uses <a href="http://necolas.github.io/normalize.css/">Normalize.css</a> and some 
                            of <a href="http://daneden.me/toast/">Toast.css</a>.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

const TemplateWrapper = ({ children }) => (
    <div>
        <Helmet
            title="Jon Bretman"
            meta={[
                { name: 'description', content: 'Sample' },
                { name: 'keywords', content: 'sample, something' },
                {
                    name: 'viewport',
                    content:
                    'width=device-width, initial-scale=1.0, maximum-scale=1.0',
                },
            ]}
        >
            <link
                href="http://fonts.googleapis.com/css?family=Lato:400,700"
                rel="stylesheet"
                type="text/css"
            />
        </Helmet>
        <Header />
        <section className={'main-content'}>
            <div className={'container'}>{children()}</div>
        </section>
        <Footer />
    </div>
);

TemplateWrapper.propTypes = {
    children: PropTypes.func,
};

export default TemplateWrapper;
