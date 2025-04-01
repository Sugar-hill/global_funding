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
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import { useContract } from 'wagmi';
import TokenizedAssets from '@contracts/contracts.json';

const CreateBond = () => {
  const router = useRouter();
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: '',
    target: '',
    period: '', // Maturity period in days
    valuationPercentage: '', // Interest rate in basis points (e.g. 500 = 5%)
    deadline: '',
    image: '',
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

    checkIfImage(form.image, async (exists) => {
      if(exists) {
        setIsLoading(true);
        try {
          // Convert target amount to wei
          const targetAmount = ethers.utils.parseUnits(form.target, 18);
          
          // Convert period to days (assuming input is in days)
          const period = ethers.BigNumber.from(form.period);
          
          // Convert valuation percentage to basis points (e.g., 5% = 500)
          const valuationPercentage = ethers.BigNumber.from(form.valuationPercentage);
          
          // Convert deadline to timestamp
          const deadline = Math.floor(new Date(form.deadline).getTime() / 1000);
          
          // Create bond through contract
          const contract = new ethers.Contract(
            process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
            TokenizedAssets.abi,
            new ethers.providers.Web3Provider(window.ethereum).getSigner()
          );

          const tx = await contract.createBond(
            address,
            form.name,
            form.description,
            targetAmount,
            period,
            valuationPercentage,
            deadline,
            form.image
          );

          await tx.wait();
          router.push('/');
        } catch (error) {
          console.error('Error creating bond:', error);
          alert('Failed to create bond. Please try again.');
        } finally {
          setIsLoading(false);
        }
      } else {
        alert('Please upload a valid image');
        setForm({...form, image: ''});
      }
    });
  } 

  return (
    <div className="w-5/6 m-auto bg-[#0a0a0a] rounded-[15px] flex justify-center 
    flex-col rounded-b-[10px] px-[100px] py-[40px] min-h-screen">
      {isLoading && <Load />}
      <div className="flex justify-end pb-10"> <ConnectButton /> </div>

      <div className="flex justify-center items-center w-64 p-[15px] bg-[#322543]
      rounded-[10px] m-auto">
        <h1 className="font-epilogue font-bold text-[25px] text-white leading-[38px]">
          Create New Bond
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">

        <FormField
          labelName="Bond Name *"
          placeholder="Enter bond name"
          inputType="text"
          value={form.name}
          handleChange={(e) => handleFormFieldChange('name', e)}
        />

        <FormField
          labelName="Description *"
          placeholder="Write about the bond in detail"
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
          labelName="Maturity Period (Days) *"
          placeholder="365"
          inputType="number"
          value={form.period}
          handleChange={(e) => handleFormFieldChange('period', e)}
        />

        <FormField
          labelName="Interest Rate (Basis Points) *"
          placeholder="500 (5%)"
          inputType="number"
          value={form.valuationPercentage}
          handleChange={(e) => handleFormFieldChange('valuationPercentage', e)}
        />

        <FormField
          labelName="End Date *"
          placeholder="End Date"
          inputType="date"
          value={form.deadline}
          handleChange={(e) => handleFormFieldChange('deadline', e)}
        />

        <FormField
          labelName="Bond Image *"
          placeholder="Place image URL of your bond"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormFieldChange('image', e)}
        />

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Create Bond"
            styles="bg-[#042f2e]"
          />
        </div>  
      </form>
    </div>
  )
}

export default CreateBond;