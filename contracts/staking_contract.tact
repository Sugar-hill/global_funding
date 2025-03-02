import "@stdlib/deploy";
import "@stdlib/nft";

struct Campaign {
    id: Int,
    owner: Address,
    name: String,
    goal: Int,
    raised: Int,
    organization: String,
    story: String,
    image: String,
    startTime: Int,
    endTime: Int,
    active: Bool
}

contract DonationCampaign with Deployable {
    persistent campaigns: Map<Int, Campaign> = emptyMap();
    persistent donators: Map<Int, Map<Address, Int>> = emptyMap();
    persistent campaignCount: Int = 0;
    persistent stakedBalances: Map<Address, Int> = emptyMap();

    // Create new campaign
    receive("create_campaign", name: String, goal: Int, organization: String, story: String, image: String, duration: Int) {
        let newCampaign = Campaign{
            id: self.campaignCount,
            owner: sender(),
            name: name,
            goal: goal,
            raised: 0,
            organization: organization,
            story: story,
            image: image,
            startTime: now(),
            endTime: now() + duration,
            active: true
        };
        
        self.campaigns.set(self.campaignCount, newCampaign);
        self.campaignCount += 1;
    }

    // Donate to campaign
    receive("donate", campaignId: Int) {
        let campaign = self.campaigns.get(campaignId).unwrap();
        let amount = msg.value;
        
        // Update campaign balance
        campaign.raised += amount;
        self.campaigns.set(campaignId, campaign);
        
        // Track donators
        let campaignDonators = self.donators.get(campaignId).orDefault(emptyMap());
        campaignDonators.set(sender(), campaignDonators.get(sender()).orDefault(0) + amount);
        self.donators.set(campaignId, campaignDonators);
        
        // Mint NFT
        self.mintNFT(sender(), campaignId);
    }

    // Stake tgBTC
    receive("stake", amount: Int) {
        self.stakedBalances.set(sender(), self.stakedBalances.get(sender()).orDefault(0) + amount);
    }

    // Unstake tgBTC
    receive("unstake", amount: Int) {
        let current = self.stakedBalances.get(sender()).unwrap();
        require(current >= amount, "Insufficient balance");
        self.stakedBalances.set(sender(), current - amount);
    }

    // NFT Minting
    mintNFT(to: Address, campaignId: Int) {
        let metadata = beginCell()
            .storeString(self.campaigns.get(campaignId).name)
            .storeString(self.campaigns.get(campaignId).image)
            .storeInt(now(), 64)
            .endCell();
        
        send(SendParameters{
            to: DonationNFT.address,
            value: 0.1 TON,
            body: beginCell()
                .storeUint(0x6a1ac0de, 32) // Mint OP
                .storeAddress(to)
                .storeRef(metadata)
                .endCell()
        });
    }

    // Getter functions
    get fun getCampaign(id: Int): Campaign {
        return self.campaigns.get(id).unwrap();
    }

    get fun getDonators(id: Int): Map<Address, Int> {
        return self.donators.get(id).unwrap();
    }

    get fun getAllCampaigns(): List<Campaign> {
        return self.campaigns.values();
    }
}