import "./App.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Data from "./Data";
import { useState } from "react";
import { auth, provider } from "./firebase";

function App() {
  const [user, setUser] = useState(null);

  //fucntion to log user in
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then(({ user }) => {
        //console.log(user);
        setUser(user);
      })

      .catch((err) => {
        alert(err.message);
      });
  };

  const signOut = () => {
    auth.signOut().then(() => {
      setUser(null);
      // window.location.href = "/";
    });
  };

  return (
    <>
      {user ? (
        <div className="App">
          <Header photoURL={user.photoURL} signOut={signOut} />
          <div className="main" style={{ display: "flex" }}>
            <Sidebar email={user.email} />
            <Data user={user} />
          </div>
        </div>
      ) : (
        <div className="login">
          <h1>Google Drive</h1>
          <img
            src="https://icons.iconarchive.com/icons/marcus-roberto/google-play/512/Google-Drive-icon.png"
            alt="login logo"
          />
          <button onClick={signIn}>Login</button>
        </div>
      )}
    </>
  );
}

export default App;
