/* eslint-disable prettier/prettier */
import axios from 'axios';
export const sendData = async data =>
  await axios.post('http://10.0.2.2:3000/handle', data);
