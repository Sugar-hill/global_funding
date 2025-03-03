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
        <div className="flex flex-col p-5">
          <img src={campaign.image} alt="campaign" className="w-full h-[180px] object-cover rounded-xl" />
          <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
            <div className="absolute h-full bg-[#8bffc5]" style={{ width: `${calculateBarPercentage(
              campaign.target, campaign.amountCollected
            )}%`, maxWidth: '100%'}}>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-row justify-between px-2 py-1">
          <CountBox title="Days Left" value={remainingDays} />
          <CountBox title={`Raised of ${campaign.target}`} value={campaign.amountCollected} />
          <CountBox title="Total Backers" value={donators.length} />
        </div>
      </div>
      <div className="mt-[26px] flex flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
          <h4 className="font-epilogue font-semibold text-[14px] text-white p-3 uppercase">
            Creator
          </h4>

          <div className="mt-[8px] flex flex-row items-center px-2 gap-[12px]">
            <div className="w-[47px] h-[47px] flex items-center justify-center rounded-full
            bg-[#2c2f32] cursor-pointer">
              <img src={logo} alt="user" className="w-[60%] h-[60%] object-contain" />
            </div>
            <div>
              <h4 className="font-epilogue font-semibold text-[12px] text-white break-all">
                {campaign.owner}
              </h4>
              <p className="mt-[4px] font-epilogue font-normal text-[11.5px] text-[#808191]">
                8 Campaigns
              </p>
            </div>

          </div>

          </div>





        </div>
      </div>
    </div>
  )
}

export default CampaignDetails;