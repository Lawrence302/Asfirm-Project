import React from 'react';
import { useState } from 'react';
import './styles/UploadProjectPic.css';
import axios from 'axios';

// in toolkit

import { useDispatch, useSelector } from 'react-redux';

// for random id
import { v4 } from 'uuid';
//using firebase
import { storage } from '../features/app/firebase'; // storage exported from our firebase files from js
import {
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage';

import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function UploatProjectFiles() {
  const [planUpload, setPlanUpload] = useState(null);
  const [success, setSuccess] = useState(false);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progressPercentage, setProgresspercent] = useState(0);
  // const [planLink, setPlanLink] = useState(null);
  // const planData = useSelector((state) => state.plan.data);
  // const dispatch = useDispatch();

  const plansListRef = ref(storage, 'projectPlan/');

  const submitPic = (e) => {
    e.preventDefault();
    // console.log('cliced');
    if (!planUpload) {
      alert('Choose a file ');
      return;
    } // if the planUpload is null then return

    const planRef = ref(storage, `projectPlan/${planUpload.name + v4()}`); //generating a random name for our file

    ///////////
    const uploadTask = uploadBytesResumable(planRef, planUpload);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgresspercent(progress);
        console.log('Upload is ' + progress + '% done');
        setLoading(true);
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          // setPlanLink(downloadURL);
          //////
          const accessToken = JSON.parse(
            localStorage.getItem('info')
          ).accessToken;
          const id = JSON.parse(localStorage.getItem('info')).id;
          const pid = JSON.parse(localStorage.getItem('projectId')).id;
          const API = `${import.meta.env.VITE_LINK_URL}/${pid}/uploadPlanFile`;
          axios
            .patch(API, { plan: downloadURL })
            .then((res) => {
              // console.log('in res upload ', res.data);
              // return res.data;
              setLoading(false);
              setSuccess(true);
            })
            .catch((e) => {
              if (e) {
                console.log(e.response);
              }
            });
          // alert('Picture uploaded');
        });
      }
    );
  };

  useEffect(() => {
    listAll(plansListRef).then((res) => {
      // console.log(' getting ', res);
      res.items.forEach((item) => {
        getDownloadURL(item)
          .then((url) => {
            setPlans((prev) => [...prev, url]); // grab the list and add ther url at the end
            // console.log(url);
          })
          .catch((e) => {
            console.log(e.response);
          });
      });
    });
  }, []);

  return (
    <div className="uploadPic-page">
      <form method="patch">
        <label htmlFor="plan">Upload plan : </label> <br />
        {/* pudding zero since we want only one file and it will be the first file in the array */}
        <input
          htmlFor="plan"
          type="file"
          onChange={(e) => {
            setPlanUpload(e.target.files[0]);
          }}
        />
        {/* <div>{progressPercentage}%</div> */}
        <div>
          {loading ? (
            'Loading...'
          ) : success ? (
            <span style={{ color: 'green' }}>Completed</span>
          ) : (
            ''
          )}
        </div>
        <button type="submit" onClick={(e) => submitPic(e)} disabled={success}>
          Upload Plan
        </button>
        {/* <br /> */}
        {/* <label htmlFor="thumbnail">Thumbnail for Project : </label> <br /> */}
        {/* <input htmlFor="thumbnail" type="file" /> */}
      </form>

      <button className="exit">
        {' '}
        <Link to="/user/dashboard">Save and Exit</Link>{' '}
      </button>
    </div>
  );
}

export default UploatProjectFiles;
