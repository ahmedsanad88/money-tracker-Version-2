//jshint esversion:6

import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { useSelector } from 'react-redux';
import "./Balance.css";
// import db from '../firebase';


function Balance() {

    // const [userData, setUserData] = useState({});

    const user = useSelector(state => state.user.user);

    let remainBalance =parseInt(user.totalEarn) - parseInt(user.totalSpend);
    let earnMoney = parseInt(user.totalEarn);
    let SpentMoney = parseInt(user.totalSpend);

    // console.log(user.id);

    // useEffect(() => {
    //     const getdata = async () => {
    //         let dataHolder = await db.collection('users').doc(user.id);
    //         let doc = await dataHolder.get();
    //         setUserData(doc.data())
    //         // console.log(doc.data());
    //     };
        
    //     getdata();
    //     return () => {
    //         console.log("data ready");
    //     }
    // }, []);

    // console.log(userData);

    return (
        <div className="balance">
            <div className="balance__main">
                <div className="remainBalance">
                    <div>
                        <IconButton className="balance__img">
                            <AccountBalanceWalletIcon className="img__size"/>
                        </IconButton>
                    </div>
                    <div className="remainBalance__text">
                        <h2>{remainBalance ? remainBalance : 0} $</h2>
                        <small>Remaining Balance</small>
                    </div>
                </div>
                <div className="totalSpend">
                    <div>
                        <IconButton className="balance__img">
                            <MoneyOffIcon className="img__size"/>
                        </IconButton>
                    </div>
                    <div className="totalSpend__text">
                        <h2>{SpentMoney ? SpentMoney : 0} $</h2>
                        <small>Total Spent</small>
                    </div>
                </div>
                <div className="earn">
                    <div>
                        <IconButton className="balance__img">
                            <MonetizationOnIcon className="img__size"/>
                        </IconButton>
                    </div>
                    <div className="earn__text">
                        <h2>{earnMoney ? earnMoney : 0} $</h2>
                        <small>Total Earn</small>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Balance;
