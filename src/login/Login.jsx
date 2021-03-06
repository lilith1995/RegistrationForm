import "./Login.css";
import { useState, useHistory } from "react";

export const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [mainClass, setMainClass] = useState("bounceRight");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  const history = useHistory();
  history.push("/home");
  const Signin = () => {
    console.log(loginEmail, loginPassword);
    if (!isValidEmail(loginEmail)) {
      alert("invalid email");
    } else {
      fetch("http://localhost:4000/users/login", {
        method: "POST",
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          history.push("/home"); //after pushing data to localstorage or redux
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  const isValidEmail = (email) => {
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
  };
  const Signup = () => {
    console.log(signupEmail, signupPassword);
    if (!isValidEmail(signupEmail)) {
      alert("invalid email");
    } else {
      fetch("http://localhost:4000/users", {
        method: "POST",
        body: JSON.stringify({ email: signupEmail, password: signupPassword }),
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (res.accessToken && res.refreshToken) {
            setRefreshToken(res.refreshToken);
            setAccessToken(res.accessToken);
          } else {
            alert(res.message);
          }
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <section className="user">
      <div className="user_options-container">
        <div className="user_options-text">
          <div className="user_options-unregistered">
            <h2 className="user_unregistered-title">Don't have an account?</h2>
            <p className="user_unregistered-text">
              With your personal account, you can track your favorite properties
              and receive custom alerts about new listings that come to market.
            </p>
            <button
              className="user_unregistered-signup"
              id="signup-button"
              onClick={() => setMainClass("bounceLeft")}>
              Join us!
            </button>
          </div>
          <div className="user_options-registered">
            <h2 className="user_registered-title">Have an account?</h2>
            <p className="user_registered-text">
              Don???t miss out on the right home for you ??? browse up-to-date
              listings, refine your search and more.
            </p>
            <button
              className="user_registered-login"
              id="login-button"
              onClick={() => setMainClass("bounceRight")}>
              Login
            </button>
          </div>
        </div>
        <div
          className={`user_options-forms ${mainClass}`}
          id="user_options-forms">
          <div className="user_forms-login">
            <h2 className="forms_title">Welcome</h2>
            <form className="forms_form">
              <fieldset className="forms_fieldset">
                <div className="forms_field">
                  <input
                    type="email"
                    placeholder="Email"
                    className="forms_field-input"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="forms_field">
                  <input
                    type="password"
                    placeholder="Password"
                    className="forms_field-input"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </div>
              </fieldset>
              <div className="forms_buttons">
                <button type="button" className="forms_buttons-forgot">
                  Forgot password?
                </button>
                <input
                  type="button"
                  defaultValue="Log In"
                  className="forms_buttons-action"
                  onClick={Signin}
                />
              </div>
            </form>
          </div>
          <div className="user_forms-signup">
            <h2 className="forms_title">Sign Up</h2>
            <form className="forms_form">
              <fieldset className="forms_fieldset">
                <div className="forms_field">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="forms_field-input"
                    required
                  />
                </div>
                <div className="forms_field">
                  <input
                    type="email"
                    placeholder="Email"
                    className="forms_field-input"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="forms_field">
                  <input
                    type="password"
                    placeholder="Password"
                    className="forms_field-input"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    required
                  />
                </div>
              </fieldset>
              <div className="forms_buttons">
                <input
                  type="button"
                  defaultValue="Sign up"
                  className="forms_buttons-action"
                  onClick={Signup}
                />
              </div>
            </form>
          </div>
        </div>
        <div className="column">{accessToken}</div>
        <div className="column">{refreshToken}</div>
      </div>
    </section>
  );
};

// window.onload = function () {
//   const signupButton = document.getElementById("signup-button"),
//     loginButton = document.getElementById("login-button"),
//     userForms = document.getElementById("user_options-forms");

//   signupButton.addEventListener(
//     "click",
//     () => {
//       userForms.classList.remove("bounceRight");
//       userForms.classList.add("bounceLeft");
//     },
//     false
//   );

//   loginButton.addEventListener(
//     "click",
//     () => {
//       userForms.classList.remove("bounceLeft");
//       userForms.classList.add("bounceRight");
//     },
//     false
//   );
// };
