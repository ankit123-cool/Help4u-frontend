import logo from "./logo.svg";
import Alert from "@mui/material/Alert";
import "./App.css";
import React, { useState } from "react";
import Axios from "axios";
import { useEffect } from "react";

function App() {
  const [newuser, setnewuser] = useState({
    name: "Your name",
    email: "Your email-id",
    address: "Your resident address",
    contact: "Your contact number",
    dob: "Date of birth in format(DD-MM-YYYY)",
  });

  const [sev, setsev] = useState("");
  const [sevtxt, setsevtxt] = useState("");

  function handlechange(event) {
    const { value, name } = event.target;

    setnewuser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function handlesubmit(event) {
    event.preventDefault();

    let flag = true;

    //for name validation
    for (let i = 0; i < newuser.name.length; i++) {
      if (
        (newuser.name[i] >= "A" && newuser.name[i] <= "Z") ||
        (newuser.name[i] >= "a" && newuser.name[i] <= "z") ||
        newuser.name[i] === " "
      ) {
      } else {
        flag = false;
        setsev("error");
        setsevtxt("Only alphabets allowed in name");
      }
    }

    //for email validation
    if (flag === true) {
      let st = newuser.email.toLocaleLowerCase();
      if (
        st.search("@") === -1 ||
        st.slice(st.length - 4, st.length) != ".com"
      ) {
        flag = false;
        setsev("error");
        setsevtxt("Enter a valid email-id");
      }
    }

    //for contact validation

    if (flag === true) {
      if (newuser.contact.length != 10) {
        flag = false;
        setsev("error");
        setsevtxt("Contact number should be of ten digits");
      }
    }

    if (flag === true) {
      if (newuser.contact[0] === "0") {
        flag = false;
        setsev("error");
        setsevtxt("Contact number should not start with 0");
      }
    }

    if (flag === true) {
      for (let i = 0; i < newuser.contact.length; i++) {
        if (!(newuser.contact[i] >= 0 && newuser.contact[i] <= 9)) {
          flag = false;
          setsev("error");
          setsevtxt("Contact number should contain only numbers");
          break;
        }
      }
    }

    //for dob validation

    if (flag === true) {
      if (
        newuser.dob.charAt(2) != "-" ||
        newuser.dob.charAt(5) != "-" ||
        newuser.dob.length != 10
      ) {
        flag = false;
        setsev("error");
        setsevtxt("Enter DOB in format(DD-MM-YYYY)");
      }
    }

    if (flag === true) {
      fsd();
    }
  }
  const fsd = async () => {
    await Axios.post("http://localhost:3001/userinsert", {
      Username: newuser.name,
      Usermail: newuser.email,
      Useraddress: newuser.address,
      Usercontact: newuser.contact,
      Userdob: newuser.dob,
    })
      .then((res) => {
        if (res.status === 200) {
          setsev("success");
          setsevtxt("Registered successfully");
        } else {
          setsev("error");
          setsevtxt("Unable to save data!");
        }

        const blank = {
          name: "Your name",
          email: "Your email-id",
          address: "Your resident address",
          contact: "Your contact number",
          dob: "Date of birth in format(DD-MM-YYYY)",
        };

        setnewuser((prev) => {
          return {
            ...prev,
            ...blank,
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  /*
   */

  return (
    <div className="container mt-1">
      <div style={{ backgroundColor: "#343a40" }}>
        <nav class="navbar navbar-expand-lg navbar-dark">
          <a class="navbar-brand" href="http://nitp.ac.in/">
            <img
              src=" https://helper4u.in/img/h4ufinallogo.jpg"
              alt=""
              width="30"
              height="24"
              margin-right="100"
              class="d-inline-block align-text-top"
            />
            HELP4U.in
          </a>
        </nav>
      </div>
      <div className="container mt-4">
        <form>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              class="form-control"
              id="exampleInputname"
              value={newuser.name}
              onChange={handlechange}
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Email address
            </label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={newuser.email}
              onChange={handlechange}
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Resident address
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleInputPassword1"
              name="address"
              value={newuser.address}
              onChange={handlechange}
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Contact no.
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleInputPassword1"
              name="contact"
              value={newuser.contact}
              onChange={handlechange}
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Date of birth
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleInputPassword1"
              name="dob"
              value={newuser.dob}
              onChange={handlechange}
            />
          </div>
          <button
            className="btn btn-outline-success"
            onClick={handlesubmit}
            disabled={
              newuser.name === "Your name" ||
              newuser.email === "Your email-id" ||
              newuser.address === "Your resident address" ||
              newuser.contact === "Your contact number" ||
              newuser.dob === "Date of birth in format(DD-MM-YYYY)"
            }
          >
            Register
          </button>
        </form>
      </div>
      <div style={{ visibility: sev != "" ? "visible" : "hidden" }}>
        <Alert severity={sev} onClose={() => setsev("")}>
          {sevtxt}
        </Alert>
      </div>
    </div>
  );
}

export default App;
