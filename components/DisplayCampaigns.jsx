
import { useRouter } from 'next/navigation';
import FundCard from "./FundCard";

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {

    const router = useRouter();

    const handleNavigate = (campaign) => {
        router.push(`/campaign-details/${campaign.id}`);
    }
  return (
    <div>
        <h1 className="font-epilogue font-semibold text-[18px]
        text-white text-left">  
            {title} ({campaigns.length})
        </h1>
        <div className="flex flex-col mt-[20px] gap-[26px] px-6">
            {/* {isLoading && (
                <Image src={loader} alt='loader' width={400} height={400} 
                className={'object-contain'} />
            )} */}

            {!isLoading && campaigns.length === 0 && (
            <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
                No campaigns found.
            </p>)}

            {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => (
                <FundCard
                    key={campaign.id}
                    {...campaign}
                    handleClick={() => handleNavigate(campaign) }
                />    
            ))}
        </div>
    </div>
  )
}

export default DisplayCampaigns