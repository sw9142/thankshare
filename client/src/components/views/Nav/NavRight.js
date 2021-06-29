import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function NavRight({ toggleLogin, ProfileDB }) {
  const history = useHistory();
  const onLogoutHandler = () => {
    console.log("click!");
    Axios.get("/api/users/logout").then((res) => {
      console.log("res.data?", res.data);
      if (res.data.logoutsuccess) {
        console.log("logout succeess!");
        toggleLogin();
        history.push("/");
      } else {
        console.log("err");
      }
    });
  };

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/profile">
              {ProfileDB.name}'s Profile
              {ProfileDB.thumbnail && (
                <img
                  src={ProfileDB.thumbnail}
                  width="50px"
                  height="50px"
                  alt="thumbnail"
                />
              )}
            </Link>
          </li>
          <li>
            <button onClick={onLogoutHandler}>Logout</button>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default NavRight;
