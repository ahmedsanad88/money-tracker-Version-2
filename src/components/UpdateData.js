//jshint esversion:6

import React, { useEffect, useState } from 'react';
import db from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import "./UpdateData.css";
import Aos from "aos";
import "aos/dist/aos.css";


function UpdateData() {
    // state check earn & spend money..
    const [earnMoney, setEarnMoney] = useState(0);
    const [spendMoney, setSpendMoney] = useState(0);
    // user state follow up
    const user = useSelector(state => state.user.user);

    // getting the day and month as numbers...
    var date = new Date();
    var daydate = date.getDate();
    let currentMonth = date.getMonth();
    let year = date.getFullYear();

    // show update message to the client
    const message = document.querySelector('.updateMessage');


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

    // adding daily spend and earn to firestore db.
    const handleMoney = async (e) => {
        e.preventDefault();
        if (earnMoney > 0 || spendMoney > 0) {

            if (earnMoney !== "" && spendMoney !== "") {

                // db.collection('users').doc(user.id).collection('dailyMonitor').add({
                //     day: daydate,
                //     month: currentMonth,
                //     year: year,
                //     dailyEarn: earnMoney,
                //     dailySpend: spendMoney
                // }).then(() => {
                //     console.log('data saved');
                //     setEarnMoney(0);
                //     setSpendMoney(0);
                // }
                // ).catch(error => alert(error.message));

                const userData = collection(db, 'users', user.id, 'dailyMonitor');
                addDoc(userData, {
                    day: daydate,
                    month: currentMonth,
                    year: year,
                    dailyEarn: earnMoney,
                    dailySpend: spendMoney
                })
                .then(() => {
                    // console.log('data saved');
                    setEarnMoney(0);
                    setSpendMoney(0);
                    message.classList.remove('scaleOut');
                    message.classList.add('showMessage');
                    setTimeout(() => {
                        message.classList.remove('showMessage');
                        message.classList.add('scaleOut');
                    },3000);
                }).catch(error => alert(error.message));

            }else {
                alert("please fill unused field with Zero.");
            }
      
        } else {
            alert('Please add your earn or spend money');
        }
    };

    return (
        <div className="updateData">
            <div data-aos="fade-up" className="updateData__main">
            {/* background image for earn and spend data. */}
                <div className="img">
                    <img src={process.env.PUBLIC_URL + "images/dataPage.svg"} alt="backgroundimage" />
                </div>
                <div className="updateData_title">
                    <h3>Update Your Earn & Your spent Money</h3>
                </div>
                {/* Message to visualize the update for records to the clients */}
                <div className='updateMessage scaleOut'>
                    <p>Your records updated.💸</p>
                </div>
                {/* input form container */}
                <form>
                    <div className="input_container">
                        <div className="earnInput">
                            <input type="number" name="earn" placeholder="Enter Numbers Only" min="0" max="10000000" autoFocus onChange={(e) => setEarnMoney(e.target.value)} value={earnMoney}/>
                            <h2>EARN ($)</h2>
                        </div>
                        <div className="earnInput">
                            <input type="number" name="spent" placeholder="Enter Numbers Only" min="0" max="10000000" onChange={(e) => setSpendMoney(e.target.value)} value={spendMoney}/>
                            <h2>DAILY SPENT ($)</h2>
                        </div>
                    </div>
                    {/* btn handle submit and reset form */}
                    <div className="btn">
                        <input type="submit" name="submit" value="UPDATE" onClick={(e) => handleMoney(e)}/>
                        <input id="reset" type="reset" name="reset" value="RESET"/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateData;
