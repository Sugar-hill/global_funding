import "@stdlib/deploy";
import "@stdlib/nft";

struct NFTMetadata {
    campaignId: Int,
    campaignName: String,
    donationAmount: Int,
    donationTime: Int,
    campaignImage: String
}

contract DonationNFT with Deployable, NftStandard {
    
    persistent nfts: Map<Int, NFT> = emptyMap();
    persistent nextTokenId: Int = 0;
    
    struct NFT {
        owner: Address,
        metadata: NFTMetadata,
        tokenId: Int
    }

    // Mint NFT called by DonationCampaign contract
    receive("mint_nft", owner: Address, metadata: NFTMetadata) {
        let tokenId = self.nextTokenId;
        
        let newNFT = NFT{
            owner: owner,
            metadata: metadata,
            tokenId: tokenId
        };
        
        self.nfts.set(tokenId, newNFT);
        self.nextTokenId += 1;
        
        // Emit transfer event
        self.emitTransfer(nullAddress(), owner, tokenId);
    }

    // NFT Standard implementations
    get fun getNftData(tokenId: Int): NftData {
        let nft = self.nfts.get(tokenId).unwrap();
        return NftData{
            owner: nft.owner,
            manager: nft.owner,
            collection: self.address,
            content: beginCell().storeString(JSON.stringify(nft.metadata)).endCell()
        };
    }

    get fun getMetadata(tokenId: Int): NFTMetadata {
        return self.nfts.get(tokenId).unwrap().metadata;
    }

    // Transfer implementation
    override receive("transfer", to: Address, tokenId: Int) {
        let nft = self.nfts.get(tokenId).unwrap();
        require(nft.owner == sender(), "Not owner");
        
        nft.owner = to;
        self.nfts.set(tokenId, nft);
        
        self.emitTransfer(sender(), to, tokenId);
    }
}