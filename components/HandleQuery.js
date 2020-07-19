const HandleQuery = ({ loading, error, children }) => {
  if (loading) {
    return 'Loading';
  }

  if (error) {
    return 'error';
  }

  return children;
};

export default HandleQuery;
