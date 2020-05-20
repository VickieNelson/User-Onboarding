import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import formSchema from "./formSchema";
import * as yup from "yup";

// import logo from './logo.svg';
import UserForm from "./Form";
import User from "./User";
import "./App.css";

const initialFormValues = {
  ///// TEXT INPUTS, name email password /////
  first_name: "",
  last_name: "",
  email: "",
  password: "",

  ///// DROPDOWN (stretch)/////
  age: "",

  ///// CHECKBOX for terms /////
  terms: {
    Accept: false,
    Reject: false,
  },
};
const initialFormErrors = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  age: "",
  terms: "",
};
const initialUsers = [];
const initialDisabled = true;

// //SET UP STATE FOR `formErrors` AND `disabled`

export default function App() {
  const [users, setUsers] = useState(initialUsers);
  const [formValues, setFormValues] = useState(initialFormValues);

  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);
  //////////////// HELPERS ////////////////
  const getUsers = () => {
    //  ON SUCCESS PUT User IN STATE
    //     axios.get  from `https://reqres.in/api/users`
    axios
      .get("https://reqres.in/api/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        // debugger;
      });
  };

  const postNewUser = (newUser) => {
    // ON SUCCESS ADD NEW User TO STATE
    //    helper to POST `newUser` to `https://reqres.in/api/users`
    //    and regardless of success or failure, the form should reset
    axios
      .post("https://reqres.in/api/users", newUser)
      .then((res) => {
        setUsers([res.data, ...users]);
        // getUsers() // the price of triggering a new 'getUsers`
      })
      .catch((err) => {
        debugger;
      })
      .finally(() => {
        setFormValues(initialFormValues);
      });
  };

  //////////////// EVENT HANDLERS ////////////////

  const onInputChange = (evt) => {
    const first_name = evt.target.first_name;
    const last_name = evt.target.last_name;

    const value = evt.target.value;

    // VALIDATION WITH YUP
    yup
      .reach(formSchema, first_name)
      // we can then run validate using the value
      .validate(value)
      .then((valid) => {
        // happy path, we can clear the error message
        setFormErrors({
          ...formErrors,
          [first_name]: "",
        });
      })
      .catch((err) => {
        // sad path, does not validate so we set the error message to the message
        // returned from yup (that we created in our schema)
        setFormErrors({
          ...formErrors,
          [first_name]: err.errors[0],
        });
      });

    // Wether or not our validation was successful, set the state to the new value as the user is typing
    setFormValues({
      ...formValues,
      [first_name]: value, // NOT AN ARRAY
    });
  };

  const onCheckboxChange = (evt) => {
    //
    // a) pull the `name` of the checkbox from the event
    const { terms } = evt.target;
    // b) pull whether `checked` true or false, from the event
    const { checked } = evt.target;

    // c) set a new state for the whole form
    setFormValues({
      // copy formvalues
      ...formValues,
      // override one thing inside formvalues
      terms: {
        // copy the current hobbies
        ...formValues.terms,
        // override one of the hobbies
        [terms]: checked, // NOT AN ARRAY
      },
    });
  };

  const onSubmit = (evt) => {
    evt.preventDefault();

    const newUser = {
      first_name: formValues.first_name.trim(),
      last_name: formValues.last_name.trim(),
      email: formValues.email.trim(),
      passwor: formValues.password.trim(),
      age: formValues.age,

      // terms??????
      terms: Object.keys(formValues.terms).filter(
        (term) => formValues.terms[term] === true
      ),
    };
    //POST NEW user
    postNewUser(newUser);
  };

  //////////////// SIDE EFFECTS ////////////////
  //////////////// SIDE EFFECTS ////////////////
  //////////////// SIDE EFFECTS ////////////////
  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    // 🔥 STEP 11- ADJUST THE STATUS OF `disabled` EVERY TIME `formValues` CHANGES
    formSchema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <div className='container'>
      <header>
        <h1>Users App</h1>
      </header>

      <User
        values={formValues}
        onInputChange={onInputChange}
        onSubmit={onSubmit}
        //  ADDITIONAL PROPS
        disabled={disabled}
        errors={formErrors}
        onCheckboxChange={onCheckboxChange}
      />

      {/* {users.map((user) => {
        return <User key={
          user.first_name, 
          user.last_name,
          user.email,
          user.password,
          user.age,
          user.terms,
      } details={user} />;
      })} */}
    </div>
  );
}
