
import { createContext } from "react";
import { doctors } from "../assets/assets";

export const AppContext = createContext();


const AppContextProvider =(props)=>{

    const currencySymbol = 'Rs. '



    const value ={
        doctors,
        currencySymbol
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;


// import React, { createContext, useState } from 'react';

// export const AppContext = createContext();

// const AppContextProvider = (props) => {
//   const [doctors, setDoctors] = useState([]);  // State to hold doctors data
//   const currencySymbol = 'Rs. ';

//   const value = {
//     doctors,
//     setDoctors,
//     currencySymbol,
//   };

//   return (
//     <AppContext.Provider value={value}>
//       {props.children}
//     </AppContext.Provider>
//   );
// };

// export default AppContextProvider;
