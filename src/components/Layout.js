import globalStyles from '../styles/global.js'
import { ApolloProvider } from '@apollo/client';
import createApolloClient from '../lib/apolloClient';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const PageLinkAnchor = React.forwardRef((props, ref) => {
  return (
    <a className={props.current} href={props.href}>{props.title}
    <style jsx>{`
    a, a:visited {
      text-decoration: none;
      font-family: Georgia, serif;
      border-top: 4px solid transparent;
      display: block;
      padding: 10px 0;
      letter-spacing: 1px;
      font-size: 1.4em;
      color: #000;
    }

    a.current {
      border-top: 4px solid #000;
    }
    `}</style>
    </a>
  );
});

const PageLink = ({ path }) => {
  const router = useRouter();
  const currentPath = router.pathname;
  const currentClass = currentPath === path ? 'current' : '';
  const navigation = {
    '/': 'plan',
    '/todo': 'todo',
    '/journal': 'journal'
  };

  return (
    <Link href={path} passHref>
      <PageLinkAnchor current={currentClass} title={navigation[path]} />
    </Link>
  );
};

function Layout({ children }) {
  const client = createApolloClient();

  return (
    <ApolloProvider client={client}>
      <div className="page-layout">
        <ul className="main-menu">
          <li><PageLink path="/" /></li>
          <li><PageLink path="/todo" /></li>
          <li><PageLink path="/journal" /></li>
        </ul>
        {children}
        <style jsx global>
          {globalStyles}
        </style>
        <style jsx>{`
          ul {
            margin-left: 0;
            padding-left: 0;
            display: grid;
            gap: 0px;
            grid-template-columns: repeat(auto-fill, minmax(8em, 1fr));
          }

          li {
            font-family: Georgia, serif;
            text-align: center;
            list-style-type: none;
            text-transform: uppercase;
          }
        `}</style>
      </div>
    </ApolloProvider>
  );
}

export default Layout
