import globalStyles from '../styles/global.js'
import { ApolloProvider } from '@apollo/client';
import createApolloClient from '../lib/apolloClient';
import Link from 'next/link';
import { useRouter } from 'next/router';


const PageLink = ({ path }) => {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <Link href={path}><a className={currentPath === path ? 'current' : ''}>{path.slice(1)}</a></Link>
  );
};

function Layout({ children }) {
  const client = createApolloClient();

  return (
    <ApolloProvider client={client}>
      <div className="page-layout">
        <ul className="main-menu">
          <li><PageLink path="/plan" /></li>
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
            gap: 30px;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          }

          li {
            font-family: Georgia, serif;
            font-size: 1.4em;
            text-align: center;
            list-style-type: none;
            text-transform: uppercase;
            border-top: 3px solid #000;
            padding: 10px 30px;
            display: block;

          }
          a {
            text-decoration: none !important;
            font-family: Georgia, serif;
          }
        `}</style>
      </div>
    </ApolloProvider>
  );
}

export default Layout
