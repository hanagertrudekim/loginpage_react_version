import { useCallback, useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
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
`;

const LoginBtn = styled.button`
  width: 100%;
  background-color: skyblue;
  border-color: transparent;
  color: white;
`;

const Login = () => {
  const idInput = useRef();
  const passwordInput = useRef();
  const loginButton = useRef();
  const [errNum, setErrNum] = useState(0);
  const Navigator = useNavigate();

  const saveId = useCallback(() => {
    localStorage.setItem("ID", idInput.current.value);
    sessionStorage.setItem("ID", idInput.current.value);
    Cookies.set("ID", idInput.current.value, { expires: 3 });
    Cookies.set("errNum", errNum);
  }, [errNum]);

  const clickLogin = (e) => {
    e.preventDefault();
    if (idInput.current.value === "hana") {
      if (passwordInput.current.value === "0000") {
        alert("로그인이 되었어요!");
        localStorage.setItem("loginFlag", "true");
        setErrNum(0);
        Navigator(`/complete`);
      } else {
        alert("아이디와 비밀번호가 일치하지 않습니다.");
        setErrNum((prev) => prev + 1);
      }
    } else {
      alert("아이디와 비밀번호를 다시 입력해주세요.");
      setErrNum((prev) => prev + 1);
    }
    if (errNum >= 5) {
      Cookies.set("flag", "no", { expires: 0.046 });
    }

    idInput.current.value = "";
    passwordInput.current.value = "";
  };

  const clickStopLogin = useCallback((e) => {
    e.preventDefault();
    alert("1시간 뒤에 다시 시도해주세요.");
  }, []);

  useEffect(() => {
    if (Cookies.get("flag") === "no") {
      idInput.current.addEventListener("keydown", clickStopLogin);
      passwordInput.current.addEventListener("keydown", clickStopLogin);
    }

    if (Cookies.get("errNum") !== undefined) {
      setErrNum(Number(Cookies.get("errNum")));
    }

    return () => {
      if (idInput.current)
        idInput.current.removeEventListener("keydown", clickStopLogin);
      if (passwordInput.current)
        passwordInput.current.removeEventListener("keydown", clickStopLogin);
    };
  }, []);

  useEffect(() => {
    saveId();
    if (errNum >= 5) {
      idInput.current.addEventListener("keydown", clickStopLogin);
      passwordInput.current.addEventListener("keydown", clickStopLogin);
    }
  }, [errNum, saveId, clickStopLogin]);

  return (
    <Main>
      <Logo>Log in</Logo>
      <div className="container">
        <form>
          <input
            type="text"
            placeholder="ID"
            id="id"
            className="account"
            ref={idInput}
            required
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            className="account"
            ref={passwordInput}
            required
          />
          <LoginBtn
            className="account"
            type="submit"
            ref={loginButton}
            onClick={clickLogin}
          >
            Log in
          </LoginBtn>
        </form>
        <Link to="#"> forgot password?? </Link>
      </div>
    </Main>
  );
};

export default Login;
