import globalStyles from '../styles/global.js'
import { ApolloProvider } from '@apollo/react-hooks';
import createApolloClient from '../lib/apolloClient';

function Layout({ children }) {
  const client = createApolloClient();

  return (
    <ApolloProvider client={client}>
    <div className="page-layout">
      {children}
      <style jsx global>
        {globalStyles}
      </style>
    </div>
    </ApolloProvider>
  )
}

export default Layout
