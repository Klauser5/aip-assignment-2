import React, { Component, useState, useEffect } from 'react';
import "./../../../styles/request.comp.css";
import { Button, Form, Card } from "react-bootstrap";
import axios from "axios";

function RequestComp(props) {
    const [requests, setRequests] = useState([]);

    function handleDelete(e) {
        e.preventDefault();
        console.log(e.target.value);

        axios
            .post("/request/delete", {
                requestID: e.target.value,
                authToken: localStorage.getItem('authToken')
            })
            .then((res) => {
                props.setRequests(res.data); //this is a callback to setRequests
            });
    }

    console.log(props);
    console.log(typeof props.request.name);
    return (
        <div class="request">
            <h1> {props.request.name} </h1>
            <p>Request Description: {props.request.content}</p>
            <p>Request ID (TESTING): {props.request._id}</p>
            <p>Request userID (TESTING): {props.request.ownerID}</p>
            <Button value={props.request._id} variant="danger" type="submit" onClick={handleDelete}>
                DELETE
            </Button>
            <p>If fields are missing, field names might have changed. Please delete this request and make a new one</p>
        </div>
    );
}

export default RequestComp;
