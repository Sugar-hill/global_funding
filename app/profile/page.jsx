"use client"

import Topbar from "@components/topbar"
import Displayinvestments from "@components/DisplayEvents";
import { useEffect, useState } from "react";

const Profile = () => {
  
  const img1 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIqxsJdtp5KfySlJo3zK5itptTZhKnWVB5Fg&s"
  const img2 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScGujzqQk2aFY1ppUSOZU3Mkf-KB56Osfu3w&s"
  const img3 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj6t-pvGAtJbbHEpmNixp-RA8EPUyhbIi-ow&s"
  const img4 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy50_LAqiNiHc49CFMpAz_NlvHKogHvF-ETw&s"

  const [isLoading, setIsLoading] = useState(false);
  const [investments, setinvestments] = useState([
   
  ]);  //To be fetched when you set up the ton contract address
  // But for now this is a static data to make sure it looks great after
  
  
  const investment = [
    { id: 0, owner: "0Xabdsefghfgjnnnhnnnnnnfghfghgfhfghfg", title: "investment 1", description: "This is investment 1 and I am just repeating words here.", target: "238", deadline: 2, image: img1, amountCollected: "122" },
    { id: 1, owner: "0Xabdseghfghjgjkjkjhjhjjjjjhkhdgrtgdr", title: "investment 2", description: "This is investment 2 and I am just repeating words here.", target: "238", deadline: 89, image: img2, amountCollected: "122" },
    { id: 2, owner: "0Xabdseghfghjgjkjkjhjhjjjjjhkhdgrtgdr", title: "investment 3", description: "This is investment 3 and I am just repeating words here.", target: "238", deadline: 67, image: img3, amountCollected: "122" },
    { id: 3, owner: "0Xabdseghfghjgjkjkjhjhjjjjjhkhdgrtgdr", title: "investment 4", description: "This is investment 4 and I am just repeating words here.", target: "238", deadline: 32, image: img4, amountCollected: "122" }
  ];


  const getUserinvestments = () => {
    const allinvestments = investment;

    const filteredinvestments = allinvestments.filter((investment) => 
      investment.owner === "0Xabdsefghfgjnnnhnnnnnnfghfghgfhfghfg" // later change that to address, for dynamic check
    );
    return filteredinvestments;
  } // and putthem in another file

  useEffect(() => {
    setinvestments(getUserinvestments);
  }, [])

  return (
    <div className="bg-[#000000] text-center min-h-screen">
      <Topbar />
      <Displayinvestments 
        title="All investments"
        isLoading= {isLoading}
        investments={investments}
      />
    
    </div>
  )
} 

export default Profile