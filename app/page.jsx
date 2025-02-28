"use client"

import Topbar from "@components/topbar"
import DisplayCampaigns from "@components/DisplayCampaigns";
import { useState } from "react";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]); //To be fetched when you set up the ton contract address

  return (
    <div className="bg-slate-500 text-center min-h-screen">
      <Topbar />
      <DisplayCampaigns 
        title="All campaigns"
        isLoading= {isLoading}
        campaigns="0" //Change this later to dynamic -> {campaigns}
      />
    
    </div>
  )
} 

export default Home