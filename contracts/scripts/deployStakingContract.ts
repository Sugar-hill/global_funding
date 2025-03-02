import { toNano } from '@ton/core';
import { StakingContract } from '../wrappers/StakingContract';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const stakingContract = provider.open(await StakingContract.fromInit(BigInt(Math.floor(Math.random() * 10000))));

    await stakingContract.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(stakingContract.address);

    console.log('ID', await stakingContract.getId());
}
