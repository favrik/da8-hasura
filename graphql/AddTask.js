import { useMutation } from "@apollo/react-hooks";
import gql from 'graphql-tag';

const ADD_TASK = gql`
  mutation AddTask
`;

const addTask = (task) => useMutation();

export default addTask;
