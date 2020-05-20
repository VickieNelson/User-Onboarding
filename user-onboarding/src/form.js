import React, { useEffect } from "react";

const userAttrs = {};

export default function UserForm(props) {
  /* create obj props and variables */
  //name, email password, terms of service checkbox, submit button **add a dropdown as a stretch goal
  const {
    values,
    onInputChange,
    onSubmit,
    disabled,
    errors,
    onCheckboxChange,
  } = props;

  return (
    <form className='form-container'>
      {/*what does the form container need? 
      what is the jsx? what types of inputs? what are the default validation errors
      */}
      <div className='form-submit'>
        <h2>Get started today!</h2>
        {/*  DISABLE THE BUTTON */}
        <button disabled={disabled}>Join!</button>
        <div className='errors'>
          {/*  RENDER VALIDATION ERRORS HERE */}
          <div>{errors.username}</div>
          <div>{errors.email}</div>
          <div>{errors.role}</div>
          <div>{errors.civil}</div>
        </div>{" "}
        {/* this closes div class errors */}
      </div>{" "}
      {/* this closes form-submit  */}
      <div className='form-inputs'></div> {/* this closes form-inputs */}
    </form>
  );
}

{
  //form closed / return closed / function closed}
  // {/* STEP 2 implement form validation
  //     Using Yup, set up at least two different validations along with custom error messages that will display on screen when validation fails.
  // */}
  // {/* STEP 3 make post request
  //     >> Craft a POST request using axios that sends your form data to the following endpoint: https://reqres.in/api/users
  //     >>Verify using a console.log() that you are receiving a successful response back
  // (Note: For those that are curious, we're using reqres.in for this assignment's API. It's a free API that allows us to simulate a POST request for any data that we send it. Pretty awesome!)
  // */}
  // {/*
  // STEP 4 display returned data to screen
  //     >> Set up a state property called users that is initialized with an empty array
  //     >> Every time you make a POST request, and get that new user data back, update your users state with the new user added to the array
  //     >> Render users in your app. You can use the html pre tag and JSON.stringify() method to display your post request.
  // */}
}
