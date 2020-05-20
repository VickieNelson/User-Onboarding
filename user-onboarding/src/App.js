import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

// import logo from './logo.svg';
import UserForm from "./Form";
import "./App.css";

const initialFormValues = {
  ///// TEXT INPUTS /////
  username: "",
  email: "",
  ///// DROPDOWN /////
  occupation: "",

  ///// CHECKBOXES /////
  terms: {
    Accept: false,
    Reject: false,
  },
};
const initialFormErrors = {
  username: "",
  email: "",
  role: "",
  civil: "",
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
  const getFriends = () => {
    // 🔥 STEP 6- IMPLEMENT! ON SUCCESS PUT FRIENDS IN STATE
    //    helper to [GET] all friends from `http://localhost:4000/friends`
    axios
      .get("http://localhost:4000/friends")
      .then((res) => {
        setFriends(res.data);
      })
      .catch((err) => {
        debugger;
      });
  };

  const postNewFriend = (newFriend) => {
    // 🔥 STEP 7- IMPLEMENT! ON SUCCESS ADD NEWLY CREATED FRIEND TO STATE
    //    helper to [POST] `newFriend` to `http://localhost:4000/friends`
    //    and regardless of success or failure, the form should reset
    axios
      .post("http://localhost:4000/friends", newFriend)
      .then((res) => {
        setFriends([res.data, ...friends]);
        // getFriends() // the price of triggering a new 'getFriends`
      })
      .catch((err) => {
        debugger;
      })
      .finally(() => {
        setFormValues(initialFormValues);
      });
  };

  //////////////// EVENT HANDLERS ////////////////
  //////////////// EVENT HANDLERS ////////////////
  //////////////// EVENT HANDLERS ////////////////
  const onInputChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;

    // 🔥 STEP 12- RUN VALIDATION WITH YUP
    yup
      .reach(formSchema, name)
      // we can then run validate using the value
      .validate(value)
      .then((valid) => {
        // happy path, we can clear the error message
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        // sad path, does not validate so we set the error message to the message
        // returned from yup (that we created in our schema)
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });

    // Wether or not our validation was successful, we will still set the state to the new value as the user is typing
    setFormValues({
      ...formValues,
      [name]: value, // NOT AN ARRAY
    });
  };

  const onCheckboxChange = (evt) => {
    // 🔥 STEP 8- IMPLEMENT!
    // a) pull the `name` of the checkbox from the event
    const { name } = evt.target;
    // b) pull whether `checked` true or false, from the event
    const { checked } = evt.target;

    // c) set a new state for the whole form
    setFormValues({
      // copy formvalues
      ...formValues,
      // override one thing inside formvalues
      hobbies: {
        // copy the current hobbies
        ...formValues.hobbies,
        // override one of the hobbies
        [name]: checked, // NOT AN ARRAY
      },
    });
  };

  const onSubmit = (evt) => {
    evt.preventDefault();

    const newFriend = {
      username: formValues.username.trim(),
      email: formValues.email.trim(),
      role: formValues.role,
      civil: formValues.civil,
      // 🔥 STEP 9- WHAT ABOUT HOBBIES?
      hobbies: Object.keys(formValues.hobbies).filter(
        (hobbie) => formValues.hobbies[hobbie] === true
      ),
    };
    // 🔥 STEP 10- POST NEW FRIEND USING HELPER
    postNewFriend(newFriend);
  };

  //////////////// SIDE EFFECTS ////////////////
  //////////////// SIDE EFFECTS ////////////////
  //////////////// SIDE EFFECTS ////////////////
  useEffect(() => {
    getFriends();
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
        <h1>Friends App</h1>
      </header>

      <FriendForm
        values={formValues}
        onInputChange={onInputChange}
        onSubmit={onSubmit}
        // 🔥🔥🔥 ADDITIONAL PROPS NEEDED 🔥🔥🔥
        disabled={disabled}
        errors={formErrors}
        onCheckboxChange={onCheckboxChange}
      />

      {friends.map((friend) => {
        return <Friend key={friend.id} details={friend} />;
      })}
    </div>
  );
}
