import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [username, setUserName] = useState("");
  const createNewRoom = (event) => {
    event.preventDefault();
    const id = uuidv4();
    setRoomId(id);
    toast.success("Created a new room");
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("Both roomId and username is required");
      return;
    }

    navigate(`/editor/${roomId}`, {
      state: {
        username,
      },
    });
  };

  const handleInputEnter = (event) => {
    if (event.code === "Enter") {
      joinRoom();
    }
  };
  return (
    <>
      <div className="homePageWrapper">
        <div className="formPageWrapper">
          <h3 className="mainLabel">Enter the required details</h3>
          <div className="innerForm">
            <input
              type="text"
              className="inputBox"
              placeholder="ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              onKeyUp={handleInputEnter}
            ></input>

            <input
              type="text"
              className="inputBox"
              placeholder="USERNAME"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              onKeyUp={handleInputEnter}
            ></input>
            <button onClick={joinRoom} className="btn joinBtn">
              Join
            </button>
            <span className="createInfo">
              If You Have Not Registered?{" "}
              <a onClick={createNewRoom} href=" " className="createNewBtn">
                New Room
              </a>
            </span>
          </div>
        </div>
        <footer>
          <h4>Build using ReactJs and ExpressJs</h4>
        </footer>
      </div>
    </>
  );
};

export default Home;
