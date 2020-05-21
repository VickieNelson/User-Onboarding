import React from "react";

export default function User({ details }) {
  if (!details) {
     return <h3>fetch user details...</h3>

    }


   return (

<div className='user-container'>

       <h2>{details.first_name}</h2>

       <h2>{details.last_name}</h2>

       <p>Email: {details.email}</p>

       <p>Password: {details.password}</p>

       <p>age: {details.age}</p>


       {

!details.terms

<div>

           Terms:

           <ul>

             {details.terms.map((accept, idx) => <li key={idx}>{accept}</li>)}

           </ul>

         </div>

}

     </div>

)

}


 export default User
