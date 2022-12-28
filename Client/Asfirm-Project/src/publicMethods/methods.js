import axios from 'axios';
import { getUserInfo } from '../features/user/userInfoSlice';
import { useSelector, useDispatch } from 'react-redux';

// public methods to be used in certain areas defined here
const accessToken = JSON.parse(localStorage.info).accessToken; // getting the token from storage
const id = JSON.parse(localStorage.info).id; // getting id from storage

//checking the user type
export const userType = async (id) => {
  //   const dispatch = useDispatch();

  const API = `http://localhost:3000/${id}/type`;
  console.log('the id used ', id);
  // const data = await axios
  axios
    .get(API)
    .then((res) => {
      console.log(res.data);
      console.log('done here in function call method', res.data);
      return res.data;
    })
    .catch((e) => {
      console.log(e.response);
    });
  // console.log('before return ', data);
  // return data;
};
