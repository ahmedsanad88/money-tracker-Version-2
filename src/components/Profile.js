//jshint esversion:6

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import db from './firebase';
import { firebaseApp } from "./firebase";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { collection, doc, setDoc } from 'firebase/firestore';
import { login } from "../features/userSlice";
import "./Profile.css";
import { useNavigate } from 'react-router-dom';
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';


function Profile() {
    // state which handle the returned image URL from firebase storage.
    const [imageUrl, setImageUrl] = useState(null);
    // inputs states.
    const [fullName, setFullName] = useState('');
    const [number, setNumber] = useState('');
    const [gender, setGender] = useState('');
    const [country, setCountry] = useState('');

    // console.log(fullName);

    // user state handler
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    // Contorl AOS animation..
    useEffect(() => {
        // initailize Aos
        Aos.init({
            duration: 2000
        });
        // make sure it's applying only one
        Aos.init({
            once: true,
            disable: 'phone'
        });
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
        if (fullName !== "" && country !== "" && imageUrl) {
            if (validateImage) {
                // collection reference which accept the database and collection name.
                const colRef = collection(db, 'users');
                const docRef = doc(colRef, user.id);
                // const q = query(colRef, where('user.uid', "==", user.id));

        // console.log(docRef);

                setDoc(docRef, {
                    email: user.email,
                    photo: imageUrl,
                    fullname: fullName,
                    mobile: number? number : "",
                    gender: gender ? gender : "",
                    country: country,
                    totalEarn: user.totalEarn,
                    totalSpend: user.totalSpend
                })
                .then(() => {
                    dispatch(login({
                        id: user.id,
                        email: user.email,
                        photo: imageUrl,
                        fullname: fullName,
                        mobile: number? number : "",
                        gender: gender ? gender : "",
                        country: country,
                        totalEarn: user.totalEarn,
                        totalSpend: user.totalSpend
                    })
                    );
                    // shown confirmation to user once data accepted.
                    document.getElementById('success').style.display="block";
                    setFullName('');
                    setNumber('');
                    setGender('');
                    setCountry('');
                    document.getElementById('photo').value = '';
                    
                    setTimeout(() => {
                        document.getElementById('success').style.display="none";
                    }, 1500);           
                    setTimeout(() => {
                        window.location.reload();
                        navigate('/');
                    }, 5000);                           
                });

                // db.collection('users').doc(user.id).set({
                //     email: user.email,
                //     photo: imageUrl,
                //     fullname: fullName,
                //     mobile: number? number : "",
                //     gender: gender ? gender : "",
                //     country: country,
                //     totalEarn: user.totalEarn,
                //     totalSpend: user.totalSpend
                // }, { merge: true });
                // console.log("user data updated"); 
                // dispatch this data to update the customer details on the app.
              
            } else {
                alert("Please use jpeg & jpg & png images");
            }
        } else {
            alert("please fill at least your name and country and image");
        }
        /* 
            reload will help all new data to reflect on our app as static until client change our update them instead of using them through 
            state which will be effect through every transfer.
        */
    };

    // disable all inputs until user request to edit them.
    const enableEditing = () => {
        document.getElementById('fullName').disabled = false;
        document.getElementById('number').disabled = false;
        document.getElementById('gender').disabled = false;
        document.getElementById('country').disabled = false;
        document.getElementById('photo').disabled = false;
    };

    // validate the image
    const validateImage = async () => {
        var formData = new FormData();
        var file = document.getElementById("photo").files[0];
        formData.append("Filedata", file);
        // check file extension and match it..
        var ext = file.type.split('/').pop().toLowerCase();
        if (ext !== "jpeg" && ext !== "jpg" && ext !== "png") {
            alert('Please select a valid jpeg & jpg & png images only');
            document.getElementById("photo").value = '';
            return false;
        }
        // checking file size to set limit for it..
        if (file.size > 4194304) {
            alert('Max Upload size is 4MB only');
            document.getElementById("photo").value = '';
            return false;
        }
        
        //set storage option by using firebase storage to save the image and get the url only an deal with it.
        // const storageRef = firebaseApp.storage().ref();
        const storage = getStorage(firebaseApp);
        const storageRef = ref(storage, file.name);
        // const fileRef = storageRef.child(file.name);
        // await fileRef.put(file);
        const uploadTask = await uploadBytesResumable(storageRef, file);
        setImageUrl(await getDownloadURL(storageRef));
        // setImageUrl(await uploadTask.getDownloadURL());
        document.getElementById('submitData').classList.remove("btnDeactivate");
        return true;
    };
    // console.log(imageUrl);
    
    return (
        <div className="profile">
            <div className="profile_head">
                <h3>Update profile</h3>
            </div>
            <div data-aos="fade-up" className="profile_main">
            <div className="profileStatus">
                <div id="success" className="succeed">
                    <p>Your Data Updated successfully.🤗</p>
                    <p>Will tranfer you to home page 🏠 within 5 Seconds.🤗</p>
                </div>
                <div id="fail" className="failed">
                    <p>Problem happened while update your data please try again.😟</p>
                </div>
            </div>
            {/* using control form */}
                <form id="userForm">
                    <div className="input_style">
                        <label htmlFor="fullName">FULL NAME</label>
                        <input disabled id="fullName" type="text" name="name" required onChange={(e) => setFullName(e.target.value)} value={fullName}/>
                    </div>
                    <div className="input_style">
                        <label htmlFor="email">EMAIL</label>
                        <input disabled id="email" type="email" name="email" value={user?.email}/>
                    </div>
                    <div className="input_style">
                        <label htmlFor="number">PHONE</label>
                        <input disabled id="number" type="text" name="phone" onChange={(e) => setNumber(e.target.value)} value={number}/>
                    </div>
                    <div className="input_style">
                        <label htmlFor="gender">GENDER</label>
                        <select disabled id="gender" name="gender" onChange={(e) => setGender(e.target.value)} value={gender}>
                            <option value="">Choose One</option>
                            <option value="MALE">MALE</option>
                            <option value="FEMALE">FEMALE</option>
                        </select>
                    </div>
                    <div className="input_style">
                        <label htmlFor="country">COUNTRY</label>
                        <input disabled id="country" type="text" name="country" required onChange={(e) => setCountry(e.target.value)} value={country}/>
                    </div>
                    <div className="input_style img_style">
                        <label htmlFor="photo">PROFILE IMAGE(png or jpg)</label>
                        <input disabled id="photo" type="file" name="image" accept="image/png, image/jpeg" onChange={validateImage} required />
                    </div>
                    <div>
                        <input id="submitData" className='btnDeactivate' type="submit" value="SAVE" onClick={(e) => updateUserData(e)}/>
                        <input id="editData" type="reset" value="EDIT" onClick={enableEditing}/>
                    </div>
                </form>
                <div className="form_description">
                    <small><q>
                        Click Edit to change or update your Data then Save.
                    </q></small>
                </div>
            </div>
        </div>
    )
}

export default Profile;
