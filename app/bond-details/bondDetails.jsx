'use client';

import { useState, useEffect } from "react";
import CountBox from "@components/CountBox";
import CustomButton from "@components/CustomButton";
import { calculateBarPercentage } from "@utils";
import { logo } from "@public/assets/icons";
import Load from "@components/loader";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useStateContext } from '../../context';

const BondDetails = ({ investment, remainingDays }) => {
  const { contributeToAsset, getContributions } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState([]);

  useEffect(() => {
    const fetchContributions = async () => {
      const { contributors, amounts } = await getContributions(investment.id);
      setDonators(contributors.map((contributor, index) => ({
        donator: contributor,
        donation: amounts[index]
      })));
    };
    fetchContributions();
  }, [investment.id]);

  const handleDonate = async () => {
    if (!amount || amount <= 0) return;
    
    setIsLoading(true);
    try {
      await contributeToAsset(investment.id, amount);
      // Refresh contributions after successful donation
      const { contributors, amounts } = await getContributions(investment.id);
      setDonators(contributors.map((contributor, index) => ({
        donator: contributor,
        donation: amounts[index]
      })));
      setAmount(''); // Clear input after successful donation
    } catch (error) {
      console.error('Error donating:', error);
      alert('Failed to donate. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-5/6 m-auto bg-gradient-to-b from-[#000000] to-[#042f2e] p-6 rounded-[15px]">
      {isLoading && <Load />}
      <div className="flex justify-end pb-4"> <ConnectButton /> </div>

      <div className="w-full flex md:flex-row flex-col mt-5 gap-[30px]">
        <div className="flex-1 flex-col">
          <div className="flex flex-row gap-2">
            <img src={investment.image} alt="investment" className="w-full h-[438px] object-cover rounded-xl" />
          </div>
          <div className="mt-2">
            <div className="flex items-center gap-2">
              <div className="relative w-full h-[5px] bg-[#115e59]">
                <div className="absolute h-full bg-[#e9e6f9]" style={{ width: `${calculateBarPercentage(
                  investment.target, investment.amountCollected
                )}%`, maxWidth: '100%'}}>
                </div>
              </div>
              <span className="text-[#e9e6f9] text-sm font-medium">
                {calculateBarPercentage(investment.target, investment.amountCollected)}%
              </span>
            </div>
          </div>
        </div>

        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox title="Days Left" value={remainingDays} />
          <CountBox title={`Raised of ${investment.target}`} value={investment.amountCollected} />
          <CountBox title="Total Buyers" value={donators.length} />
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5 ">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-[#ffffff] uppercase">
              Owner
            </h4>

            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#115e59] cursor-pointer">
                <img src={logo} alt="user" className="w-[60%] h-[60%] object-contain"/>
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] text-[#9f9fa7] break-all">{investment.owner}</h4>
                <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#6b7280]">6 Deals</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-[#ffffff] uppercase">About</h4>
            <div className="mt-[20px]">
              <p className="font-epilogue font-normal text-[16px] text-[#a5b4fc] leading-[26px] text-justify">{investment.description}</p>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-[#ffffff] uppercase">Estimate Return</h4>
            <div className="mt-[20px]">
              <p className="font-epilogue font-normal text-[16px] text-[#a5b4fc] leading-[26px] text-justify">{investment.monthlyRentEstimate} USDT</p>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-[#ffffff] uppercase">Buyers</h4>
            <div className="mt-[20px] flex flex-col gap-4">
              {donators.length > 0 ? donators.map((item, index) => (
                <div key={`${item.donator}-${index}`} className="flex justify-between items-center gap-4">
                  <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-ll">{index + 1}. {item.donator}</p>
                  <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-ll">{item.donation} USDT</p>
                </div>
              )) : (
                <p className="font-epilogue font-normal text-[16px] text-[#a5b4fc] leading-[26px] text-justify">No buyers yet. Be the first one!</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h4 className="font-epilogue font-semibold text-[18px] text-[#ffffff] uppercase">Buy</h4>   

          <div className="mt-[20px] flex flex-col p-4 bg-[#000000] border-[1px] border-[#115e59] rounded-[10px]">
            <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#322543]">
              Secure your deal
            </p>
            <div className="mt-[30px]">
              <input 
                type="number"
                placeholder="500 USDT"
                step="2.5"
                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#115e59] bg-transparent font-epilogue text-[#322543] text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <div className="my-[20px] p-4 bg-[#042f2e] rounded-[10px]">
                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">Buy it at any amount.</h4>
                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#c1b6eb]"> Own a piece of the action and get pieces of the pie every month.</p>
              </div>

              <CustomButton 
                btnType="button"
                title="Mint"
                styles="w-full bg-[#0f766e] border-[1px] border-[#134e4a]"
                handleClick={handleDonate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BondDetails;