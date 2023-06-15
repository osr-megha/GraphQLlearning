import React from "react";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { GET_MY_PROFILE } from "../gqloperations/queries";

const Profile = () => {

  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_MY_PROFILE,{
    fetchPolicy:"network-only"
  });

  if(!localStorage.getItem("token")){
    navigate("/login")
    return <h1>Unauthorized</h1>
  }

  if (loading) return <h1>Profile is Loading</h1>;
  
  if (error) {
    console.log(error.message);
  }

  return (
    <div className="container my-container">
      <div className="center-align">
        <img
          src={`https://robohash.org/${data.user.firstName}.png`}
          className="circle"
          style={{
            width: "200px",
            height: "200px",
            border: "2px solid orange",
            marginTop: "10px",
          }}
          alt="pic"
        />
        <h5>
          {data.user.firstName} {data.user.lastName}
        </h5>
        <h6> Email - {data.user.email}</h6>
      </div>
      <h3>Your Quotes</h3>
      {data.user.quotes.map((quo) => {
        return (
          <blockquote>
            <h6>{quo.name}</h6>
          </blockquote>
        );
      })}
    </div>
  );
};

export default Profile;
