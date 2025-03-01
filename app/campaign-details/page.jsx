

import { useState, useEffect } from "react";
import { CustomButton } from "@components";
import { calculateBarPercentage, daysLeft } from "@utils";
import { logo } from "@public/assets/icons";

const CampaignDetails = async ({params}) => {
  const { id } = params;
  const campaign = await fetchCampaignById(id);
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState([]);

  const remainingDays = daysLeft(state.deadline);
  return (
    <div>CampaignDetails</div>
  )
}

export default CampaignDetails;