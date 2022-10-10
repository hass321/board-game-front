import "./style.css";
import { useState, useEffect } from "react";
import { apis } from "../../api_services/apis";
import { instance } from "../../api_services/index";

function Game() {
  const [knightPos, setKnightPos] = useState(0);
  const [checkCondition, setCheckCondition] = useState(false);
  const [dangerPos, setDangerPos] = useState([]);
  const [collectablePos, setCollectablePos] = useState([]);
  const [generate, setGenerate] = useState(true);
  const [timer, setTimer] = useState(0);
  const [start, setStart] = useState(false);
  const [user, setUser] = useState(null);

  const knight = require("../../assets/knight.png");
  const danger = require("../../assets/danger.png");
  const collectable = require("../../assets/collectable.png");

  const generateNum = () => Math.floor(Math.random() * 59) + 1;
  let interval = null;
  function generateUniqueRandom(maxNum) {
    !checkCondition && setCheckCondition(true);
    // Generate random number
    let arr = [];
    let arr2 = [];
    for (let a = 0; a < maxNum; a++) {
      let num1 = generateNum();
      if (!arr.includes(num1)) {
        arr = [...arr, num1];
      }
    }
    for (let b = 0; b < maxNum; b++) {
      let num2 = generateNum();
      if (!arr.includes(num2) && !arr2.includes(num2)) {
        arr2 = [...arr2, num2];
      }
    }
    setCollectablePos(arr);
    setDangerPos(arr2);
  }

  const handleCollectable = (knight) => {
    let arr = collectablePos.filter((obj) => knight != obj);
    setCollectablePos(arr);
    if (arr.length === 0) {
      setTimeout(() => {
        instance
          .post(apis.createUser, { user, time: timer })
          .then((res) => console.log("Hurray!!"));
        clearInterval(interval);
        alert("You Won! Hurray");
        setTimer(0);
        setKnightPos(0);
        generateUniqueRandom(6);
      }, 20);
    }
  };
  const handleDanger = (knight) => {
    dangerPos.map((danger) => {
      if (danger === knight) {
        setTimeout(() => {
          clearInterval(interval);
          alert("Game Over!");
          setTimer(0);
          setKnightPos(0);
          generateUniqueRandom(6);
        }, 20);
      }
    });
  };
  const func = (e) => {
    setGenerate(false);
    if (e.keyCode === 37) {
      console.log(knightPos);
      knightPos > 0 && setKnightPos(knightPos - 1);
    }
    if (e.keyCode === 38) {
      knightPos - 10 > -1 && setKnightPos(knightPos - 10);
    }
    if (e.keyCode === 39) {
      console.log(knightPos);
      knightPos < 59 && setKnightPos(knightPos + 1);
    }
    if (e.keyCode === 40) {
      console.log(knightPos);
      knightPos + 10 < 60 && setKnightPos(knightPos + 10);
    }
  };
  useEffect(() => {
    let userName = null;
    if (!start) {
      userName = prompt("Enter your user name", "user name");
    }
    if (userName != null) {
      setUser(userName);
      setStart(true);
      interval = setInterval(() => {
        setTimer((time) => time + 1);
      }, 1000);
    }
    generate && generateUniqueRandom(6);

    checkCondition && handleDanger(knightPos);
    checkCondition && handleCollectable(knightPos);
    document.addEventListener("keydown", func);
    return () => document.removeEventListener("keydown", func);
  }, [knightPos]);

  const renderPositions = (positions, item) => {
    let position = false;
    if (positions.length > 0) {
      positions.map((pos) => {
        if (pos === item) {
          position = true;
        }
      });
    }
    return position;
  };

  const loop = (start, end) => {
    let arr = [];
    for (let a = start; a < end; a++) {
      arr = [...arr, a];
    }
    return arr.map((item, ind) => {
      return (
        <div key={item} id={item} className="box">
          {knightPos === item ? (
            <img alt="knight" width="25px" src={knight} />
          ) : renderPositions(dangerPos, item) ? (
            <img alt="knight" width="25px" src={danger} />
          ) : (
            renderPositions(collectablePos, item) && (
              <img alt="knight" width="25px" src={collectable} />
            )
          )}
        </div>
      );
    });
  };
  const renderRows = (total) => {
    let arr = [];
    for (let a = 0; a < total; a++) {
      arr = [...arr, a];
    }
    return arr.map((ind) => {
      let rows = [];
      switch (ind) {
        case 0:
          rows = (
            <div key={ind} className="alignRow">
              {loop(0, 10)}
            </div>
          );
          break;
        default:
          rows = (
            <div key={ind} className="alignRow">
              {loop(ind * 10, (ind + 1) * 10)}
            </div>
          );
          break;
      }
      return rows;
    });
  };
  return (
    <div className="board">
      {renderRows(6)}
      <div className="alignRow timer-style">
        <div className="h4">Timer : {timer}</div>
      </div>
    </div>
  );
}

export default Game;