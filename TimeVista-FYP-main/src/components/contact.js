import React from "react";
import Header from "./header";
import Footer from "./footer";
import Phone from "../components/images/call.svg";
import Mail from "../components/images/message_599274.png";
import Location from "../components/images/location.svg";
import SocialIcon1 from "../components/images/twitterx.svg";
import SocialIcon2 from "../components/images/facebook-icon.svg";
import SocialIcon3 from "../components/images/youtube.svg";
import Send from "../components/images/sendarrow.png";
import { documentId } from "firebase/firestore";

export default function Contact() {
  const ContactUsFunc = async () => {
    try {
      var Reqobj = {};
      const fname = document.getElementById("fname").value,
        lname = document.getElementById("lname").value,
        email = document.getElementById("email").value,
        phone = document.getElementById("phone").value,
        subject = document.getElementById("subject").value,
        message = document.getElementById("message").value;

      Reqobj = {
        fname: fname,
        lname: lname,
        email: email,
        phone: phone,
        subject: subject,
        message: message,
      };

      const response = await fetch("http://localhost:4000/api/Contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Reqobj),
      });
      const responseData = await response.json();
      if (responseData === 1) {
        document.getElementById("displayMessage").innerText = "Message Sent!";
        document.getElementById("displayMessage").style.display="block";
        setTimeout(() => {
          document.getElementById("displayMessage").style.display="none";
        }, 2000);
      } else {
        document.getElementById("displayMessage").innerText =
          "Error Sending Message!";
          setTimeout(() => {
            document.getElementById("displayMessage").style.display="none";
          }, 2000);
      }
      console.log("Return Message: ", responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };
  return (
    <>
      <div
        style={{
          background: "linear-gradient(to right,#12251e,#274137)",
          color: "white",
        }}
      >
        <Header></Header>
      </div>
      <div className="bor flex_box h-fit mt-10 mb-10">
        <div className="flex_item">
          <div className="contact-title">Contact Us</div>
          <div className="description-contact">
            Any question? We would be <br />
            happy to help you!
          </div>
          <div className="phone-contact flex_box">
            <div className="">
              <img src={Phone} alt="Phone" />
            </div>
            <div className="">+923355530116</div>
          </div>
          <div className="email-contact flex_box">
            <div className="">
              <img src={Mail} alt="mail" width={32} height={32} />
            </div>
            <div className="">info@timevista.com</div>
          </div>
          <div className="phone-contact flex_box">
            <div className="">
              <img src={Location} alt="location" />
            </div>
            <div className="">TimeVista Ecosystem Islamabad, Pakistan</div>
          </div>
          <div className="social-contact flex_box">
            <div className="social-icon flex justify-center items-center">
              <img
                src={SocialIcon1}
                alt="twitter icon"
                width={25}
                height={25}
              />
            </div>
            <div className="social-icon flex justify-center items-center">
              <img
                src={SocialIcon2}
                alt="facebook icon"
                width={25}
                height={25}
              />
            </div>
            <div className="social-icon flex justify-center items-center">
              <img
                src={SocialIcon3}
                alt="youtube icon"
                width={25}
                height={25}
              />
            </div>
          </div>
        </div>
        <div
          className=""
          style={{
            border: "2px solid #e9e9e9",
            width: "1px",
            marginLeft: "2%",
            marginRight: "2%",
          }}
        ></div>
        <form onSubmit={ContactUsFunc} className="flex_item">
          <div className="flex_box mt-10">
            <div>
              <div className="label-contact">First Name:</div>
              <div style={{ width: "90%" }}>
                <input
                  id="fname"
                  className="input-contact"
                  type="text"
                  placeholder="Your First Name"
                  required
                />
              </div>
            </div>
            <div>
              <div className="label-contact">Last Name:</div>
              <div style={{ width: "90%" }}>
                <input
                  id="lname"
                  className="input-contact"
                  type="text"
                  placeholder="Your Last Name"
                  required
                />
              </div>
            </div>
          </div>
          <div>
            <div className="label-contact">Email:</div>
            <div style={{ width: "90%" }}>
              <input
                id="email"
                className="input-contact"
                type="email"
                placeholder="youremail@gmail.com"
                required
              />
            </div>
          </div>
          <div>
            <div className="label-contact">Phone Number:</div>
            <div style={{ width: "90%" }}>
              <input
                id="phone"
                className="input-contact"
                type="text"
                placeholder="e.g. 033355530116"
                required
              />
            </div>
          </div>
          <div>
            <div className="label-contact">Subject:</div>
            <div style={{ width: "90%" }}>
              <input
                id="subject"
                className="input-contact"
                type="text"
                placeholder="Subject"
                required
              />
            </div>
          </div>
          <div>
            <div className="label-contact">Message:</div>
            <div style={{ width: "90%" }}>
              <textarea
                className="input-contact"
                name=""
                id="message"
                rows="2"
                style={{ width: "100%" }}
                placeholder="Type your message here..."
                required
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            className="contact-button flex justify-center items-center"
          >
            <div>Send Message</div>
            <div>
              <img src={Send} alt="sendpic" className="ml-2" />
            </div>
          </button>
          <div id="displayMessage"></div>
        </form>
      </div>
      <Footer></Footer>
    </>
  );
}
