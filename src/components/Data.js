//jshint esversion:6
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { Avatar } from "@material-ui/core";
import Aos from "aos";
import "aos/dist/aos.css";

import CirclePercentage from "./dashboard/CirclePercentage";
import DailySpend from "./dashboard/DailySpend";
import ChartShow from "./dashboard/ChartShow";
import Balance from "./dashboard/Balance";
import { login } from "../features/userSlice";
import db from "./firebase";
import "./Data.css";
import logo from "../images/logo.png";
import { useMemo } from "react";

// compute the total amount spent and earned.
function setTotalMoney(total) {
  let subTotalEarn = 0;
  let subTotalSpend = 0;
  if (total.length > 0) {
    for (let i = 0; i < total.length; i++) {
      subTotalEarn += parseInt(total[i].dailyEarn);
      subTotalSpend += parseInt(total[i].dailySpend);
    }
  }
  return [subTotalEarn, subTotalSpend];
}

function Data() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const [total, setTotal] = useState([]);

  // prepare date
  const date = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const todayDate = date.toLocaleDateString("en-US", options);

  useEffect(() => {
    let indicator = true;
    if (user?.id) {
      const colRef = collection(db, "users", user.id, "dailyMonitor");

      const q = query(colRef, orderBy("day", "desc"));

      if (indicator) {
        onSnapshot(q, (snapshot) => {
          setTotal(
            snapshot.docs.map((doc, index) => ({
              key: `${doc.id}-${index}`,
              day: doc.data().day,
              month: doc.data().month,
              year: doc.data().year,
              dailyEarn: doc.data().dailyEarn,
              dailySpend: doc.data().dailySpend,
            }))
          );
        });
      }

      return () => {
        indicator = false;
      };
    }
  }, [user?.id]);

  const [subTotalEarn, subTotalSpend] = useMemo(
    () => setTotalMoney(total),
    [total]
  );

  useLayoutEffect(() => {
    let trigger = true;

    if (trigger) {
      dispatch(
        login({
          ...user,
          totalEarn: subTotalEarn,
          totalSpend: subTotalSpend,
        })
      );
    }

    return () => {
      trigger = false;
    };
  }, [subTotalEarn, subTotalSpend, dispatch]);

  // Control AOS animation..
  useEffect(() => {
    let start = true;
    if (start) {
      // initialize Aos
      Aos.init({
        duration: 1000,
      });
      // make sure it's applying only one time
      Aos.init({
        once: true,
        disable: "phone",
      });
    }

    return () => {
      start = false;
    };
  }, []);

  return (
    <div className="data">
      <div className="data__main">
        <div className="data__header">
          {/* <h2>Dashboard </h2> */}
          <Avatar className="logo" alt="logo" src={logo} />
          <h4 id="todayDate">{todayDate}</h4>
        </div>
        <div data-aos="fade-down" className="row1">
          <Balance />
        </div>
        <div className="middleDiv">
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
  );
}

export default Data;
