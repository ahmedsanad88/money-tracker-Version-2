//jshint esversion:6

import React, { useEffect, useState } from 'react';
import "./UserSidebar.css";
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import PieChartIcon from '@material-ui/icons/PieChart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../features/userSlice";
import { auth } from './firebase';
import db from './firebase';
import { collection, getDoc, doc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';



function UserSidebar() {
    // Update and use user state.
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    // state to handle user data from firebase.
    const [userDoc, setUserDoc] = useState({});
    // navigate between different pages inside our app.
    let navigate = useNavigate();

    //  Selector for all buttons to control them togther.
    const allClickedBtn = document.querySelectorAll('.IconBtn');
    
    let location = useLocation();
    let name = location.pathname;
    useEffect(() => {
        // hadnle which button has been clicked and adding clicked class style to it.
        allClickedBtn.forEach((btn) => {
            btn.classList.remove('clicked');
            if (btn.classList.contains(name)) {
                btn.classList.add('clicked');
            }
        });        
    }, [name, allClickedBtn]);

    // function handle side manu to hide or expand it.
    const handleManu = () => {
        document.getElementById('openSidebar').classList.toggle('expand');
        document.getElementById('middlediv').classList.toggle('hide');
        document.getElementById('topDiv').classList.toggle('topMove');
        document.getElementById('lowDiv').classList.toggle('bottomMove');
        document.getElementById('manuContainer').classList.toggle('alignClose');
        if(document.getElementById('showSidebar').classList.contains('show')) {
            document.getElementById('showSidebar').classList.toggle('show');        
        } else {
            setTimeout(() => {
                document.getElementById('showSidebar').classList.toggle('show');
            }, 1000);
        }
    };

    // function which handle user logout.
    const handleLogout = () => {
        dispatch(logout());
        // auth.signOut();
        signOut(auth);
    };

    // console.log(userDoc);
    // fetching data from firebase by using useEffect & async
    useEffect(() => {
        const fetchUserData = async () => {
            // const userData = db.collection('users').doc(user.id);
            // const doc = await userData.get();
            // if (!doc.exists) {
            // console.log('No such document!');
            // } else {
            // // console.log(doc.data());
            // setDoc(doc.data());
            // }
            const colRef = collection(db, 'users');
            const userData = doc(colRef, user.id);

            const docRef = await getDoc(userData);
            // console.log(docRef.data());
            if (!docRef.exists()) {
                console.log('No such document!');
            } else {
                // console.log(doc.data());
                setUserDoc(docRef.data());
            }
        };
        // if (user.id) {
            fetchUserData();
        // } else {
        //     console.log("No User found inside login");
        // }
    }, [user.id]);

    return (
        <div id="openSidebar" className="userSidebar">
        {/* hamburger icon */}
            <div id="manuContainer" className="manu" onClick={handleManu}>
                <div id="topDiv"></div>
                <div id="middlediv"></div>
                <div id="lowDiv"></div>
            </div>
            <div id="showSidebar" className="userSidebar__main">
                <div className="userSidebar__user">
                    <div className="userSidebar__userImg">
                        <Avatar alt="user image" src={userDoc.photo} />
                    </div>
                    <div className="userSidebar__userDetails">
                        <h3>{user? userDoc.fullname : "Name"}</h3>
                        <h3 id="emailSpace">{user ? user.email : 'Email'}</h3>
                        <h3>{user ? userDoc.country : 'country'}</h3>
                    </div>
                </div>
                {/* home page link */}
                <div className="userSidebar__nav">
                    <div className="dashboard">
                        <IconButton id="home" className="IconBtn /" onClick={
                            () => navigate("/")
                        }>
                            <h4>Dashboard</h4>
                            <HomeIcon />
                        </IconButton>   
                    </div>
                    {/* update earn & spend data page link */}
                    <div className="dataEnter">
                        <IconButton id="udateData" className="IconBtn /updateData" onClick={
                            () => navigate("/updateData")
                        }>
                            <h4>UpdateData</h4>
                            <DataUsageIcon />
                        </IconButton>   
                    </div>
                    {/* calculation page link */}
                    <div className="calc">
                        <IconButton id="calc" className="IconBtn /calculator" onClick={
                            () => navigate("/calculator")
                        }>
                            <h4>Calculator</h4>
                            <PieChartIcon />
                        </IconButton>   
                    </div>
                    {/* Profile page link */}
                    <div className="profilePage">
                        <IconButton id="profile" className="IconBtn /profile" onClick={
                            () => navigate("/profile")
                        }>
                            <h4>Profile</h4>
                            <AccountCircleIcon />
                        </IconButton>   
                    </div>
                </div>
                {/* side bar logout btn */}
                <div className="userSidebar__logout">
                    <div className="logout">
                        <IconButton className="IconBtn" onClick={handleLogout}>
                            <h4>Logout</h4>
                            <ExitToAppIcon />
                        </IconButton>   
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserSidebar;
