const Today = ({ data }) => {

  return (
    <ol>
      {data['plans'].map(item => <li>{item}</li>)}
    </ol>
  );
};

export default Today;
