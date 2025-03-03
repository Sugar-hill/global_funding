'use client';

import { useState, useEffect } from "react";
import CountBox from "@components/CountBox";
import CustomButton from "@components/CustomButton";
import { calculateBarPercentage } from "@utils";
import { logo } from "@public/assets/icons";


const CampaignDetails = ({ campaign, remainingDays }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState([]);

  return (
    <div className=" min-h-screen">
      {isLoading && 'Loading...'}

      <div className="w-full flex flex-col mt-10">
        <div className="flex flex-col p-3">
          <img src={campaign.image} alt="campaign" className="w-full h-[180px] object-cover rounded-xl" />
          <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
            <div className="absolute h-full bg-[#4acd8d]" style={{ width: `${calculateBarPercentage(
              campaign.target, campaign.amountCollected
            )}%`, maxWidth: '100%'}}>
            </div>
          </div>
        </div>

        <div className="flex w-[150px] flex-wrap justify-between gap-[30px]">
          <CountBox title="Days Left" value={remainingDays} />
          <CountBox title={`Raised of ${campaign.target}`} value={campaign.amountCollected} />
          <CountBox title="Total Backers" value={donators.length} />

        </div>

      </div>
    </div>
  )
}

export default CampaignDetails;