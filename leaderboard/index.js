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
      default: "#592464a1",
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
      default: "#9c59b3a1",
      text: "#F9EA76",
    },
  },
  "dark"
);

const Leaderboard = (props) => {
  const [data, setData] = useState([]);
  const [tokenId, setTokenId] = useState(props.newToken);
  console.log(`Inside Datatable token id is ${props.newToken}`);
  if (tokenId !== props.newToken) {
    setTokenId(props.newToken);
  }
  const getData = async () => {
    console.log(`Getting Data`);
    try {
      const response = await axios.get("https://degen-defi.com/api/referral");

      setData(response.data);
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
    getData();
  }, [tokenId]);

  const columns = [
    {
      name: "Team Name",
      selector: (row) => row.teamName,
      minWidth: "160px",
    },
    {
      name: "Count",
      selector: (row) => row.referralCount,
      minWidth: "5%",
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
        fontSize: "large",
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
      <DataTable
        columns={columns}
        data={data}
        striped
        theme="solarized"
        customStyles={customStyles}
      />
    </div>
  );
};

export default Leaderboard;
