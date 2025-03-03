"use client"

import Topbar from "@components/topbar"
import DisplayCampaigns from "@components/DisplayCampaigns";
import { useEffect, useState } from "react";
import { campaign } from "@constants";

const Home = () => {
  
  
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([
   
  ]);  //To be fetched when you set up the ton contract address
  // But for now this is a static data to make sure it looks great after
  

  const getCampaign = campaign.map((campaignn, i) => ({
    id: i,
    owner: campaignn.owner,
    title: campaignn.title,
    description: campaignn.description,
    target: campaignn.target,
    deadline: campaignn.deadline,
    image: campaignn.image,
    amountCollected: campaignn.amountCollected,

  }));

  useEffect(() => {
    setCampaigns(getCampaign);
  }, [])

  return (
    <div className="bg-slate-500 text-center min-h-screen">
      <Topbar />
      <DisplayCampaigns 
        title="All campaigns"
        isLoading= {isLoading}
        campaigns={campaigns}
      />
    
    </div>
  )
} 

export default Home