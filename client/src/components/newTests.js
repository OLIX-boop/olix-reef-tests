import axios from 'axios';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import bcrypt from "bcryptjs-react";

import GetDBInfo from '../database';
import Cross from './assets/cross.svg';
import testStyle from "./modules/test.module.css";

const monthsLabel = [
  "gennaio",
  "febbraio",
  "marzo",
  "aprile",
  "maggio",
  "giugno",
  "luglio",
  "agosto",
  "settembre",
  "ottobre",
  "novembre",
  "dicembre",
];

const hash = '$2y$10$ED3S3OEB63PZnID3T.fvB.r2FuJKjJpCwVIrPzJRpomSKc6YHyP8G'; // password per fare la richiesta al database;


const NewTests = () => {
  const navigate = useNavigate();

  const [KH, setKH] = useState(0);
  const [CA, setCA] = useState(0);
  const [MG, setMG] = useState(0);
  const [NO2, setNO2] = useState(0);
  const [NO3, setNO3] = useState(0);
  const [PO4, setPO4] = useState(0);
  const [password, setPassword] = useState("");

  const date = new Date();
  const day = date.getDate();
  const month = monthsLabel[date.getMonth()];
  const today = day + " " + month;

  const saveTests = async () => {
    bcrypt.compare(password, hash, async function(_, res) {
      if (!res) {
        alert("Password non corretta!");
        return;
      };
      
      try {
        const date = today;
        const year = new Date().getFullYear();
        var data = JSON.stringify({
          operation: "insert",
          schema: "test_results",
          table: "results",
          records: [
            {
              KH,
              CA,
              MG,
              NO2,
              NO3,
              PO4,
              date,
              year
            },
          ],
        });

        const info = GetDBInfo();
  
        var config = {
          method: "POST",
          url: atob(info[1]),
          headers: { 
            "Content-Type": "application/json",
            Authorization: atob(info[0]),
          },
          data: data,
        };
  
        const response = await axios(config);
        console.log(response.data);
        navigate('/olix-reef-tests/', {state: {
          reload: true,
        }});
      } catch (error) {
        console.error(error);
      }
    });
  }

  return (
    <div className={testStyle.body}>
      <div className={testStyle.background}>
        
        <div className={testStyle.headerContainer}>
          <div className={testStyle.exitBTNContainer}>
            <button onClick={() => {navigate('/olix-reef-tests/')}} className={testStyle.exitBTN}><img src={Cross} alt="Exit" /></button>
          </div>

          <h1 className={testStyle.title}>Test Results</h1>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveTests();
          }}
          className={testStyle.form}
        >
          <div className={testStyle.inputContainer}>
            <label htmlFor="date">Date</label>
            <input id="date" type="text" disabled={true} defaultValue={today} />
          </div>

          <div className={testStyle.inputContainer}>
            <label htmlFor="KH">KH</label>
            <input
              id="KH"
              type="text"
              pattern="(\d*[\.,]?\d+|\d+[\.,]?\d*)"
              inputMode="decimal"
              required
              onChange={(e) => setKH(e.target.value)}
            />
          </div>

          <div className={testStyle.inputContainer}>
            <label htmlFor="CA">CA</label>
            <input
              id="CA"
              type="text"
              pattern="(\d*[\.,]?\d+|\d+[\.,]?\d*)"
              inputMode="decimal"
              required
              onChange={(e) => setCA(e.target.value)}
            />
          </div>

          <div className={testStyle.inputContainer}>
            <label htmlFor="MG">MG</label>
            <input
              id="MG"
              type="text"
              pattern="(\d*[\.,]?\d+|\d+[\.,]?\d*)"
              inputMode="decimal"
              required
              onChange={(e) => setMG(e.target.value)}
            />
          </div>

          <div className={testStyle.doubleContainer}>
            <div className={testStyle.inputContainer}>
              <label htmlFor="NO2">NO2</label>
              <input
                id="NO2"
                type="text"
                pattern="(\d*[\.,]?\d+|\d+[\.,]?\d*)"
                inputMode="decimal"
                required
                onChange={(e) => setNO2(e.target.value)}
              />
            </div>

            <div className={testStyle.inputContainer}>
              <label htmlFor="NO3">NO3</label>
              <input
                id="NO3"
                type="text"
                pattern="(\d*[\.,]?\d+|\d+[\.,]?\d*)"
                inputMode="decimal"
                required
                onChange={(e) => setNO3(e.target.value)}
              />
            </div>
          </div>

          <div className={testStyle.inputContainer}>
            <label htmlFor="PO4">PO4</label>
            <input
              id="PO4"
              type="text"
              pattern="(\d*[\.,]?\d+|\d+[\.,]?\d*)"
              inputMode="decimal"
              required
              onChange={(e) => setPO4(e.target.value)}
            />
          </div>

          <div className={testStyle.inputContainer}>
            <label htmlFor="Password">Password</label>
            <input
              id="Password"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={testStyle.buttonContainer}>
            <button className={testStyle.button}> CONFIRM </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTests;
