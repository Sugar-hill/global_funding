
import Image from "@node_modules/next/image"
import { loader } from "@public/assets/icons"
import { useRouter } from 'next/navigation';
const DisplayCampaigns = ({ title, isLoading, campaigns }) => {

    const router = useRouter();

    const handleNavigate = (campaign) => {
        // router.push(`/campaign-details/${campaign.id}`);
        
        // Or if using the title as identifier:
        router.push(`/campaign-details/${encodeURIComponent(campaign.title)}`);
    }
  return (
    <div>
        <h1 className="font-epilogue font-semibold text-[18px]
        text-white text-left">
            {title} ({campaigns})
        </h1>
        <div className="flex mt-[20px] gap-[26px]">
            {isLoading && (
                <Image src={loader} alt='loader' width={400} height={400} 
                className={'object-contain'} />
            )}

            {!isLoading && campaigns.length === 0 && (
            <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
                No campaigns found.
            </p>)}

            {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => 
                <FundCard
                    key={campaign.id}
                    {...campaign}
                    handleClick={() => handleNavigate(campaign) }
                />    
            )}
        </div>
    </div>
  )
}

export default DisplayCampaigns