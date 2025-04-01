// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol"; 
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract TokenizedAssets is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    // USDT token interface for payment distributions
    IERC20 public usdtToken;
    
    enum AssetType { REIT, BOND }
    
    struct Asset {
        address owner;
        string name;
        string description;
        uint256 targetAmount;
        uint256 amountCollected;
        uint256 deadline;
        AssetType assetType;
        
        // REIT specific
        uint256 monthlyRentEstimate;
        string[] images; // Array of image URIs
        
        // Bond specific
        uint256 period; // Maturity period in days
        uint256 valuationPercentage; // Interest rate in basis points (e.g. 500 = 5%)
        string image; // Single image URI
        
        // Contributors data
        address[] contributors;
        mapping(address => uint256) contributions;
        mapping(address => uint256) contributorTokenIds;
        bool isClosed;
    }
    
    // Mapping from asset ID to Asset
    mapping(uint256 => Asset) public assets;
    uint256 private _assetIds;
    
    // Mapping from token ID to asset ID
    mapping(uint256 => uint256) public tokenToAsset;
    
    // Mapping from contributor to their owned assets
    mapping(address => uint256[]) public contributorAssets;
    
    // Events
    event AssetCreated(
        uint256 indexed assetId,
        address indexed owner,
        string name,
        uint256 targetAmount,
        AssetType assetType
    );
    
    event ContributionMade(
        uint256 indexed assetId,
        address indexed contributor,
        uint256 amount,
        uint256 tokenId
    );
    
    event PaymentDistributed(
        uint256 indexed assetId,
        uint256 totalAmount
    );
    
    event AssetClosed(
        uint256 indexed assetId,
        uint256 amountCollected
    );
    
    constructor(address _usdtAddress) ERC721("Tokenized Assets", "TA") Ownable(msg.sender) {
        usdtToken = IERC20(_usdtAddress);
    }
    
    function setUSDTAddress(address _usdtAddress) external onlyOwner {
        usdtToken = IERC20(_usdtAddress);
    }
    
    // Create a new REIT
    function createREIT(
        address _owner,
        string memory _companyName,
        string memory _description,
        uint256 _amount,
        uint256 _monthlyRentEstimate,
        uint256 _deadline,
        string[] memory _images
    ) external returns (uint256) {
        require(_images.length <= 3, "Maximum 3 images allowed");
        require(_deadline > block.timestamp, "Deadline must be in the future");
        
        uint256 assetId = _assetIds++;
        
        Asset storage newAsset = assets[assetId];
        newAsset.owner = _owner;
        newAsset.name = _companyName;
        newAsset.description = _description;
        newAsset.targetAmount = _amount;
        newAsset.monthlyRentEstimate = _monthlyRentEstimate;
        newAsset.deadline = _deadline;
        newAsset.assetType = AssetType.REIT;
        newAsset.images = _images;
        
        emit AssetCreated(assetId, _owner, _companyName, _amount, AssetType.REIT);
        
        return assetId;
    }
    
    // Create a new Bond
    function createBond(
        address _owner,
        string memory _bondName,
        string memory _description,
        uint256 _amount,
        uint256 _period,
        uint256 _valuationPercentage,
        uint256 _deadline,
        string memory _image
    ) external returns (uint256) {
        require(_deadline > block.timestamp, "Deadline must be in the future");
        
        uint256 assetId = _assetIds++;
        
        Asset storage newAsset = assets[assetId];
        newAsset.owner = _owner;
        newAsset.name = _bondName;
        newAsset.description = _description;
        newAsset.targetAmount = _amount;
        newAsset.period = _period;
        newAsset.valuationPercentage = _valuationPercentage;
        newAsset.deadline = _deadline;
        newAsset.assetType = AssetType.BOND;
        newAsset.image = _image;
        
        emit AssetCreated(assetId, _owner, _bondName, _amount, AssetType.BOND);
        
        return assetId;
    }
    
    // Contribute to an asset and mint an NFT
    function contribute(uint256 _assetId, uint256 _amount) external {
        Asset storage asset = assets[_assetId];
        
        require(block.timestamp <= asset.deadline, "Contribution period has ended");
        require(!asset.isClosed, "Asset is closed for contributions");
        require(asset.amountCollected + _amount <= asset.targetAmount, "Contribution exceeds target amount");
        
        // Transfer USDT from contributor to contract
        require(usdtToken.transferFrom(msg.sender, address(this), _amount), "USDT transfer failed");
        
        // Update asset data
        if (asset.contributions[msg.sender] == 0) {
            asset.contributors.push(msg.sender);
        }
        
        asset.contributions[msg.sender] += _amount;
        asset.amountCollected += _amount;
        
        // Mint NFT
        uint256 newTokenId = _tokenIds.current();
        _tokenIds.increment();
        
        _mint(msg.sender, newTokenId);
        
        // Generate token URI with embedded metadata (simplified)
        string memory tokenURI = generateTokenURI(_assetId, msg.sender, _amount);
        _setTokenURI(newTokenId, tokenURI);
        
        // Record token to asset mapping
        tokenToAsset[newTokenId] = _assetId;
        asset.contributorTokenIds[msg.sender] = newTokenId;
        
        // Add asset to contributor's assets
        contributorAssets[msg.sender].push(_assetId);
        
        emit ContributionMade(_assetId, msg.sender, _amount, newTokenId);
        
        // Check if target is reached
        if (asset.amountCollected == asset.targetAmount) {
            asset.isClosed = true;
            emit AssetClosed(_assetId, asset.amountCollected);
        }
    }
    
    // Generate a token URI with metadata (in practice, this would create JSON metadata)
    function generateTokenURI(uint256 _assetId, address _contributor, uint256 _amount) internal view returns (string memory) {
        Asset storage asset = assets[_assetId];
        
        // This is simplified - in a real implementation, you would create proper JSON metadata
        // and possibly store it on IPFS
        string memory assetType = asset.assetType == AssetType.REIT ? "REIT" : "Bond";
        string memory percentage = Strings.toString((_amount * 10000) / asset.targetAmount);
        
        return string(abi.encodePacked(
            "data:application/json;base64,",
            // Base64 encoded JSON would go here in a real implementation
            // This is a placeholder for demonstration purposes
            "metadata_for_asset_",
            Strings.toString(_assetId),
            "_type_",
            assetType,
            "_contributor_",
            Strings.toHexString(uint160(_contributor), 20),
            "_amount_",
            Strings.toString(_amount),
            "_percentage_",
            percentage
        ));
    }
    
    // Close asset for contributions before deadline
    function closeAsset(uint256 _assetId) external {
        Asset storage asset = assets[_assetId];
        require(msg.sender == asset.owner || msg.sender == owner(), "Only asset owner or contract owner can close");
        require(!asset.isClosed, "Asset is already closed");
        
        asset.isClosed = true;
        emit AssetClosed(_assetId, asset.amountCollected);
    }
    
    // Distribute payments to NFT holders
    function distributePayments(uint256 _assetId, uint256 _amount) external {
        Asset storage asset = assets[_assetId];
        require(msg.sender == asset.owner || msg.sender == owner(), "Only asset owner or contract owner can distribute");
        require(asset.isClosed, "Asset must be closed before distributing payments");
        require(usdtToken.transferFrom(msg.sender, address(this), _amount), "USDT transfer failed");
        
        uint256 totalDistributed = 0;
        
        for (uint256 i = 0; i < asset.contributors.length; i++) {
            address contributor = asset.contributors[i];
            uint256 contribution = asset.contributions[contributor];
            
            // Calculate share based on contribution percentage
            uint256 share = (_amount * contribution) / asset.amountCollected;
            
            if (share > 0) {
                require(usdtToken.transfer(contributor, share), "USDT transfer failed");
                totalDistributed += share;
            }
        }
        
        // Return any dust amount to the caller
        if (_amount > totalDistributed) {
            require(usdtToken.transfer(msg.sender, _amount - totalDistributed), "USDT transfer failed");
        }
        
        emit PaymentDistributed(_assetId, _amount);
    }
    
    // Calculate expected return for bond contributor
    function calculateBondReturn(uint256 _assetId, address _contributor) public view returns (uint256) {
        Asset storage asset = assets[_assetId];
        require(asset.assetType == AssetType.BOND, "Asset is not a bond");
        
        uint256 contribution = asset.contributions[_contributor];
        
        // Calculate return based on valuation percentage
        // valuationPercentage is in basis points (e.g., 500 = 5%)
        return (contribution * asset.valuationPercentage) / 10000;
    }
    
    // Get asset details
    function getAssetDetails(uint256 _assetId) external view returns (
        address owner,
        string memory name,
        string memory description,
        uint256 targetAmount,
        uint256 amountCollected,
        uint256 deadline,
        bool isClosed,
        uint8 assetType
    ) {
        Asset storage asset = assets[_assetId];
        
        return (
            asset.owner,
            asset.name,
            asset.description,
            asset.targetAmount,
            asset.amountCollected,
            asset.deadline,
            asset.isClosed,
            uint8(asset.assetType)
        );
    }
    
    // Get REIT specific details
    function getREITDetails(uint256 _assetId) external view returns (
        uint256 monthlyRentEstimate,
        string[] memory images
    ) {
        Asset storage asset = assets[_assetId];
        require(asset.assetType == AssetType.REIT, "Asset is not a REIT");
        
        return (
            asset.monthlyRentEstimate,
            asset.images
        );
    }
    
    // Get Bond specific details
    function getBondDetails(uint256 _assetId) external view returns (
        uint256 period,
        uint256 valuationPercentage,
        string memory image
    ) {
        Asset storage asset = assets[_assetId];
        require(asset.assetType == AssetType.BOND, "Asset is not a bond");
        
        return (
            asset.period,
            asset.valuationPercentage,
            asset.image
        );
    }
    
    // Get contributors for an asset
    function getContributors(uint256 _assetId) external view returns (address[] memory) {
        return assets[_assetId].contributors;
    }
    
    // Get contributions for an asset
    function getContributions(uint256 _assetId) external view returns (address[] memory, uint256[] memory) {
        Asset storage asset = assets[_assetId];
        
        uint256[] memory amounts = new uint256[](asset.contributors.length);
        
        for (uint256 i = 0; i < asset.contributors.length; i++) {
            amounts[i] = asset.contributions[asset.contributors[i]];
        }
        
        return (asset.contributors, amounts);
    }
    
    // Get bond returns for all contributors
    function getBondReturns(uint256 _assetId) external view returns (address[] memory, uint256[] memory) {
        Asset storage asset = assets[_assetId];
        require(asset.assetType == AssetType.BOND, "Asset is not a bond");
        
        uint256[] memory returnValues = new uint256[](asset.contributors.length);
        
        for (uint256 i = 0; i < asset.contributors.length; i++) {
            address contributor = asset.contributors[i];
            returnValues[i] = calculateBondReturn(_assetId, contributor);
        }
        
        return (asset.contributors, returnValues);
    }
    
    // Get assets contributed to by an address
    function getContributorAssets(address _contributor) external view returns (uint256[] memory) {
        return contributorAssets[_contributor];
    }
    
    // Get contribution percentage for a contributor
    function getContributionPercentage(uint256 _assetId, address _contributor) external view returns (uint256) {
        Asset storage asset = assets[_assetId];
        
        if (asset.amountCollected == 0) return 0;
        
        return (asset.contributions[_contributor] * 10000) / asset.amountCollected;
    }
} 