
import { useRouter } from 'next/navigation';
import BondFundCard from "./BondFundCard";

const BondEvents = ({ title, isLoading, investments }) => {

    const router = useRouter();

    const handleNavigate = (investment) => {
        router.push(`/bond-details/${investment.id}`);
    }
  return (
    <div className="w-5/6 m-auto bg-[#0a0a0a] p-6 rounded-[15px]">
        <h1 className="font-epilogue font-semibold text-[18px]
        text-[#ffffff] text-left">  
            {title} ({investments.length})
        </h1>
        <div className="flex flex-wrap mt-[20px] gap-[28px]">
            {/* {isLoading && (
                <Image src={loader} alt='loader' width={400} height={400} 
                className={'object-contain'} />
            )} */}

            {!isLoading && investments.length === 0 && (
            <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#ffffff]">
                No bonds found.
            </p>)}

            {!isLoading && investments.length > 0 && investments.map((investment) => (
                <BondFundCard
                    key={investment.id}
                    {...investment}
                    handleClick={() => handleNavigate(investment) }
                />    
            ))}
        </div>
    </div>
  )
}

export default BondEvents
