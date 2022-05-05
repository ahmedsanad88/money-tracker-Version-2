//jshint esversion:6

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { Avatar } from '@material-ui/core';
import Aos from "aos";
import "aos/dist/aos.css";

import CirclePercentage from './dashboard/CirclePercentage';
import DailySpend from "./dashboard/DailySpend";
import ChartShow from "./dashboard/ChartShow";
import Balance from "./dashboard/Balance";
import { login } from "../features/userSlice";
import db from './firebase';
import "./Data.css";
import logo from "../images/logo.png";



function Data() {

    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    
    const [total, setTotal] = useState([]);
    // console.log(total);

    // prepare date
    const date = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    // console.log(date.toLocaleDateString('en-US', options));
    const todayDate = date.toLocaleDateString('en-US', options);


    let subTotalEarn = 0;
    let subTotalSpend = 0;
// console.log(total);
    useEffect(() => {
        if (user.id) {
            const colRef = collection(db, 'users', user.id, 'dailyMonitor');

            const q = query(colRef, orderBy('day','desc'));


            const unsubDocs = onSnapshot(q, (snapshot) => {
                setTotal(snapshot.docs.map((doc) => ({
                    key: doc.id,
                    day: doc.data().day,
                    month: doc.data().month,
                    year: doc.data().year,
                    dailyEarn: doc.data().dailyEarn,
                    dailySpend: doc.data().dailySpend,
                })));
            });

        return () => unsubDocs();
        } else {
            console.log("There is no user Found");
        }
    }, [user.id]);

    useEffect(() => {
        setTotalMoney();
    }, [total]);

    const setTotalMoney = () => {
        if (total.length > 0) {
            for (let i = 0; i < total.length; i++) {
                subTotalEarn += parseInt(total[i].dailyEarn);
                subTotalSpend += parseInt(total[i].dailySpend);
            }
            dispatch(login({
                id: user.id,
                email: user.email,
                photo: null,
                fullname: null,
                mobile: null,
                gender: null,
                country: null,
                totalEarn: subTotalEarn,
                totalSpend: subTotalSpend
            })
            );
        }
    };
    // console.log(total);
    // console.log(user);
    
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

    return (
        <div className="data">
            <div className="data__main">
                <div className="data__header">
                    {/* <h2>Dashboard </h2> */}
                    <Avatar className="logo" alt='logo' src={logo} />
                    <h4 id="todayDate">{todayDate}</h4>
                </div>
                <div data-aos="fade-down" className="row1">
                    <Balance />
                </div>
                <div className='middleDiv'>
                    <div data-aos="fade-right" className="row2">
                        <CirclePercentage />
                    </div>
                    <div data-aos="fade-left" className="row3">
                        <ChartShow total={total} />
                    </div>
                </div>
                <div data-aos="fade-right" className="row4">
                    <DailySpend total={total} />
                </div>
            </div>
        </div>
    )
}

export default Data;
