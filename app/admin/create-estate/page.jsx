"use client"

import { useState } from "react";
import { money } from "@public/assets/icons";
import CustomButton from "@components/CustomButton";
import FormField from "@components/FormField";
import { checkIfImage } from "@utils";
import Image from "@node_modules/next/image";
import { useRouter } from 'next/navigation';
import Load from "@components/loader";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useWalletClient } from 'wagmi';
import { ethers } from 'ethers';
import TokenizedAssets from '@contracts/contracts.json';

const CreateEstate = () => {
  const router = useRouter();
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    companyName: '',
    description: '',
    target: '',
    monthlyRentEstimate: '',
    deadline: '',
    image1: '',
    image2: '',
    image3: '',
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!address) {
      alert('Please connect your wallet first');
      return;
    }

    if (!walletClient) {
      alert('Please connect your wallet and wait for it to be ready');
      return;
    }

    setIsLoading(true);
    try {
      // Convert target amount to wei
      const targetAmount = ethers.utils.parseUnits(form.target, 18);
      
      // Convert monthly rent estimate to wei
      const monthlyRentEstimate = ethers.utils.parseUnits(form.monthlyRentEstimate, 18);
      
      // Convert deadline to timestamp
      const deadline = Math.floor(new Date(form.deadline).getTime() / 1000);
      
      // Create REIT through contract
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        TokenizedAssets.abi,
        walletClient
      );

      console.log('Creating REIT with params:', {
        owner: address,
        companyName: form.companyName,
        description: form.description,
        targetAmount: targetAmount.toString(),
        monthlyRentEstimate: monthlyRentEstimate.toString(),
        deadline: deadline,
        images: [form.image1, form.image2, form.image3]
      });

      const tx = await contract.createREIT(
        address,
        form.companyName,
        form.description,
        targetAmount,
        monthlyRentEstimate,
        deadline,
        [form.image1, form.image2, form.image3]
      );

      console.log('Transaction sent:', tx.hash);
      await tx.wait();
      console.log('Transaction confirmed');
      router.push('/');
    } catch (error) {
      console.error('Error creating REIT:', error);
      alert('Failed to create REIT. Please try again.');
    } finally {
      setIsLoading(false);
    }
  } 

  return (
    <div className="w-5/6 m-auto bg-[#0a0a0a] rounded-[15px] flex justify-center 
    flex-col rounded-b-[10px] px-[100px] py-[40px] min-h-screen">
      {isLoading && <Load />}
      <div className="flex justify-end pb-10"> <ConnectButton /> </div>

      <div className="flex justify-center items-center w-64 p-[15px] bg-[#322543]
      rounded-[10px] m-auto">
        <h1 className="font-epilogue font-bold text-[25px] text-white leading-[38px]">
          Create New REIT
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">

        <FormField
          labelName="Company Name *"
          placeholder="Enter company name"
          inputType="text"
          value={form.companyName}
          handleChange={(e) => handleFormFieldChange('companyName', e)}
        />

        <FormField
          labelName="Description *"
          placeholder="Write about the REIT in detail"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange('description', e)}
        />

        <div className="w-full flex justify-start items-center p-4 bg-[#042f2e] h-[100px]
        rounded-[10px]">
          <Image src={money} alt='money' width={28} height={28} 
           className={'object-contain'} />
          <h4 className="font-epilogue font-bold text-[18px] text-white ml-[20px]">
            You will get 99% of the total amount</h4> 
        </div>

        <FormField
          labelName="Target Amount (USDT) *" 
          placeholder="1000000"
          inputType="number"
          value={form.target}
          handleChange={(e) => handleFormFieldChange('target', e)}
        />

        <FormField
          labelName="Monthly Rent Estimate (USDT) *"
          placeholder="5000"
          inputType="number"
          value={form.monthlyRentEstimate}
          handleChange={(e) => handleFormFieldChange('monthlyRentEstimate', e)}
        />

        <FormField
          labelName="End Date *"
          placeholder="End Date"
          inputType="date"
          value={form.deadline}
          handleChange={(e) => handleFormFieldChange('deadline', e)}
        />

        <FormField
          labelName="Estate Image 1 *"
          placeholder="Place image URL of your estate"
          inputType="url"
          value={form.image1}
          handleChange={(e) => handleFormFieldChange('image1', e)}
        />

        <FormField
          labelName="Estate Image 2 *"
          placeholder="Place image URL of your estate"
          inputType="url"
          value={form.image2}
          handleChange={(e) => handleFormFieldChange('image2', e)}
        />

        <FormField
          labelName="Estate Image 3 *"
          placeholder="Place image URL of your estate"
          inputType="url"
          value={form.image3}
          handleChange={(e) => handleFormFieldChange('image3', e)}
        />

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Create REIT"
            styles="bg-[#042f2e]"
          />
        </div>  
      </form>
    </div>
  )
}

export default CreateEstate;