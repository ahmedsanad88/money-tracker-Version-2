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
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { login } from "../features/userSlice";




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
        // handle which button has been clicked and adding clicked class style to it.
        allClickedBtn.forEach((btn) => {
            btn.classList.remove('clicked');
            if (btn.classList.contains(name)) {
                btn.classList.add('clicked');
            }
        });        
    }, [name, allClickedBtn]);

    // function handle side manu to hide or expand it.
    const handleManu = () => {
        document.getElementById('middlediv').classList.toggle('hide');
        document.getElementById('topDiv').classList.toggle('topMove');
        document.getElementById('lowDiv').classList.toggle('bottomMove');
        document.getElementById('manuContainer').classList.toggle('alignClose');
        document.getElementById('showSidebar').classList.remove('show');
        
        if(document.getElementById('openSidebar').classList.contains('expand')){
            document.getElementById('openSidebar').classList.add('removeExpand');
            document.getElementById('openSidebar').classList.remove('expand');
        }else{
            document.getElementById('openSidebar').classList.add('expand');
            document.getElementById('openSidebar').classList.remove('removeExpand');
            setTimeout(() => {
                document.getElementById('showSidebar').classList.add('show');
            }, 400);        
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

            const colRef = collection(db, 'users');
            const userData = doc(colRef, user.id);
            // real-time listen for user data update.
            const unsub = onSnapshot(userData, (doc) => {
                // console.log("Current data: ", doc.data());
                setUserDoc(doc.data());
                dispatch(login({
                    id: user.id,
                    ...doc.data()
                    })
                );
            });

            // incase of read data once.
            // const docRef = await getDoc(userData);
            // // console.log(docRef.data());
            // if (!docRef.exists()) {
            //     console.log('No such document!');
            // } else {
            //     // console.log(doc.data());
            //     setUserDoc(docRef.data());
            //     dispatch(login({
            //         id: user.id,
            //         ...docRef.data()
            //         })
            //     )
            // }
        };
        if (user.id) {
            return fetchUserData();
        } else {
            return console.log("Fetching Data");
        }
    }, [user.id, dispatch]);
    
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
                        <Avatar className='userAvatar' alt={user? userDoc.fullname : user.fullname} src={user && userDoc?.photo} >{user ? user.fullname?.charAt(0).toUpperCase() : userDoc.fullname?.charAt(0).toUpperCase()}</Avatar>
                    </div>
                    <div className="userSidebar__userDetails">
                        <h3>{user? userDoc.fullname : "Name"}</h3>
                        <h3 id="emailSpace">{user ? user.email : userDoc.email}</h3>
                        <h3>{user ? userDoc.country : user.country}</h3>
                    </div>
                </div>
                {/* home page link */}
                <div className="userSidebar__nav">
                    <div className="dashboard">
                        <IconButton id="home" className="IconBtn /" onClick={
                            () => {
                                    navigate("/");
                                    handleManu();
                                }
                        }>
                            <h4>Dashboard</h4>
                            <HomeIcon />
                        </IconButton>   
                    </div>
                    {/* update earn & spend data page link */}
                    <div className="dataEnter">
                        <IconButton id="udateData" className="IconBtn /updateData" onClick={
                            () => {
                                    navigate("/updateData");
                                    handleManu();
                                }
                        }>
                            <h4>UpdateData</h4>
                            <DataUsageIcon />
                        </IconButton>   
                    </div>
                    {/* calculation page link */}
                    <div className="calc">
                        <IconButton id="calc" className="IconBtn /calculator" onClick={
                            () => {
                                    navigate("/calculator");
                                    handleManu();
                                }
                        }>
                            <h4>Calculator</h4>
                            <PieChartIcon />
                        </IconButton>   
                    </div>
                    {/* Profile page link */}
                    <div className="profilePage">
                        <IconButton id="profile" className="IconBtn /profile" onClick={
                            () => {
                                    navigate("/profile");
                                    handleManu();
                                }
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
