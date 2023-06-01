import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable, { createTheme } from "react-data-table-component";
import styles from "../styles/Home.module.css";
import { toast } from "react-toastify";

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
      default: "#fc3",
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

const Referrals = (props) => {
  const [referrals, setReferrals] = useState([]);
  const [tokenId, setTokenId] = useState(props.newToken);
  console.log(`Inside Datatable ${props.newToken}`);
  if (tokenId !== props.newToken) {
    setTokenId(props.newToken);
  }
  const getReferrals = async () => {
    console.log(`Getting referrals`);
    try {
      const response = await axios.get("https://degen-defi.com/api/referral");

      setReferrals(response.data);
    } catch (error) {
      console.log(error);
      toast(`Error Getting Data`, {
        hideProgressBar: true,
        autoClose: 3000,
        type: "error",
        position: "top-center",
      });
    }
  };
  useEffect(() => {
    getReferrals();
  }, [tokenId]);

  const columns = [
    {
      name: "Team Name",
      selector: (row) => row.teamName,
    },
    {
      name: "Count",
      selector: (row) => row.referralCount,
      maxWidth: "5%",
    },
    {
      name: "Eth",
      selector: (row) => row.wethValue,
      maxWidth: "5%",
    },
    {
      name: "$US",
      selector: (row) => row.dollarValue.toFixed(2),
      maxWidth: "5%",
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
        paddingLeft: "5px", // override the cell padding for head cells
        paddingRight: "5px",
      },
    },
    cells: {
      style: {
        paddingLeft: "5px", // override the cell padding for data cells
        paddingRight: "5px",
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
