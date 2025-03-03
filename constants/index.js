import { createCampaign, dashboard, logout, payment, profile, withdraw } from '../public/assets/icons';

export const navlinks = [
  {
    name: 'dashboard',
    imgUrl: dashboard,
    link: '/',
  },
  {
    name: 'campaign',
    imgUrl: createCampaign,
    link: '/create-campaign',
  },
  {
    name: 'payment',
    imgUrl: payment,
    link: '/',
    disabled: true,
  },
  {
    name: 'withdraw',
    imgUrl: withdraw,
    link: '/',
    disabled: true,
  },
  {
    name: 'profile',
    imgUrl: profile,
    link: '/profile',
  },
  {
    name: 'logout',
    imgUrl: logout,
    link: '/',
    disabled: true,
  },
];

const img1 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIqxsJdtp5KfySlJo3zK5itptTZhKnWVB5Fg&s"
const img2 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScGujzqQk2aFY1ppUSOZU3Mkf-KB56Osfu3w&s"
const img3 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj6t-pvGAtJbbHEpmNixp-RA8EPUyhbIi-ow&s"
const img4 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy50_LAqiNiHc49CFMpAz_NlvHKogHvF-ETw&s"


export const campaign = [
  { id: 0, owner: "0Xabdsefghfgjnnnhnnnnnnfghfghgfhfghfg", title: "Campaign 1", description: "This is Campaign 1 and I am just repeating words here.", target: "238", deadline: 2, image: img1, amountCollected: "122" },
  { id: 1, owner: "0Xabdseghfghjgjkjkjhjhjjjjjhkhdgrtgdr", title: "Campaign 2", description: "This is Campaign 2 and I am just repeating words here.", target: "238", deadline: 89, image: img2, amountCollected: "122" },
  { id: 2, owner: "0Xabdseghfghjgjkjkjhjhjjjjjhkhdgrtgdr", title: "Campaign 3", description: "This is Campaign 3 and I am just repeating words here.", target: "238", deadline: 67, image: img3, amountCollected: "122" },
  { id: 3, owner: "0Xabdseghfghjgjkjkjhjhjjjjjhkhdgrtgdr", title: "Campaign 4", description: "This is Campaign 4 and I am just repeating words here.", target: "238", deadline: 32, image: img4, amountCollected: "122" }
];