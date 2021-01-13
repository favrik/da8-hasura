import globalStyles from '../styles/global.js'
import { ApolloProvider } from '@apollo/client';
import createApolloClient from '../lib/apolloClient';

function Layout({ children }) {
  const client = createApolloClient();

  return (
    <ApolloProvider client={client}>
    <div className="page-layout">
      <ul className="main-menu">
        <li><a href="/plan">Plan</a></li>
        <li><a href="/todo">Todo</a></li>
        <li><a href="/journal">Journal</a></li>
      </ul>
      {children}
      <style jsx global>
        {globalStyles}
      </style>
    </div>
    </ApolloProvider>
  )
}

export default Layout
