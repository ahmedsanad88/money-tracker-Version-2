//jshint esversion:6
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { firebaseApp } from "./firebase";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { collection, doc, setDoc } from "firebase/firestore";
import Aos from "aos";
import "aos/dist/aos.css";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import db from "./firebase";
import "./Profile.css";
import CustomMessage from "./error/CustomMessage";

const defaultError = {
  message: "Message: ",
  isShown: false,
  isSuccess: false,
};

function Profile() {
  // progress state
  const [progress, setProgress] = useState(0);
  // state which handle the returned image URL from firebase storage.
  const [photo, setPhoto] = useState(null);
  // inputs states.
  const [fullname, setFullname] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");

  const [showError, setShowError] = useState(defaultError);

  // Global array for input checker
  let checkerObj = {};
  let inputCounter = 0;

  // user state handler
  const user = useSelector((state) => state.user.user);
  // console.log(user);

  // Contorl AOS animation..
  useEffect(() => {
    let checker = true;

    if (checker) {
      // initailize Aos
      Aos.init({
        duration: 1000,
      });
      // make sure it's applying only one
      Aos.init({
        once: true,
        disable: "phone",
      });
    }

    return () => {
      checker = false;
    };
  }, []);

  // function which will handle update user data on db & state.
  const updateUserData = (e) => {
    e.preventDefault();
    //////// incase of prefer uncontrol form.
    // handle all user data update on database
    // let fullName = document.getElementById('fullName').value;
    // let number = document.getElementById('number').value;
    // let gender = document.getElementById('gender').value;
    // let country = document.getElementById('country').value;
    // let image = document.getElementById('photo').files[0].name;

    // validate the data input.
    if (inputChecker()) {
      if (inputCounter > 0) {
        formUpdate();
      } else {
        handleMessage(
          "please fill the fields that you want to update it.",
          false
        );
      }
      inputCounter = 0;
      checkerObj = {};
    }
    /* 
            reload will help all new data to reflect on our app as static until client change our update them instead of using them through 
            state which will be effect through every transfer.
        */
  };

  // show and hide error message function
  function handleMessage(text, bool) {
    if (showError.isShown === true) return;
    setShowError((prev) => ({
      ...prev,
      message: prev.message + text,
      isShown: true,
      isSuccess: bool,
    }));
    setTimeout(() => {
      setShowError(defaultError);
    }, 2500);
  }

  // Function to check only the used input to update the user profile.
  const inputChecker = () => {
    if (fullname.trim() !== "") {
      checkerObj.fullname = fullname.trim().toString();
      inputCounter++;
    }
    if (mobile.trim() !== "") {
      checkerObj.mobile = mobile.trim().toString();
      inputCounter++;
    }
    if (gender.trim() !== "") {
      checkerObj.gender = gender.trim().toString();
      inputCounter++;
    }
    if (country.trim() !== "") {
      checkerObj.country = country.trim().toString();
      inputCounter++;
    }
    if (photo !== null) {
      if (validateImage) {
        checkerObj.photo = photo;
        inputCounter++;
      }
    }
    return true;
  };

  // Communicate with the DB to update the user details.
  const formUpdate = () => {
    // collection reference which accept the database and collection name.
    const colRef = collection(db, "users");
    const docRef = doc(colRef, user.id);

    setDoc(
      docRef,
      {
        // email: user.email,
        // totalEarn: user.totalEarn ? "" : user.totalEarn,
        // totalSpend: user.totalSpend ? "" : user.totalSpend,
        ...checkerObj,
      },
      { merge: true }
    )
      .then(() => {
        // shown confirmation to user once data accepted.
        handleMessage("Working to update your profile.👨🏽‍💻", true);
        setFullname("");
        setMobile("");
        setGender("");
        setCountry("");
        setPhoto(null);
        document.getElementById("photo").value = null;
      })
      .catch((error) => {
        handleMessage(
          "Problem happened while update your data please try again.😪",
          false
        );
      });
  };

  // validate the image
  const validateImage = async () => {
    var formData = new FormData();
    var file = document.getElementById("photo").files[0];
    formData.append("Filedata", file);
    // check file extension and match it..
    var ext = file.type.split("/").pop().toLowerCase();
    if (ext !== "jpeg" && ext !== "jpg" && ext !== "png") {
      alert("Please select a valid jpeg & jpg & png images only");
      document.getElementById("photo").value = "";
      return false;
    }
    // checking file size to set limit for it..
    if (file.size > 4194304) {
      alert("Max Upload size is 4MB only");
      document.getElementById("photo").value = "";
      return false;
    }

    //set storage option by using firebase storage to save the image and get the url only an deal with it.
    const storage = getStorage(firebaseApp);
    const storageRef = ref(storage, file.name);

    const uploadTask = uploadBytesResumable(storageRef, file);

    document.getElementById("show_status").style.display = "flex";
    // check the status of uploading.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const loading = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(Math.floor(loading));
        if (loading >= 100) {
          document.getElementById("uploadDone").style.display = "inline-block";
          setTimeout(() => {
            document.getElementById("show_status").style.display = "none";
            setProgress(0);
            document.getElementById("uploadDone").style.display = "none";
          }, 3000);
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        handleMessage(error.message, false);
        return false;
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(storageRef).then((downloadURL) => {
          setPhoto(downloadURL);
        });
        handleMessage("Image uploaded Successfully", true);
        return true;
      }
    );
  };

  return (
    <div className="profile">
      <CustomMessage
        message={showError.message}
        isShown={showError.isShown}
        isSuccess={showError.isSuccess}
      />
      <div data-aos="zoom-in" className="profile_main">
        <div className="profile_head">
          <h3>Update profile</h3>
        </div>
        {/* using control form */}
        <form id="userForm">
          <div className="input_style">
            <label htmlFor="fullName">FULL NAME</label>
            <input
              id="fullName"
              type="text"
              name="name"
              required
              onChange={(e) => setFullname(e.target.value)}
              value={fullname}
            />
          </div>
          <div className="input_style">
            <label htmlFor="number">PHONE</label>
            <input
              id="number"
              type="text"
              name="phone"
              onChange={(e) => setMobile(e.target.value)}
              value={mobile}
            />
          </div>
          <div className="input_style">
            <label htmlFor="gender">GENDER</label>
            <select
              id="gender"
              name="gender"
              onChange={(e) => setGender(e.target.value)}
              value={gender}
            >
              <option value="">Choose One</option>
              <option value="male">MALE</option>
              <option value="female">FEMALE</option>
              <option value="not selected">Prefer Not to select</option>
            </select>
          </div>
          <div className="input_style">
            <label htmlFor="country">COUNTRY</label>
            <input
              id="country"
              type="text"
              name="country"
              required
              onChange={(e) => setCountry(e.target.value)}
              value={country}
            />
          </div>
          <div className="input_style img_style">
            <label htmlFor="photo">PROFILE IMAGE(png or jpg)</label>
            <input
              id="photo"
              type="file"
              name="image"
              accept="image/png, image/jpeg"
              onChange={validateImage}
              required
            />
          </div>
          <div id="show_status">
            <progress value={progress} max="100" />
            <small className="percentageText">{progress}%</small>
            <CheckCircleIcon
              id="uploadDone"
              style={{ color: "green", marginLeft: "10px" }}
            />
          </div>
          <div>
            <input
              id="submitData"
              type="submit"
              value="SAVE"
              onClick={(e) => updateUserData(e)}
            />
          </div>
        </form>
        <div className="form_description">
          <small>
            <q>Update your Data then click save.</q>
          </small>
        </div>
      </div>
    </div>
  );
}

export default Profile;
