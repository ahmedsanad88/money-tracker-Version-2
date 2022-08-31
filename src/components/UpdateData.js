//jshint esversion:6

import React, { useEffect, useState } from "react";
import db from "./firebase";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import Aos from "aos";
import "aos/dist/aos.css";

import "./UpdateData.css";
import CustomMessage from "./error/CustomMessage";
import dataPage from "../images/dataPage.svg";

const defaultMessage = {
  message: "Message: ",
  isShown: false,
  isSuccess: false,
};

function UpdateData() {
  // state check earn & spend money..
  const [earnMoney, setEarnMoney] = useState(0);
  const [spendMoney, setSpendMoney] = useState(0);
  // show success and failed messages
  const [showMessage, setShowMessage] = useState(defaultMessage);
  // user state follow up
  const user = useSelector((state) => state.user.user);

  // getting the day and month as numbers...
  var date = new Date();
  // return An integer number, between 1 and 31
  var dayDate = date.getDate();
  // return An integer number, between 0 and 11
  let currentMonth = date.getMonth();
  let year = date.getFullYear();

  // Contorl AOS animation..
  useEffect(() => {
    // initailize Aos
    Aos.init({
      duration: 1000,
    });
    // make sure it's applying only one
    Aos.init({
      once: true,
      disable: "phone",
    });
  }, []);

  // adding daily spend and earn to firestore db.
  const handleMoney = async (e) => {
    e.preventDefault();
    if (earnMoney > 0 || spendMoney > 0) {
      if (earnMoney !== "" && spendMoney !== "") {
        const userData = collection(db, "users", user.id, "dailyMonitor");
        addDoc(userData, {
          day: dayDate,
          month: currentMonth,
          year: year,
          dailyEarn: earnMoney,
          dailySpend: spendMoney,
        })
          .then(() => {
            setEarnMoney(0);
            setSpendMoney(0);
            handleMessage("Working to update your records.💸", true);
          })
          .then(() => {
            const colRef = collection(db, "users");
            const docRef = doc(colRef, user.id);
            setDoc(
              docRef,
              {
                totalEarn: parseInt(user?.totalEarn) + parseInt(earnMoney),
                totalSpend: parseInt(user?.totalSpend) + parseInt(spendMoney),
              },
              { merge: true }
            );
          })
          .catch((error) => handleMessage(error.message, false));
      } else {
        handleMessage("please fill unused field with Zero.", false);
      }
    } else {
      handleMessage("Please add your earn or spend money", false);
    }
  };

  function handleMessage(text, bool) {
    if (showMessage.isShown === true) return;
    setShowMessage((prev) => ({
      ...prev,
      message: prev.message + text,
      isShown: true,
      isSuccess: bool,
    }));
    setTimeout(() => {
      setShowMessage(defaultMessage);
    }, 2500);
  }

  const resetForm = () => {
    setEarnMoney(0);
    setSpendMoney(0);
  };

  return (
    <div className="updateData">
      <CustomMessage
        message={showMessage.message}
        isShown={showMessage.isShown}
        isSuccess={showMessage.isSuccess}
      />
      <div data-aos="zoom-in" className="updateData__main">
        {/* background image for earn and spend data. */}
        <div className="img">
          <img src={dataPage} alt="spend or earn money" />
        </div>
        <div className="updateData_title">
          <h3>Update Your Earn & Your spent Money</h3>
        </div>
        {/* input form container */}
        <form>
          <div className="input_container">
            <div className="earnInput">
              <input
                type="number"
                name="earn"
                placeholder="Enter Numbers Only"
                min="0"
                max="10000000"
                onChange={(e) => setEarnMoney(e.target.value)}
                value={earnMoney}
              />
              <h2>EARN ($)</h2>
            </div>
            <div className="earnInput">
              <input
                type="number"
                name="spent"
                placeholder="Enter Numbers Only"
                min="0"
                max="10000000"
                onChange={(e) => setSpendMoney(e.target.value)}
                value={spendMoney}
              />
              <h2>DAILY SPENT ($)</h2>
            </div>
          </div>

          {/* btn handle submit and reset form */}
          <div className="btn">
            <input
              id="submit__data"
              type="submit"
              name="submit"
              value="UPDATE"
              onClick={(e) => handleMoney(e)}
            />
            <input
              id="reset"
              type="reset"
              name="reset"
              value="RESET"
              onClick={resetForm}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateData;
