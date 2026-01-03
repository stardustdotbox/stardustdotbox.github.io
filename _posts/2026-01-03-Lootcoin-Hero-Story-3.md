---
title: 'Lootcoinの勇者物語(3)'
date: 2026-01-03 21:45:27
permalink: /posts/2026/01/Lootcoin-Hero-Story-3/
tags:
  - Lootcoin
  - Soneium
header:
  image: https://github.com/user-attachments/assets/862aaff2-4db2-4015-b431-18ce3718fb41
---

<img width="1500" height="500" alt="image" src="https://github.com/user-attachments/assets/862aaff2-4db2-4015-b431-18ce3718fb41" />

{% include toc %}

もはや、Lootcoinの勇者物語というか、ぼくがLootcoin dAppsについて知りたいことを勝手に調査してるだけのブログになりつつある気がしますが、いいのです。これは必要なことなのです。(確信)
というわけでこれからはLootcoin調査用レポジトリを作成して勇者物語を進めていきます。

## Lootcoinレポジトリの作成

```
┌──(stardust✨stardust)-[~]
└─$ git clone git@github.com:stardustdotbox/Lootcoin.git
```

## .envファイルを作成する

```
RPC_URL=https://rpc.soneium.org
PRIVATE_KEY=0xあなたの秘密鍵
```

## .envファイルを読み込む

```
┌──(stardust✨stardust)-[~/Lootcoin]
└─$ export $(cat .env | xargs)
```

## LOOTCOINのCLAIMトランザクションを再現する

<img width="445" height="116" alt="image" src="https://github.com/user-attachments/assets/f3b48482-2688-4d82-863d-1b3ff3deccbb" />

 * https://soneium.blockscout.com/tx/0xa4d8aec04682dc4913b91e09e11c99994a9b6d613064d0af9b8af3a21f59bb91

## 調査対象トランザクションを環境変数に設定する

```
┌──(stardust✨stardust)-[~/Lootcoin]
└─$ export TX_HASH=0xa4d8aec04682dc4913b91e09e11c99994a9b6d613064d0af9b8af3a21f59bb91
```

## トランザクションを再実行してトレースを取得

```
┌──(stardust✨stardust)-[~/Lootcoin]
└─$ cast run $TX_HASH --rpc-url $RPC_URL --trace-printer
(snip)
Traces:
  [91099] 0x21Be1D69A77eA5882aCcD5c5319Feb7AC3854751::claimRewards()
    ├─ [17244] 0x9317841C2e9F6BCb44119C184152cfb1EF79034a::mint(0x53869B88306EB505f0fC66DaE482D42033F85253, 512415477321905475675 [5.124e20])
    │   ├─ emit Transfer(param0: 0x0000000000000000000000000000000000000000, param1: 0x53869B88306EB505f0fC66DaE482D42033F85253, param2: 512415477321905475675 [5.124e20])
    │   └─ ← [Stop]
    ├─ [8444] 0x9317841C2e9F6BCb44119C184152cfb1EF79034a::mint(0xB755B1E6418D34D5533267aF10322d9B79B93dd3, 26969235648521340825 [2.696e19])
    │   ├─ emit Transfer(param0: 0x0000000000000000000000000000000000000000, param1: 0xB755B1E6418D34D5533267aF10322d9B79B93dd3, param2: 26969235648521340825 [2.696e19])
    │   └─ ← [Stop]
    ├─ emit RewardsClaimed(param0: 0x53869B88306EB505f0fC66DaE482D42033F85253, param1: 539384712970426816500 [5.393e20])
    └─ ← [Stop]
Transaction successfully executed.
Gas used: 92251
```

## トランザクションの詳細を取得

```
┌──(stardust✨stardust)-[~/Lootcoin]
└─$ cast tx $TX_HASH --rpc-url $RPC_URL --json | jq '{from, to, input}'
{
  "from": "0x53869b88306eb505f0fc66dae482d42033f85253",
  "to": "0x21be1d69a77ea5882accd5c5319feb7ac3854751",
  "input": "0x372500ab"
}
```

## 呼び出された関数を特定

```
┌──(stardust✨stardust)-[~/Lootcoin]
└─$ INPUT_DATA=$(cast tx $TX_HASH --rpc-url $RPC_URL --json | jq -r '.input')

┌──(stardust✨stardust)-[~/Lootcoin]
└─$ FUNCTION_SELECTOR=$(echo $INPUT_DATA | head -c 10)

┌──(stardust✨stardust)-[~/Lootcoin]
└─$ cast 4byte $FUNCTION_SELECTOR
claimRewards()
```

## 同じ関数を同じパラメータで呼び出す

```
┌──(stardust✨stardust)-[~/Lootcoin]
└─$ cast send 0x21Be1D69A77eA5882aCcD5c5319Feb7AC3854751 \
  "claimRewards()" \
  --rpc-url $RPC_URL \
  --private-key $PRIVATE_KEY

blockHash            0x3e78fa307d8c61274bb76f65de5dbf74419f8d537034a11672c37ebec68da88c
blockNumber          17157043
contractAddress      
cumulativeGasUsed    2259561
effectiveGasPrice    73936
from                 0x53869B88306EB505f0fC66DaE482D42033F85253
gasUsed              92251
logs                 [{"address":"0x9317841c2e9f6bcb44119c184152cfb1ef79034a","topics":["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef","0x0000000000000000000000000000000000000000000000000000000000000000","0x00000000000000000000000053869b88306eb505f0fc66dae482d42033f85253"],"data":"0x0000000000000000000000000000000000000000000000096ea417387f4baff5","blockHash":"0x3e78fa307d8c61274bb76f65de5dbf74419f8d537034a11672c37ebec68da88c","blockNumber":"0x105cbb3","blockTimestamp":"0x69592105","transactionHash":"0xf4feea46c19941952f86cf1eb86d6c58c2ca44625c7cc8f9a29ce08dfc15ee64","transactionIndex":"0xe","logIndex":"0x1f","removed":false},{"address":"0x9317841c2e9f6bcb44119c184152cfb1ef79034a","topics":["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef","0x0000000000000000000000000000000000000000000000000000000000000000","0x000000000000000000000000b755b1e6418d34d5533267af10322d9b79b93dd3"],"data":"0x0000000000000000000000000000000000000000000000007f161c2b6503fbc9","blockHash":"0x3e78fa307d8c61274bb76f65de5dbf74419f8d537034a11672c37ebec68da88c","blockNumber":"0x105cbb3","blockTimestamp":"0x69592105","transactionHash":"0xf4feea46c19941952f86cf1eb86d6c58c2ca44625c7cc8f9a29ce08dfc15ee64","transactionIndex":"0xe","logIndex":"0x20","removed":false},{"address":"0x21be1d69a77ea5882accd5c5319feb7ac3854751","topics":["0xfc30cddea38e2bf4d6ea7d3f9ed3b6ad7f176419f4963bd81318067a4aee73fe","0x00000000000000000000000053869b88306eb505f0fc66dae482d42033f85253"],"data":"0x000000000000000000000000000000000000000000000009edba3363e44fabbe","blockHash":"0x3e78fa307d8c61274bb76f65de5dbf74419f8d537034a11672c37ebec68da88c","blockNumber":"0x105cbb3","blockTimestamp":"0x69592105","transactionHash":"0xf4feea46c19941952f86cf1eb86d6c58c2ca44625c7cc8f9a29ce08dfc15ee64","transactionIndex":"0xe","logIndex":"0x21","removed":false}]
logsBloom            0x00000000000000000000000000000000008000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000001000000000000000000000000000010000000020000000000000000000800000020000000000000000010000004000000000000000040000000000000000000000080000000000000000000000000000000000000000002000000008000000000000000000000000200000000008000000002000000000000000000000000000000000000000000000000400020800000000000000000080000000000000000000000000000000000000000000000
root                 
status               1 (success)
transactionHash      0xf4feea46c19941952f86cf1eb86d6c58c2ca44625c7cc8f9a29ce08dfc15ee64
transactionIndex     14
type                 2
blobGasPrice         
blobGasUsed          40000
to                   0x21Be1D69A77eA5882aCcD5c5319Feb7AC3854751
daFootprintGasScalar 400
l1BaseFeeScalar      9736
l1BlobBaseFee        3146636
l1BlobBaseFeeScalar  1540079
l1Fee                1197660242
l1GasPrice           45774281
l1GasUsed            1600
```

# 0x21Be1D69A77eA5882aCcD5c5319Feb7AC3854751が保有するメソッド一覧を表示する

```
┌──(stardust✨stardust)-[~/Lootcoin]
└─$ curl -s "https://soneium.blockscout.com/api?module=contract&action=getabi&address=0x21Be1D69A77eA5882aCcD5c5319Feb7AC3854751" | \
  jq -r '.result' | \
  jq -r '.[] | select(.type == "function") | .name + "(" + (.inputs | map(.type) | join(",")) + ")"'
BASE_CHECK_IN_POINTS()
CHECK_IN_STREAK_MULTIPLIER()
HALVING_INTERVAL()
INITIAL_LOOTCOIN_PER_BLOCK()
LOOT_TYPES()
ONE_DAY()
REWARDS_PRECISION()
STARTER_FACILITY_INDEX()
STARTER_MINER_INDEX()
STREAK_THRESHOLD()
acquiredStarterMiner(address)
addFacility(uint256,uint256,bool,uint256)
addMiner(uint256,uint256,uint256,bool,address)
addSecondaryMarketForMiner(uint256,uint256)
blocksUntilNextHalving()
burnPct()
buyMiner(uint256,uint256,uint8)
buyNewFacility()
changeFacilityCost(uint256,uint256)
changeMinerCost(uint256,uint256)
checkIn(address)
checkinsEnabled()
claimRewards()
consecutiveCheckInDays(address)
cooldown()
cumulativeLootcoinPerHash()
facilities(uint256)
facilityCount()
feeRecipient()
gameplayActive()
getCurrentConsecutiveCheckInDays(address)
getFreeStarterMiner(uint256,uint8)
getLootcoinPerBlock()
getPlayerMinersPaginated(address,uint256,uint256)
getReferrals(address)
giftInitialFacility(address,address)
hasCheckedInToday(address)
initialFacilityPrice()
initializedStarterFacility(address)
lastCheckInDay(address)
lastFacilityUpgradeTimestamp(address)
lastRewardBlock()
lootcoin()
minerSecondHandMarket(uint256)
miners(uint256)
miningHasStarted()
owner()
ownerToFacility(address)
pausedAtBlock()
pendingRewards(address)
playerHashrate(address)
playerLootcoinDebt(address)
playerLootcoinPerBlock(address)
playerMinersId(uint256)
playerMinersOwned(address)
playerOccupiedCoords(address,uint256,uint8)
playerPendingRewards(address)
playerPoints(address)
purchaseInitialFacility(address)
randomNumberCallback(uint256,uint256)
referralBonusPaid(address)
referralFee()
referrals(address)
referredUsers(address,uint256)
renounceOwnership()
sellMiner(uint256)
setBurnPct(uint256)
setCheckinsEnabled(bool)
setCooldown(uint256)
setFeeRecipient(address)
setGameplayActive(bool)
setInitialFacilityPrice(uint256)
setLootcoin(address)
setReferralFee(uint256)
setVRFAddress(address)
startBlock()
timeUntilNextFacilityUpgrade(address)
toggleFacilityProduction(uint256,bool)
toggleMinerProduction(uint256,bool)
totalHashrate()
transferOwnership(address)
uniqueMinerCount()
vrfAddress()
vrfSystem()
withdraw()
withdrawErc20(address,uint256)
withdrawLootcoin(uint256)
```

## Lootcoinメソッドの実行

```
┌──(stardust✨stardust)-[~/Lootcoin]
└─$ cast call 0x21Be1D69A77eA5882aCcD5c5319Feb7AC3854751 "lootcoin()" --rpc-url $RPC_URL
0x0000000000000000000000009317841c2e9f6bcb44119c184152cfb1ef79034a
```

## Owner()

```
┌──(stardust✨stardust)-[~/Lootcoin]
└─$ cast call 0x21Be1D69A77eA5882aCcD5c5319Feb7AC3854751 "owner()"  --rpc-url $RPC_URL
0x000000000000000000000000d33367e2aef56d700c1918c8a79fba54c0c9aa57
```

## pendingRewards(address)

<img width="301" height="33" alt="image" src="https://github.com/user-attachments/assets/146756b3-ba79-49a4-8c8a-0ce70da5bf6d" />

```
┌──(stardust✨stardust)-[~/Lootcoin]
└─$ cast call 0x21Be1D69A77eA5882aCcD5c5319Feb7AC3854751 "pendingRewards(address)" 0x53869B88306EB505f0fC66DaE482D42033F85253 --rpc-url $RPC_URL
0x000000000000000000000000000000000000000000000000747cad7a4490322a
┌──(stardust✨stardust)-[~/Lootcoin]
└─$ cast --to-dec 0x747cad7a4490322a
8393774546159677994
```

## playerHashrate(address)

<img width="146" height="65" alt="image" src="https://github.com/user-attachments/assets/fbf08e1b-f724-483c-8727-94d64c67e916" />

```
┌──(stardust✨stardust)-[~/Lootcoin]
└─$ cast call 0x21Be1D69A77eA5882aCcD5c5319Feb7AC3854751 "playerHashrate(address)" 0x53869B88306EB505f0fC66DaE482D42033F85253 --rpc-url $RPC_URL
0x0000000000000000000000000000000000000000000000000000000000000730
┌──(stardust✨stardust)-[~/Lootcoin]
└─$ cast --to-dec 0x730
1840
```

## playerPoints(address)

<img width="229" height="63" alt="image" src="https://github.com/user-attachments/assets/fb198f21-20af-43b3-ac0f-335bfced20f0" />

```
┌──(stardust✨stardust)-[~/Lootcoin]
└─$ cast call 0x21Be1D69A77eA5882aCcD5c5319Feb7AC3854751 "playerPoints(address)" 0x53869B88306EB505f0fC66DaE482D42033F85253 --rpc-url $RPC_URL
0x00000000000000000000000000000000000000000000000000000000000004b0
┌──(stardust✨stardust)-[~/Lootcoin]
└─$ cast --to-dec 0x04b0
1200
```

## getReferrals(address)(address[])

```
┌──(stardust✨stardust)-[~/Lootcoin]
└─$ cast call 0x21Be1D69A77eA5882aCcD5c5319Feb7AC3854751 "getReferrals(address)(address[])" 0x53869B88306EB505f0fC66DaE482D42033F85253 --rpc-url $RPC_URL
[0xe8E0af09F80cAf07D962D6BECD7117923f6a8c43, 0xE6cC5e3EBB07B5156ba3aF510B8c6cA19804d88E, 0xF870067e1A2Dd4a1964761c4438874A9b9bF2D5a, 0x485387f0E5a3f27c827Fa873277A7b42270C7565]
```

## BlockScountのREAD/Write conctactで触るのが一番便利

 * https://soneium.blockscout.com/address/0x21Be1D69A77eA5882aCcD5c5319Feb7AC3854751?tab=read_write_contract

<img width="960" height="602" alt="image" src="https://github.com/user-attachments/assets/20ce5342-6fa0-42f0-9c52-e4e0816458fe" />


## 参考文献

 * [Lootcoin](https://lootcoin.tech?ref=0x53869B88306EB505f0fC66DaE482D42033F85253)
 * [Lootcoin BlackPaper.pdf](https://lootcoin.tech/blackpaper.pdf)
 * https://x.com/Lootcointech
 * https://www.coingecko.com/en/coins/lootcoin
 * https://github.com/stardustdotbox/Lootcoin
 * https://www.stardust.box/posts/2026/01/Lootcoin-Hero-Story-1/
 * https://www.stardust.box/posts/2026/01/Lootcoin-Hero-Story-2/
