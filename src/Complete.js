import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Complete = () => {
  const Navigator = useNavigate();
  const name = localStorage.getItem("ID");

  if (!localStorage.getItem("loginFlag") === "true") {
    alert("접근할수없는 사용자입니다.");
    Navigator(`/`);
  }

  const clickLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    Cookies.remove("ID");
    Cookies.remove("username");
    Navigator(`/`);
  };

  return (
    <div class="main">
      <h1 class="logo" id="complete">
        {" "}
        Complete!{" "}
      </h1>
      <h2>hello {name}! </h2>
      <button className="account" id="logout" onClick={clickLogout}>
        {" "}
        Log out{" "}
      </button>
    </div>
  );
};

export default Complete;
