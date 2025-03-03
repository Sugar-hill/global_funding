// app/campaign-details/[campaignId]/page.jsx
import { calculateBarPercentage, daysLeft } from "@utils";
import { campaign as campaignData } from "@/constants";
import CampaignDetails from '../CampaignDetails';

// Data fetching function for server component
async function fetchCampaignById(id) {
  const numericId = parseInt(id, 10);
  const foundCampaign = campaignData.find((camp, i) => i === numericId || camp.id === numericId);
  
  if (!foundCampaign) {
    throw new Error('Campaign not found');
  }
  
  return foundCampaign;
}

// Server Component (no hooks allowed here)
export default async function CampaignDetailsPage({ params }) {

  const fetchParams = await params;
  const { campaignId } = fetchParams;
  const campaign = await fetchCampaignById(campaignId);
  // const remainingDays = daysLeft(campaign.deadline);
  const remainingDays = campaign.deadline;
  
  // Pass data to client component
  return <CampaignDetails
    campaign={campaign} 
    remainingDays={remainingDays} 
  />;
}