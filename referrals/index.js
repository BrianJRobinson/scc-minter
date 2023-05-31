import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable, { createTheme } from "react-data-table-component";
import styles from "../styles/Home.module.css";

createTheme(
  "solarized",
  {
    text: {
      primary: "#fc3",
      secondary: "#fc3",
    },
    background: {
      default: "#59246466",
    },
    context: {
      background: "transparent",
      text: "#FFFFFF",
    },
    divider: {
      default: "#073642",
    },
    action: {
      button: "rgba(0,0,0,.54)",
      hover: "rgba(0,0,0,.08)",
      disabled: "rgba(0,0,0,.12)",
    },
    striped: {
      default: "#9c59b37a",
      text: "rgba(0, 0, 0, 0.87)",
    },
  },
  "dark"
);

const Referrals = () => {
  const [referrals, setReferrals] = useState([]);
  const getReferrals = async () => {
    try {
      console.log("Getting referral data");
      const response = await axios.get("https://degen-defi.com/api/referral");
      console.log("After referral data");
      console.log(response.data);
      setReferrals(response.data);
      console.log(referrals);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getReferrals();
  }, []);

  const columns = [
    {
      name: "Team Name",
      selector: (row) => row.teamName,
    },
    {
      name: "Count",
      selector: (row) => row.referralCount,
    },
    {
      name: "Eth Value",
      selector: (row) => row.wethValue,
    },
    {
      name: "Dollar Value",
      selector: (row) => row.dollarValue,
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "52px", // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
  };

  return (
    <div className={styles.referralTable}>
      <br />
      <h2>Shillers Leaderboard</h2>
      <DataTable columns={columns} data={referrals} striped theme="solarized" />
    </div>
  );
};

export default Referrals;
