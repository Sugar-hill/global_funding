// app/investment-details/[investmentId]/page.jsx
import { calculateBarPercentage, daysLeft } from "@utils";
import { realEstateInvestments } from "../../../constants";
import EstateDetails from "../estateDetails";

// Data fetching function for server component
async function fetchinvestmentById(id) {
  const numericId = parseInt(id, 10);
  const foundinvestment = realEstateInvestments.find((camp, i) => i === numericId || camp.id === numericId);
  
  if (!foundinvestment) {
    throw new Error('investment not found');
  }
  
  return foundinvestment;
}

// Server Component (no hooks allowed here)
export default async function EstateDetailsPage({ params }) {

  const fetchParams = await params;
  const { estateId } = fetchParams;
  const investment = await fetchinvestmentById(estateId);
  // const remainingDays = daysLeft(investment.deadline);
  const remainingDays = investment.deadline;
  
  // Pass data to client component
  return <EstateDetails
    investment={investment} 
    remainingDays={remainingDays} 
  />;
}