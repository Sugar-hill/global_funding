// app/bond-details/[bondId]/page.jsx
import { calculateBarPercentage, daysLeft } from "@utils";
import { bondInvestments } from "../../../constants";
import BondDetails from "../bondDetails";

// Data fetching function for server component
async function fetchinvestmentById(id) {
    
  const numericId = parseInt(id, 10);
  const foundinvestment = bondInvestments.find((camp, i) => i === numericId || camp.id === numericId);
  
  if (!foundinvestment) {
    throw new Error('investment not found');
  }
  
  return foundinvestment;
}

// Server Component (no hooks allowed here)
export default async function BondDetailsPage({ params }) {

  const fetchParams = await params;
  const { bondId } = fetchParams;
  const investment = await fetchinvestmentById(bondId);
  // const remainingDays = daysLeft(investment.deadline);
  const remainingDays = investment.deadline;
  
  // Pass data to client component
  return <BondDetails
    investment={investment} 
    remainingDays={remainingDays} 
  />;
}