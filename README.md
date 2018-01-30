Vesting Contract Task

Create Vesting Rights Contract. The vesting contract should allow an admin to claim equal portions of total ERC20 token balance associated with this contract. The ERC20 token address will be supplied via the constructor.

There will be 5 periods:

0-6 months - make 20% of the initial total available for claim (keep remaining 80% locked)
6-12 months - make 20% of the initial total available for claim (keep remaining 60% locked)
12-18 months - make 20% of the initial total available for claim (keep remaining 40% locked)
18-24 months - make 20% of the initial total available for claim (keep remaining 20% locked)
24+ months - make 20% of the initial total available for claim (keep remaining 0% locked)

Once the owner calls claim, he will claim all unclaimed tokens from this and any previous periods.

Additional - research & think

Can we make the contract so smart that even if someone sends to our vesting contract more tokens we still distribute them equally and no amount is locked in the end. Three examples:�I.�1. Initial total amount is 1000 tokens.
2. The first period passes and the owner claims 20% of them. 1000 - 200 = 800 tokens left.
3. Someone outside of the owner sends 40 tokens to the vesting smart contract. 800 + 40 = 840 tokens left.
4. Make it so that when the next period passes the owner can reclaim 210
II.
1. Initial total amount is 1000 tokens
2. The first period passed and the owner does not claim the 20%. 1000 tokens left, 200 unclaimed
3. Someone outside of the owner sends 40 tokens to the vesting contract resulting in 1040 tokens, 200 unclaimed.
4. Make it so that when the next period passes the owner can reclaim the 200 unclaimed from the first period + 210 of the second period
III.
 1. Initial total amount is 1000 tokens
2. Before the first period has passed someone sends 100 more tokens to the smart contract. The new total is 1100
3. Make it so that when the first period passes the owner can claim 20% of 1100 = 220 tokens.
