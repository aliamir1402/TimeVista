import React, { useEffect, useState } from "react";
import {
  auth,
  googleProvider,
  facebookProvider,
} from "../components/firebase.js";
import { signInWithPopup } from "firebase/auth";
import google_icon from "../components/images/google-icon.svg";
import facebook_icon from "../components/images/facebook-icon.svg";

const Auth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is signed in
        setUser(authUser);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    return () => {
      // Clean up the subscription on component unmount
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await auth.getRedirectResult();
        // Handle sign-in result if needed
      } catch (error) {
        console.error("Error handling redirect result:", error);
      }
    };

    handleRedirectResult();
  }, []);

  const signInWithGoogle = async () => {
    try {
      await auth.signInWithPopup(googleProvider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const signInWithFacebook = async () => {
    try {
      await auth.signInWithPopup(facebookProvider);
    } catch (error) {
      console.error("Error signing in with Facebook:", error);
    }
  };

  const signOut = () => {
    auth.signOut();
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.displayName}!</p>
          <button onClick={signOut}>Sign Out</button>
        </div>
      ) : (
        <>
          <div className="login-prompt">Or Sign Up Using</div>
          <div className="flex flex-col items-center">
            <div className="flex_box">
              <div className="pl-2 pr-2 pt-2 login-logo">
                <button onClick={signInWithGoogle}>
                  <img src={google_icon} alt="google" width={25} height={25} />
                </button>
              </div>
              <div className="pl-2 pr-2 pt-2 login-logo">
                <button onClick={signInWithFacebook}>
                  <img
                    src={facebook_icon}
                    alt="facebook"
                    width={25}
                    height={25}
                  />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Auth;
