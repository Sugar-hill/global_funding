"use client"

import { useState } from "react";
import { money } from "@public/assets/icons";
import CustomButton from "@components/CustomButton";
import FormField from "@components/FormField";
import { checkIfImage } from "@utils";
import Image from "@node_modules/next/image";
import { useRouter } from 'next/navigation';


const CreateCampaign = () => {

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    image: '',
    deadline: '',
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

  //Don't forget to add the TON connection logics here  
  const handleSubmit = (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if(exists) {
        setIsLoading(true);
        // Add your TON transaction logic here // await createCampaign(name, organization, description, parseFloat(goal), imageUrl);
        setIsLoading(false);
        router.push('/');

      } else {
        alert('Please upload a valid image');
        setForm({...form, image: ''});
      }
    })
    console.log(form);

  } 

  return (
    <div className="bg-[#1c1c24] flex justify-center items-start
    flex-col rounded-b-[10px] p-10 min-h-screen">
      {isLoading && 'Loader...'}
      <div className="flex justify-center items-center w-64 p-[15px] bg-[#3a3a43]
      rounded-[10px] m-auto">
        <h1 className="font-epilogue font-bold text-[25px] text-white leading-[38px]">
          Start a Campaign
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">

        <FormField
        labelName="Your Name *"
        placeholder="John Doe"
        inputType="text"
        value={form.name}
        handleChange={(e) => handleFormFieldChange('name', e)}
        />

        <FormField
        labelName="Campaign Title"
        placeholder="Write a title"
        inputType="text"
        value={form.title}
        handleChange={(e) => handleFormFieldChange('title', e)}
        />

        <FormField
        labelName="Story"
        placeholder="Write your story"
        isTextArea
        value={form.description}
        handleChange={(e) => handleFormFieldChange('description', e)}
        />

        <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[100px]
        rounded-[10px]">
          <Image src={money} alt='money' width={28} height={28} 
           className={'object-contain'} />
          <h4 className="font-epilogue font-bold text-[18px] text-white ml-[20px]">
            You will get 98% of the raised amount</h4> 
        </div>

        <FormField
        labelName="Goal *" 
        placeholder="TgBTC 200"
        inputType="text"
        value={form.target}
        handleChange={(e) => handleFormFieldChange('target', e)}
        />

        <FormField
        labelName="End Date *"
        placeholder="End Date"
        inputType="date"
        value={form.deadline}
        handleChange={(e) => handleFormFieldChange('deadline', e)}
        />

        <FormField
        labelName="Campaign Image *"
        placeholder="Place image URL of your campaign"
        inputType="url"
        value={form.image}
        handleChange={(e) => handleFormFieldChange('image', e)}
        />

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Submit new campaign"
            styles="bg-[#1dc071]"
          />

        </div>  
      </form>
    </div>
  )
}

export default CreateCampaign;