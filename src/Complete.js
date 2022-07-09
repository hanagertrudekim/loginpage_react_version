import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Main = styled.div`
  width: 250px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid lightgrey;
  border-radius: 5px;
`;

const Logo = styled.h1`
  margin-top: 0px;
  margin-bottom: 40px;
  color: blue;
`;

const LogoutBtn = styled.button`
  width: 90%;
  height: 2rem;
  background-color: skyblue;
  border-color: transparent;
  color: white;
`;

const H2 = styled.h2`
  margin-top: 0;
  margin-bottom: 3rem;
`;

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
    <Main>
      <Logo> Complete! </Logo>
      <H2>hello {name}! </H2>
      <LogoutBtn className="account" onClick={clickLogout}>
        {" "}
        Log out{" "}
      </LogoutBtn>
    </Main>
  );
};

export default Complete;
