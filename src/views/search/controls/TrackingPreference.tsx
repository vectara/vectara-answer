import React, { useEffect } from 'react';
import { ToastContainer, toast, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import * as amplitude from '@amplitude/analytics-browser';
import { VuiButtonPrimary, VuiButtonSecondary, VuiFlexContainer, VuiLink } from "../../../ui";
import "./TrackingPreference.scss"


// Helper function to set a cookie
const setCookie = (name: string, value: string, days: number) => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${value};${expires};path=/`;
};

// Helper function to get a cookie by name
const getCookie = (name: string) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const TrackingPreference = () => {

  const handleUserChoice = (allowTracking: boolean) => {
    setCookie('VECTARA_ANSWER_ALLOW_TRACKING', JSON.stringify(allowTracking), 365);

    if (!allowTracking) {
      amplitude.setOptOut(true);
    } else {
      amplitude.setOptOut(false);
    }

    toast.dismiss();
  };

  const ToastMessage = () => (
    <VuiFlexContainer direction="column" >
      <p className="toastMessage">
        This website uses analytics to enhance your experience and improve our product. For more information, please see
        our <VuiLink href="https://vectara.com/legal/privacy-policy/" target="_blank">Privacy Policy</VuiLink>.
        <p style={{marginTop: "5px", marginBottom: "5px"}}>If you choose to opt out, your preference will be saved, and no data will be collected during your visit.</p>
        Your preference will be saved in a single cookie.
      </p>
      <div className="toastButtons">
        <VuiButtonPrimary className="buttonWidth" color="accent" onClick={() => handleUserChoice(true)}>Allow</VuiButtonPrimary>
        <VuiButtonSecondary className="buttonWidth" color="accent" onClick={() => handleUserChoice(false)}>Opt Out</VuiButtonSecondary>
      </div>
    </VuiFlexContainer>
  );

  useEffect(() => {
    const savedPreference = getCookie('VECTARA_ANSWER_ALLOW_TRACKING');

    if (savedPreference === "false") {
      amplitude.setOptOut(true);
    }

    if (!savedPreference) {
      toast(<ToastMessage />, {
        position: "bottom-right",
        autoClose: false,
        transition: Slide,
        closeOnClick: false,
        closeButton: false,
        className: "toastContainer"
      });
    }
  }, []);

  return <ToastContainer />;
};

export default TrackingPreference;

