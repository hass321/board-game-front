import axios from "axios";
const localUrl = "http://127.0.0.1:8080";
const liveUrl = "https://board-game-knight.herokuapp.com";

const instance = axios.create({
  baseURL: liveUrl,
});

export {instance}