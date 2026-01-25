---
title: 'Startale App Research Memo (1) - Basic Features Overview'
date: 2026-01-25 17:24:31
permalink: /posts/2026/01/Startale-App-Research-memo-1_en/
tags:
  - Writing
  - Technical experiments
header:
  image: https://github.com/user-attachments/assets/2953d55d-71e2-48b4-8d0b-476301f9ae6c
---

<img width="1282" height="688" alt="image" src="https://github.com/user-attachments/assets/2953d55d-71e2-48b4-8d0b-476301f9ae6c" />

{% include toc %}

## About Startale App

Startale App is an application that seems to accumulate the know-how of Startale, which has experienced the dawn of web3.
I believe its purpose is to serve as a Gateway application for web2 users to onboard to web3.
Currently, Startale App is in beta testing, and only invited users can participate as beta testers.
I plan to use this Startale App as the foundation of my web3 life. （ ´ー｀）y―┛~~

If you're interested, why not become a Startale App beta tester yourself!
You can join as a Startale App beta tester from the Startale pages below ヽ(´ー`)ノ
 * <https://startale.com/en/app>
 * <https://startale.com/jp/app>

## Feature Overview

### HOME Screen

<img width="1693" height="929" alt="image" src="https://github.com/user-attachments/assets/5668e340-ad6d-4fc9-ae4a-96f8243dcc39" />

The HOME screen displays the amount of STAR Points you hold, the progress of missions currently in progress, and a summary of liquidity provision management.
The HOME screen is very important. This is because, on the interface, you can only navigate to the liquidity provision management screen from the HOME screen lol (I think a liquidity provision menu should be added to the tabs)

### Point History Screen

<img width="536" height="573" alt="image" src="https://github.com/user-attachments/assets/87535456-6366-4770-a403-e0ea847aa91c" />

The Point History screen allows you to view the history of how the STAR Points you hold were acquired.

### Liquidity Provision Screen

<img width="382" height="753" alt="image" src="https://github.com/user-attachments/assets/6e70ea4d-b086-4aae-8fb3-1a396c12e777" />

If you plan to efficiently collect Star Points in Startale App, understanding this feature is most important.

 * You can earn 1 Star Point per day from liquidity provision only if you provide 100 USDSC or more. If you provide 200 USDSC or more, you can earn 2 Star Points per day.
 * To obtain Star Points, you need to wait 30 days after providing liquidity.
 * Providing liquidity for a longer period allows you to earn Star Points more efficiently. The multiplier increases every 30 days, reaching a maximum cap of 2.0 after 180 days.

<img width="745" height="383" alt="image" src="https://github.com/user-attachments/assets/0ba16701-dfb0-4855-a588-f043c0d5c034" />

### Liquidity Provision Position Screen

<img width="396" height="382" alt="image" src="https://github.com/user-attachments/assets/40cf5657-f0ac-4658-850f-172c5169f7f4" />

Withdrawals follow the Last In First Out (LIFO) method, protecting older positions. It's a thoughtful design, isn't it!

### Earn (Vault) Screen

<img width="370" height="339" alt="image" src="https://github.com/user-attachments/assets/77fa3ec1-1972-4a15-99f3-c705d41c3bc3" />

The current APY for Startale USDC's Vault feature is 9.42%.
With Earn Vault, you can deposit Startale USD and earn rewards backed by short-term US Treasury bonds. When the displayed APY is higher than standard market rates, it reflects that some users have chosen to earn STAR points instead of claiming profits from the Vault. The APY is designed to maintain competitiveness while ensuring the reward system is sustainable for all users.
You can withdraw at any time, so I use it as a convenient Startale USDC storage place. ヽ(´ー`)ノ

 * <https://usd.startale.com/faq#how-does-earn-vault-work>

### Swap Screen

<img width="440" height="487" alt="image" src="https://github.com/user-attachments/assets/cb6e27f7-eeb1-4b56-ba00-8f3908bdcd17" />

The Swap feature allows you to swap tokens you hold for other tokens. When purchasing Startale USDC, this feature seems to be the mainstream method currently.
I suspect the backend uses Uniswap, so there's a rumor that Uniswap might actually be cheaper for swap costs. ((*´∀`))ｹﾗｹﾗ

### Activity Screen

<img width="451" height="826" alt="image" src="https://github.com/user-attachments/assets/c64cfdbe-a94e-4fa0-bb8c-e006b3d3e384" />

This is my favorite feature. It displays an Activity log of events that occurred in the wallet. You can change the display to your preferred country's currency unit, which is very helpful. ヽ(´ー`)ノ

## Wallet Screen

<img width="1147" height="441" alt="image" src="https://github.com/user-attachments/assets/d13a882e-1975-4358-b5ee-f93328dcf453" />

You can see at a glance the holdings and price movements of major tokens in your wallet.

## Token/NFT Send Screen

<img width="459" height="367" alt="image" src="https://github.com/user-attachments/assets/53410889-898f-47b4-a603-8c9ad230a7ad" />

You can send tokens and NFTs you hold to other wallets. I'm glad that Startale App has implemented this basic feature.

## Receive Screen

<img width="492" height="357" alt="image" src="https://github.com/user-attachments/assets/da71db8e-8525-47d7-b4e8-5b89aac1c692" />

I wonder if it allows you to receive tokens via QR code? I haven't used it yet, so I'm not sure.
The auto-bridge from OP Network also seems like an interesting feature, but I don't know how to disable it once it's enabled.
I haven't found it necessary yet, so I haven't really touched it. （ ´ー｀）y―┛~~

 * <https://startale.com/ja/app/faq#getting-started-7>

## Referral Screen

<img width="370" height="514" alt="image" src="https://github.com/user-attachments/assets/f10be9c6-e6da-4cc2-b851-44dc1d6988bc" />

Startale App allows you to share referral codes and earn 10% of the Star Points earned by the people you referred.
Referral codes may be added in the future, but the initial design is 3 per person, so if you give them to people who seem likely to earn Star Points, you can also earn Star Points yourself, which is great. ヽ(´ー`)ノ

## Summary

It's clear that Startale App has successfully developed the main features necessary for web3 activities as dapps on Soneium.
Also, although not explained this time, it includes features such as account abstraction to onboard Web2 users to Soneium, so it's expected to become the main application that Startale will deploy on Soneium in the future.


## X Threads

### Thread 0

Startale App is an application that seems to accumulate the know-how of Startale, which has experienced the dawn of web3. 
If you're interested, why not become a Startale App beta tester yourself! 
You can join as a Startale App beta tester from the Startale pages below ヽ(´ー`)ノ

https://startale.com/en/app
https://startale.com/jp/app

The following threads provide an overview of Startale App's main features by screen. （ ´ー｀）y―┛~~

#Soneium #Startale #StartaleApp

### Thread 1

[HOME Screen]

<img width="1693" height="929" alt="image" src="https://github.com/user-attachments/assets/5668e340-ad6d-4fc9-ae4a-96f8243dcc39" />

The HOME screen displays the amount of STAR Points you hold, the progress of missions currently in progress, and a summary of liquidity provision management.
The HOME screen is very important. This is because, on the interface, you can only navigate to the liquidity provision management screen from the HOME screen lol (I think a liquidity provision menu should be added to the tabs)

### Thread 2

[Liquidity Provision Screen]

<img width="382" height="753" alt="image" src="https://github.com/user-attachments/assets/6e70ea4d-b086-4aae-8fb3-1a396c12e777" />
<img width="745" height="383" alt="image" src="https://github.com/user-attachments/assets/0ba16701-dfb0-4855-a588-f043c0d5c034" />

If you plan to efficiently collect Star Points in Startale App, understanding this feature is most important.

 * You can earn 1 Star Point per day from liquidity provision only if you provide 100 USDSC or more. If you provide 200 USDSC or more, you can earn 2 Star Points per day.
 * To obtain Star Points, you need to wait 30 days after providing liquidity.
 * Providing liquidity for a longer period allows you to earn Star Points more efficiently. The multiplier increases every 30 days, reaching a maximum cap of 2.0 after 180 days.

### Thread 3

[Liquidity Provision Position Screen]

<img width="396" height="382" alt="image" src="https://github.com/user-attachments/assets/40cf5657-f0ac-4658-850f-172c5169f7f4" />

Withdrawals follow the Last In First Out (LIFO) method, protecting older positions. It's a thoughtful design, isn't it!

### Thread 4

[Earn (Vault) Screen]

<img width="370" height="339" alt="image" src="https://github.com/user-attachments/assets/77fa3ec1-1972-4a15-99f3-c705d41c3bc3" />

The current APY for Startale USDC's Vault feature is 9.42%.
Earn Vault allows you to deposit Startale USD and earn rewards backed by short-term US Treasury bonds. When the displayed APY is higher than standard market rates, it reflects that some users have chosen to earn STAR points instead of claiming profits from the Vault. The APY is designed to maintain competitiveness while ensuring the reward system is sustainable for all users.
You can withdraw at any time, so I use it as a convenient Startale USDC storage place. ヽ(´ー`)ノ

 * <https://usd.startale.com/faq#how-does-earn-vault-work>

### Thread 5

[Swap Screen]

<img width="440" height="487" alt="image" src="https://github.com/user-attachments/assets/cb6e27f7-eeb1-4b56-ba00-8f3908bdcd17" />

The Swap feature allows you to swap tokens you hold for other tokens. When purchasing Startale USDC, this feature seems to be the mainstream method currently.
I suspect the backend uses Uniswap, so there's a rumor that Uniswap might actually be cheaper for swap costs. ((*´∀`))ｹﾗｹﾗ

### Thread 6

[Token/NFT Send Screen]

<img width="459" height="367" alt="image" src="https://github.com/user-attachments/assets/53410889-898f-47b4-a603-8c9ad230a7ad" />

You can send tokens and NFTs you hold to other wallets. I'm glad that Startale App has implemented this basic feature.

### Thread 7

[Referral Screen]

<img width="370" height="514" alt="image" src="https://github.com/user-attachments/assets/f10be9c6-e6da-4cc2-b851-44dc1d6988bc" />

Startale App allows you to share referral codes and earn 10% of the Star Points earned by the people you referred.
Referral codes may be added in the future, but the initial design is 3 per person, so if you give them to people who seem likely to earn Star Points, you can also earn Star Points yourself, which is great. ヽ(´ー`)ノ

### Thread 8

[Summary]

It's clear that Startale App has successfully developed the main features necessary for web3 activities as dapps on Soneium.
Also, although not explained this time, it includes features such as account abstraction to onboard Web2 users to Soneium, so it's expected to become the main application that Startale will deploy on Soneium in the future.

For more details, please check out my blog post below. ヽ(´ー`)ノ
https://www.stardust.box/posts/2026/01/Startale-App-Research-memo-1_en/

## Startale Portfolio

### Title

 * Startale App Research Memo (1) - Basic Features Overview

### Tags

 * Writing

### What is this?

 * Personal notes from my research on Startale App.

### Why is it important?

 * Contributes to raising awareness of Startale App and spreading knowledge about Startale App to the world

### Blog Posts

 * English: https://www.stardust.box/posts/2026/01/Startale-App-Research-memo-1_en/
 * Japanese: https://www.stardust.box/posts/2026/01/Startale-App-Research-memo-1_ja/

### X Threads

 * English: https://x.com/stardustdotbox
 * Japanese: https://x.com/stardustdotbox/status/2015345043192848843

### Blog Update Command

```
┌──(stardust✨stardust)-[~/stardustdotbox.github.io]
└─$ git add -A && git commit -m 'Startale App Research Memo (1) - Basic Features Overview' && git push
```

## References

 * <https://www.stardust.box/posts/2026/01/Startale-Portofolio/>
 * <https://www.stardust.box/posts/2026/01/Lootcoin-Hero-Story-2/>
 * <https://app.startale.com/>
 * <https://startale.com/en/app>
 * <https://startale.com/ja/app>
 * <https://startale.com/ja/app/faq>
 * <https://github.com/orgs/StartaleGroup/repositories>
 * <https://github.com/StartaleGroup/stablecoin-vault-contracts>
 * <https://usd.startale.com/>
 * <https://usd.startale.com/faq#star-points>
 * <https://usd.startale.com/news/usdsc-faq>

