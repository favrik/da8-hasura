const HandleQuery = ({ query, children }) => {
  const { loading, data, error } = query;

  if (loading) {
    return 'Loading';
  }

  if (error) {
    return 'error';
  }

  return children(data);
};

export default HandleQuery;
