'use client';

import { useState, useEffect } from "react";
import CountBox from "@components/CountBox";
import CustomButton from "@components/CustomButton";
import { calculateBarPercentage } from "@utils";
import { logo } from "@public/assets/icons";
import Load from "@components/loader";


const CampaignDetails = ({ campaign, remainingDays }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState([]);

  const handleDonate = async () => {
   
  }

  return (
    <div className=" min-h-screen">
      {isLoading && <Load />}

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

          <div className="mt-[8px] flex flex-row items-center px-3 gap-[12px]">
            <div className="w-[47px] h-[47px] flex items-center justify-center rounded-full
            bg-[#2c2f32] cursor-pointer">
              <img src={logo} alt="user" className="w-[60%] h-[60%] object-contain" />
            </div>
            <div>
              <h4 className="font-epilogue font-semibold text-[12.5px] text-white break-all">
                {campaign.owner}
              </h4>
              <p className="mt-[4px] font-epilogue font-normal text-[11.5px] text-[#808191]">
                8 Campaigns
              </p>
            </div>
          </div>
          </div>

          <div>
          <h4 className="font-epilogue font-semibold text-[14px] text-white px-3 uppercase">
            Story
          </h4>
          <div className="mt-[5px]">
              <p className="font-epilogue font-normal text-[13.5px] text-[#979ce7]
              leading-[26px] px-3 text-justify">
                {campaign.description}
              </p>
          </div>
          </div>

          <div>
          <h4 className="font-epilogue font-semibold text-[14px] text-white px-3 uppercase">
            Donators
          </h4>
          <div className="mt-[15px] flex flex-col gap-4">
            {donators.length > 0 ? donators.map((item, index) => (
              // <div key={`${item.donator} - ${index}`}
              // className="flex justify-between items-center gap-3">
              //   <p className="font-epilogue font-normal text-[13.5px] text-[#b2b3bd] leading-[26px]
              //   break-all"> {index + 1 }. {item.donator} </p>
              //   <p className="font-epilogue font-normal text-[13.5px] text-[#808191] leading-[26px]
              //   break-all"> {item.donation} </p>
              // </div>

              <div>
                Donator
              </div>
            )) : (
              <p className="font-epilogue font-normal text-[13.5px] px-3 text-[#979ce7]
              leading-[26px] text-justify">
                No donators yet. Be the first one!
              </p>
            )}
          </div>
          </div>
        </div>

        <div className="flex-1 p-3">
          <h4 className="font-epilogue font-semibold text-[14px] text-white uppercase" >
            Fund
          </h4>
          <div className="mt-[10px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
            <p className="font-epilogue font-medium text-[15.5px] leading-[30px] text-center text-[#808191]">
              Fund the campaign
            </p>
            <div>
              <input type="number" 
                placeholder="tgBTC 100"
                step="1"
                className="w-full py-[8px] px-[14px] outline-none border-[1px] border-[#3a3a43]
                bg-transparent font-epilogue text-white text-[15px] leading-[30px] 
                placeholder:text-[#4b5264] rounded-[10px]"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
              <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white" >
                Back it because you believe in it.
              </h4>
              <p className="mt-[18px] font-epilogue font-medium leading-[22px] text-[#808191]">
                Your contribution will be part of the campaign's success.
              </p>
              </div>

              <CustomButton 
                btnType="button"
                title="Fund Campaign"
                styles="w-full bg-[#8c6dfd]"
                handleClick={handleDonate}
              />
              
            </div>

          </div>

        </div>   
        
      </div>    
    </div>
  )
}

export default CampaignDetails;