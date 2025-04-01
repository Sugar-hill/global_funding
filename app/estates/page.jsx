"use client"

import Topbar from "@components/topbar"
import DisplayEvents from "@components/DisplayEvents";
import { useEffect, useState } from "react";
import { realEstateInvestments } from "../../constants";

const Estates = () => {
  
  
  const [isLoading, setIsLoading] = useState(false);
  const [investments, setinvestments] = useState([
   
  ]);  //To be fetched when you set up the ton contract address
  // But for now this is a static data to make sure it looks great after
  

  const getinvestment = realEstateInvestments.map((investmentn, i) => ({
    id: i,
    owner: investmentn.owner,
    title: investmentn.title,
    description: investmentn.description,
    target: investmentn.target,
    deadline: investmentn.deadline,
    image: investmentn.image,
    image2: investmentn.image2,
    image3: investmentn.image3,
    amountCollected: investmentn.amountCollected,

  }));

  useEffect(() => {
    setinvestments(getinvestment);
  }, [])

  return (
    <div className="bg-[#000000] text-center min-h-screen">
      <Topbar />
      <DisplayEvents 
        title="All events"
        isLoading= {isLoading}
        investments={investments}
      />
    
    </div>
  )
} 

export default Estates