import { createNew, home, payment, profile, estate, bonds } from '../public/assets/icons';

export const navlinks = [
  {
    name: 'home',
    imgUrl: home,
    link: '/',
    
  },
  {
    name: 'estate',
    imgUrl: estate,
    link: '/estates',
    
  },
  {
    name: 'bonds',
    imgUrl: bonds,
    link: '/bonds',
    
  },
  {
    name: 'profile',
    imgUrl: profile,
    link: '/profile',
    
  },
];

const estateImg1 = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3" // Luxury apartment
const estateImg2 = "https://images.unsplash.com/photo-1486406146923-c433d7bca75f?ixlib=rb-4.0.3" // Modern office building
const estateImg3 = "https://images.unsplash.com/photo-1512917774080-9991f1c4c129?ixlib=rb-4.0.3" // Luxury house
const estateImg4 = "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3" // Retail property

const bondImg1 = "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3" // Financial bonds
const bondImg2 = "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3" // Corporate bonds
const bondImg3 = "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3" // Treasury bonds
const bondImg4 = "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3" // Municipal bonds

export const realEstateInvestments = [
  { 
    id: 0, 
    owner: "0Xabdsefghfgjnnnhnnnnnnfghfghgfhfghfg", 
    title: "Luxury Apartment Complex", 
    description: "Modern 50-unit apartment complex in downtown area with premium amenities including pool, gym, and 24/7 security.", 
    target: "2500000", 
    deadline: 180, 
    image: estateImg1, 
    image2: estateImg4, 
    image3: estateImg1, 
    amountCollected: "750000",
    type: "estate",
    location: "New York, NY",
    propertyType: "Residential",
    expectedROI: "12%"
  },
  { 
    id: 1, 
    owner: "0Xabdseghfghjgjkjkjhjhjjjjjhkhdgrtgdr", 
    title: "Commercial Office Space", 
    description: "Premium office space in a Class A building with high tenant occupancy rate and long-term lease agreements.", 
    target: "5000000", 
    deadline: 90, 
    image: estateImg4, 
    image2: estateImg1, 
    image3: estateImg1, 
    amountCollected: "1500000",
    type: "estate",
    location: "San Francisco, CA",
    propertyType: "Commercial",
    expectedROI: "15%"
  },
  { 
    id: 2, 
    owner: "0Xabdseghfghjgjkjkjhjhjjjjjhkhdgrtgdr", 
    title: "Luxury Residential Estate", 
    description: "Exclusive 5-bedroom mansion with premium finishes, smart home technology, and extensive outdoor living space.", 
    target: "3500000", 
    deadline: 120, 
    image: estateImg1, 
    image2: estateImg1, 
    image3: estateImg4, 
    amountCollected: "1000000",
    type: "estate",
    location: "Beverly Hills, CA",
    propertyType: "Residential",
    expectedROI: "10%"
  },
  { 
    id: 3, 
    owner: "0Xabdseghfghjgjkjkjhjhjjjjjhkhdgrtgdr", 
    title: "Shopping Mall Complex", 
    description: "Modern retail space with high foot traffic, featuring anchor stores and diverse tenant mix.", 
    target: "7500000", 
    deadline: 240, 
    image: estateImg4, 
    image2: estateImg1, 
    image3: estateImg4, 
    amountCollected: "2000000",
    type: "estate",
    location: "Miami, FL",
    propertyType: "Retail",
    expectedROI: "18%"
  }
];

export const bondInvestments = [
  { 
    id: 0, 
    owner: "0Xabdsefghfgjnnnhnnnnnnfghfghgfhfghfg", 
    title: "Government Treasury Bonds", 
    description: "10-year government treasury bonds offering stable returns with low risk profile. Minimum investment of $10,000.", 
    target: "1000000", 
    deadline: 3650, 
    image: bondImg2, 
    image2: bondImg1, 
    image3: bondImg1, 
    amountCollected: "300000",
    type: "bonds",
    bondType: "Government Treasury",
    maturityPeriod: "10 years",
    interestRate: "4.5%",
    riskLevel: "Low"
  },
  { 
    id: 1, 
    owner: "0Xabdseghfghjgjkjkjhjhjjjjjhkhdgrtgdr", 
    title: "Corporate Bonds Portfolio", 
    description: "Diversified portfolio of investment-grade corporate bonds from Fortune 500 companies with varying maturity dates.", 
    target: "2000000", 
    deadline: 1825, 
    image: bondImg2, 
    image2: bondImg2, 
    image3: bondImg2, 
    amountCollected: "600000",
    type: "bonds",
    bondType: "Corporate",
    maturityPeriod: "5 years",
    interestRate: "5.2%",
    riskLevel: "Medium"
  },
  { 
    id: 2, 
    owner: "0Xabdseghfghjgjkjkjhjhjjjjjhkhdgrtgdr", 
    title: "Municipal Bonds Fund", 
    description: "Tax-exempt municipal bonds from various cities and states, offering stable income with tax advantages.", 
    target: "1500000", 
    deadline: 2555, 
    image: bondImg3, 
    image2: bondImg3, 
    image3: bondImg3, 
    amountCollected: "450000",
    type: "bonds",
    bondType: "Municipal",
    maturityPeriod: "7 years",
    interestRate: "3.8%",
    riskLevel: "Low"
  },
  { 
    id: 3, 
    owner: "0Xabdseghfghjgjkjkjhjhjjjjjhkhdgrtgdr", 
    title: "High-Yield Corporate Bonds", 
    description: "Portfolio of high-yield corporate bonds from established companies, offering higher returns with moderate risk.", 
    target: "3000000", 
    deadline: 1095, 
    image: bondImg4, 
    image2: bondImg4, 
    image3: bondImg4, 
    amountCollected: "900000",
    type: "bonds",
    bondType: "High-Yield Corporate",
    maturityPeriod: "3 years",
    interestRate: "7.5%",
    riskLevel: "High"
  }
];