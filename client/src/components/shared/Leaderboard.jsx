import React, { Component, useState, useEffect } from 'react';
import axios from "axios";
import "./../../styles/Leaderboard.scss";
import socketIOClient from "socket.io-client";
import io from 'socket.io-client';
 
const socket = io('/socket');

function Leaderboard(props) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/lists/leaderboard").then((res) => {
      setUsers(res.data);
    })
    socket.on("update", data => {
      console.log(data);
    });  });

  return (
    <div id="leaderboard">
      <h1> Leaderboard</h1>
      <p>  Complete favours to earn points </p>
      <table>
        <tr>
          <th> Rank </th>
          <th id="userHeader"> User </th>
          <th> Points </th>
        </tr>
        <tbody>
          {users.map((user, index) => (
            <tr>
              <td> {index + 1} </td>
              <td> {user.name} </td>
              <td> {user.score} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;