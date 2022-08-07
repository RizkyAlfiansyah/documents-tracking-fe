import Head from 'next/head';
import React from 'react';

const Header = ({ title, description }) => {
    return (
        <React.Fragment>
            <Head>
                <title>{title}</title>
                <meta charSet="UTF-8" />
                <meta name="description" content={description} />
                <meta name="og:title" property="og:title" content={title} />
                <meta name="og:description" property="og:description" content={description} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
            </Head>
        </React.Fragment>
    );
};

export default Header;
