---
title: 'OpenClawでAIエージェントを作成する'
date: 2026-02-02 17:57
permalink: /posts/2026/01/Create-an-AI-agent-with-OpenClaw/
tags:
  - AI-Agent
  - OpenClaw
  - clawdbot
header:
  image: https://github.com/user-attachments/assets/1887d857-6394-4a4b-8163-3ed0252828cb"
---

<img width="1768" height="363" alt="image" src="https://github.com/user-attachments/assets/1887d857-6394-4a4b-8163-3ed0252828cb" />

{% include toc %}

## AIエージェントとは

AI Agent（AIエージェント）は、次のような性質を持つソフトウェアの総称です。

- **自律的に判断・行動する**  
  単なるチャット返答ではなく、「何をすべきか」を考えて、ツールやAPIを呼んだり、手順を進めたりする。
- **ツール・環境とやりとりする**  
  検索、計算、ファイル操作、ブラウザ操作など、外部のツールや環境を使ってタスクを実行する。
- **目標に向かって複数ステップを進める**  
  ユーザーが「〇〇して」と言ったときに、必要な情報を集め、判断し、複数のアクションを組み合わせて完了させる。

## OpenClawをEC2インスタンス上で実行する

```
admin@clawdbot:~$ lsb_release -a
No LSB modules are available.
Distributor ID: Debian
Description:    Debian GNU/Linux 13 (trixie)
Release:        13
Codename:       trixie
admin@clawdbot:~$ uname -a
Linux clawdbot 6.12.48+deb13-cloud-amd64 #1 SMP PREEMPT_DYNAMIC Debian 6.12.48-1 (2025-09-20) x86_64 GNU/Linux
admin@clawdbot:~$ free -h
               total        used        free      shared  buff/cache   available
Mem:           3.8Gi       313Mi       3.1Gi       484Ki       604Mi       3.5Gi
Swap:             0B          0B          0B
```

### anyenvのインストール

```
admin@clawdbot:~$ git clone https://github.com/anyenv/anyenv ~/.anyenv
admin@clawdbot:~$ echo 'export PATH="$HOME/.anyenv/bin:$PATH"' >> ~/.bashrc
admin@clawdbot:~$ echo 'eval "$(anyenv init -)"' >> ~/.bashrc
admin@clawdbot:~$ source ~/.bashrc
ANYENV_DEFINITION_ROOT(/home/admin/.config/anyenv/anyenv-install) doesn't exist. You can initialize it by:
> anyenv install --init
admin@clawdbot:~$ anyenv install --init
admin@clawdbot:~$ exec $SHELL -l
admin@clawdbot:~$ anyenv -v
anyenv 1.1.5-1-g5c58783
```

### node環境の構築

```
admin@clawdbot:~$ anyenv install nodenv
admin@clawdbot:~$ exec $SHELL -l
admin@clawdbot:~$ nodenv -v
nodenv 1.6.2+55.64ee637
```

### Nodeのビルドに必要なパッケージを事前にインストール

```
admin@clawdbot:~$ sudo apt update && sudo apt install -y \
  build-essential \
  libssl-dev \
  zlib1g-dev \
  libbz2-dev \
  libreadline-dev \
  libsqlite3-dev \
  curl \
  git \
  libncursesw5-dev \
  xz-utils \
  tk-dev \
  libxml2-dev \
  libxmlsec1-dev \
  libffi-dev \
  liblzma-dev
```

### node22.22.0をインストール

```
admin@clawdbot:~$ nodenv install -l | tail
20.20.0
22.22.0
24.13.0
25.4.0
graal+ce-19.2.1
graal+ce_java11-20.0.0
graal+ce_java8-20.0.0
admin@clawdbot:~$ nodenv install 22.22.0
admin@clawdbot:~$ nodenv global 22.22.0
admin@clawdbot:~$ node -v
v22.22.0
```

### npmでopenclawコマンドをインストール

```
admin@clawdbot:~$ npm install -g openclaw@latest
admin@clawdbot:~$ exec $SHELL -l
admin@clawdbot:~$ openclaw -h

🦞 OpenClaw 2026.2.1 (ed4529e) — I'll butter your workflow like a lobster roll: messy, delicious, effective.

Usage: openclaw [options] [command]

Options:
  -V, --version     output the version number
  --dev             Dev profile: isolate state under ~/.openclaw-dev, default gateway port 19001, and shift derived ports (browser/canvas)
  --profile <name>  Use a named profile (isolates OPENCLAW_STATE_DIR/OPENCLAW_CONFIG_PATH under ~/.openclaw-<name>)
  --no-color        Disable ANSI colors
  -h, --help        display help for command

Commands:
  setup             Initialize ~/.openclaw/openclaw.json and the agent workspace
  onboard           Interactive wizard to set up the gateway, workspace, and skills
  configure         Interactive prompt to set up credentials, devices, and agent defaults
  config            Config helpers (get/set/unset). Run without subcommand for the wizard.
  doctor            Health checks + quick fixes for the gateway and channels
  dashboard         Open the Control UI with your current token
  reset             Reset local config/state (keeps the CLI installed)
  uninstall         Uninstall the gateway service + local data (CLI remains)
  message           Send messages and channel actions
  memory            Memory search tools
  agent             Run an agent turn via the Gateway (use --local for embedded)
  agents            Manage isolated agents (workspaces + auth + routing)
  acp               Agent Control Protocol tools
  gateway           Gateway control
  daemon            Gateway service (legacy alias)
  logs              Gateway logs
  system            System events, heartbeat, and presence
  models            Model configuration
  approvals         Exec approvals
  nodes             Node commands
  devices           Device pairing + token management
  node              Node control
  sandbox           Sandbox tools
  tui               Terminal UI
  cron              Cron scheduler
  dns               DNS helpers
  docs              Docs helpers
  hooks             Hooks tooling
  webhooks          Webhook helpers
  pairing           Pairing helpers
  plugins           Plugin management
  channels          Channel management
  directory         Directory commands
  security          Security helpers
  skills            Skills management
  update            CLI update helpers
  completion        Generate shell completion script
  status            Show channel health and recent session recipients
  health            Fetch health from the running gateway
  sessions          List stored conversation sessions
  browser           Manage OpenClaw's dedicated browser (Chrome/Chromium)
  help              display help for command

Examples:
  openclaw channels login --verbose
    Link personal WhatsApp Web and show QR + connection logs.
  openclaw message send --target +15555550123 --message "Hi" --json
    Send via your web session and print JSON result.
  openclaw gateway --port 18789
    Run the WebSocket Gateway locally.
  openclaw --dev gateway
    Run a dev Gateway (isolated state/config) on ws://127.0.0.1:19001.
  openclaw gateway --force
    Kill anything bound to the default gateway port, then start it.
  openclaw gateway ...
    Gateway control via WebSocket.
  openclaw agent --to +15555550123 --message "Run summary" --deliver
    Talk directly to the agent using the Gateway; optionally send the WhatsApp reply.
  openclaw message send --channel telegram --target @mychat --message "Hi"
    Send via your Telegram bot.

Docs: docs.openclaw.ai/cli
```

## OpenClawの初期セットアップ

```
admin@clawdbot:~$ openclaw setup

🦞 OpenClaw 2026.2.1 (ed4529e) — Ship fast, log faster.

Wrote ~/.openclaw/openclaw.json
Workspace OK: ~/.openclaw/workspace
Sessions OK: ~/.openclaw/agents/main/sessions
admin@clawdbot:~$ openclaw onboard

🦞 OpenClaw 2026.2.1 (ed4529e) — I can run local, remote, or purely on vibes—results may vary with DNS.

▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
██░▄▄▄░██░▄▄░██░▄▄▄██░▀██░██░▄▄▀██░████░▄▄▀██░███░██
██░███░██░▀▀░██░▄▄▄██░█░█░██░█████░████░▀▀░██░█░█░██
██░▀▀▀░██░█████░▀▀▀██░██▄░██░▀▀▄██░▀▀░█░██░██▄▀▄▀▄██
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
                  🦞 OPENCLAW 🦞

┌  OpenClaw onboarding
│
◇  Security ──────────────────────────────────────────────────────────────────────────────╮
│                                                                                         │
│  Security warning — please read.                                                        │
│                                                                                         │
│  OpenClaw is a hobby project and still in beta. Expect sharp edges.                     │
│  This bot can read files and run actions if tools are enabled.                          │
│  A bad prompt can trick it into doing unsafe things.                                    │
│                                                                                         │
│  If you’re not comfortable with basic security and access control, don’t run OpenClaw.  │
│  Ask someone experienced to help before enabling tools or exposing it to the internet.  │
│                                                                                         │
│  Recommended baseline:                                                                  │
│  - Pairing/allowlists + mention gating.                                                 │
│  - Sandbox + least-privilege tools.                                                     │
│  - Keep secrets out of the agent’s reachable filesystem.                                │
│  - Use the strongest available model for any bot with tools or untrusted inboxes.       │
│                                                                                         │
│  Run regularly:                                                                         │
│  openclaw security audit --deep                                                         │
│  openclaw security audit --fix                                                          │
│                                                                                         │
│  Must read: https://docs.openclaw.ai/gateway/security                                   │
│                                                                                         │
├─────────────────────────────────────────────────────────────────────────────────────────╯
```

### Claude ConsoleからAPIキーを入手する

 * https://platform.claude.com/settings/keys

<img width="595" height="109" alt="image" src="https://github.com/user-attachments/assets/b9f56ebc-b0ce-4b7d-bb8d-e4cffa417b9d" />

とりあえず、5ドル分のTokenを使えるようにしてみたよ。

<img width="1589" height="840" alt="image" src="https://github.com/user-attachments/assets/a7c35ea5-17dc-4e16-b0e7-e0c1b4245153" />

## discordのBOT設定を行う

 * https://discord.com/developers/applications

### General Infomation

<img width="1680" height="519" alt="image" src="https://github.com/user-attachments/assets/cc980db6-ab06-4cd8-82d3-a86a4821c938" />

### OAuth2

discord botに最小限の権限を持たせるように設定する。

<img width="1683" height="766" alt="image" src="https://github.com/user-attachments/assets/c3c5aa97-0043-43d9-83ef-40b4942fb8ac" />

<img width="1679" height="856" alt="image" src="https://github.com/user-attachments/assets/f31aa369-cf2d-482f-a138-0846e673c980" />

### BOT画面

ここからdiscord BOTのtokenを取得します。

<img width="1670" height="721" alt="image" src="https://github.com/user-attachments/assets/26a6a06a-9078-4680-a039-f7e417592b17" />

### 設定の検証

```
admin@clawdbot:~$ openclaw  doctor

🦞 OpenClaw 2026.2.1 (ed4529e) — Claws out, commit in—let's ship something mildly responsible.

▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
██░▄▄▄░██░▄▄░██░▄▄▄██░▀██░██░▄▄▀██░████░▄▄▀██░███░██
██░███░██░▀▀░██░▄▄▄██░█░█░██░█████░████░▀▀░██░█░█░██
██░▀▀▀░██░█████░▀▀▀██░██▄░██░▀▀▄██░▀▀░█░██░██▄▀▄▀▄██
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
                  🦞 OPENCLAW 🦞

┌  OpenClaw doctor
│
◇  Update ──────────────────────────────────────────────────────────────────────────────────╮
│                                                                                           │
│  This install is not a git checkout.                                                      │
│  Run `openclaw update` to update via your package manager (npm/pnpm), then rerun doctor.  │
│                                                                                           │
├───────────────────────────────────────────────────────────────────────────────────────────╯
│
◇  Create OAuth dir at ~/.openclaw/credentials?
│  Yes
│
◇  State integrity ──────────────────────────────────────────╮
│                                                            │
│  - CRITICAL: OAuth dir missing (~/.openclaw/credentials).  │
│                                                            │
├────────────────────────────────────────────────────────────╯
│
◇  Doctor changes ───────────────────────────────╮
│                                                │
│  - Created OAuth dir: ~/.openclaw/credentials  │
│                                                │
├────────────────────────────────────────────────╯
│
◇  Security ────────────────────────────────────────────────────────────────────────────────╮
│                                                                                           │
│  - Discord DMs: locked (channels.discord.dm.policy="pairing") with no allowlist; unknown  │
│    senders will be blocked / get a pairing code.                                          │
│    Approve via: openclaw pairing list discord / openclaw pairing approve discord <code>   │
│  - Run: openclaw security audit --deep                                                    │
│                                                                                           │
├───────────────────────────────────────────────────────────────────────────────────────────╯
│
◇  Skills status ────────────╮
│                            │
│  Eligible: 3               │
│  Missing requirements: 46  │
│  Blocked by allowlist: 0   │
│                            │
├────────────────────────────╯
│
◇  Plugins ──────╮
│                │
│  Loaded: 2     │
│  Disabled: 28  │
│  Errors: 0     │
│                │
├────────────────╯
│
◇
Discord: ok (@clawdbot) (1114ms)
Agents: main (default)
Heartbeat interval: 30m (main)
Session store (main): /home/admin/.openclaw/agents/main/sessions/sessions.json (1 entries)
- agent:main:main (11m ago)
Run "openclaw doctor --fix" to apply changes.
│
└  Doctor complete.
```

### OpenClawサービスの状態

```
admin@clawdbot:~$ openclaw status

🦞 OpenClaw 2026.2.1 (ed4529e) — I'll do the boring stuff while you dramatically stare at the logs like it's cinema.

│
◇
│
◇
OpenClaw status

Overview
┌─────────────────┬────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Item            │ Value                                                                                                                                      │
├─────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Dashboard       │ http://127.0.0.1:18789/                                                                                                                    │
│ OS              │ linux 6.12.48+deb13-cloud-amd64 (x64) · node 22.22.0                                                                                       │
│ Tailscale       │ off                                                                                                                                        │
│ Channel         │ stable (default)                                                                                                                           │
│ Update          │ pnpm · npm latest 2026.2.1                                                                                                                 │
│ Gateway         │ local · ws://127.0.0.1:18789 (local loopback) · reachable 30ms · auth token · clawdbot (172.31.47.185) app unknown linux 6.12.48+deb13-    │
│                 │ cloud-amd64                                                                                                                                │
│ Gateway service │ systemd installed · enabled · running (pid 4428, state active)                                                                             │
│ Node service    │ systemd not installed                                                                                                                      │
│ Agents          │ 1 · 1 bootstrapping · sessions 1 · default main active 13m ago                                                                             │
│ Memory          │ enabled (plugin memory-core) · unavailable                                                                                                 │
│ Probes          │ skipped (use --deep)                                                                                                                       │
│ Events          │ none                                                                                                                                       │
│ Heartbeat       │ 30m (main)                                                                                                                                 │
│ Sessions        │ 1 active · default claude-opus-4-5 (200k ctx) · ~/.openclaw/agents/main/sessions/sessions.json                                             │
└─────────────────┴────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘

Security audit
Summary: 1 critical · 1 warn · 1 info
  CRITICAL Credentials dir is writable by others
    /home/admin/.openclaw/credentials mode=775; another user could drop/modify credential files.
    Fix: chmod 700 /home/admin/.openclaw/credentials
  WARN Reverse proxy headers are not trusted
    gateway.bind is loopback and gateway.trustedProxies is empty. If you expose the Control UI through a reverse proxy, configure trusted proxies so local-client c…
    Fix: Set gateway.trustedProxies to your proxy IPs or keep the Control UI local-only.
Full report: openclaw security audit
Deep probe: openclaw security audit --deep

Channels
┌──────────┬─────────┬────────┬────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Channel  │ Enabled │ State  │ Detail                                                                                                                         │
├──────────┼─────────┼────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Discord  │ ON      │ OK     │ token config (MTQ2…UqnA · len 72) · accounts 1/1                                                                               │
└──────────┴─────────┴────────┴────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘

Sessions
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┬────────┬─────────┬─────────────────┬────────────────┐
│ Key                                                                                                    │ Kind   │ Age     │ Model           │ Tokens         │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┼────────┼─────────┼─────────────────┼────────────────┤
│ agent:main:main                                                                                        │ direct │ 13m ago │ claude-opus-4-5 │ 14k/200k (7%)  │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┴────────┴─────────┴─────────────────┴────────────────┘

FAQ: https://docs.openclaw.ai/faq
Troubleshooting: https://docs.openclaw.ai/troubleshooting

Next steps:
  Need to share?      openclaw status --all
  Need to debug live? openclaw logs --follow
  Need to test channels? openclaw status --deep
```

### gatewayサービスの状態

```
admin@clawdbot:~$ openclaw gateway status

🦞 OpenClaw 2026.2.1 (ed4529e) — Type the command with confidence—nature will provide the stack trace if needed.

│
◇
Service: systemd (enabled)
File logs: /tmp/openclaw/openclaw-2026-02-02.log
Command: /home/admin/.anyenv/envs/nodenv/versions/22.22.0/bin/node /home/admin/.anyenv/envs/nodenv/versions/22.22.0/lib/node_modules/openclaw/dist/index.js gateway --port 18789
Service file: ~/.config/systemd/user/openclaw-gateway.service
Service env: OPENCLAW_GATEWAY_PORT=18789

Config (cli): ~/.openclaw/openclaw.json
Config (service): ~/.openclaw/openclaw.json

Gateway: bind=loopback (127.0.0.1), port=18789 (service args)
Probe target: ws://127.0.0.1:18789
Dashboard: http://127.0.0.1:18789/
Probe note: Loopback-only gateway; only local clients can connect.

Runtime: running (pid 4428, state active, sub running, last exit 0, reason 0)
RPC probe: ok

Troubles: run openclaw status
Troubleshooting: https://docs.openclaw.ai/troubleshooting
```

## 初めての自分のAIエージェントとの会話

<img width="909" height="570" alt="image" src="https://github.com/user-attachments/assets/75a37798-11d1-4807-9e38-c0f182fcbf7d" />

## $MOLTトークンについて

 * https://app.uniswap.org/explore/tokens/base/0xB695559b26BB2c9703ef1935c37AeaE9526bab07?inputCurrency=NATIVE



## Startaleポートフォリオ

### タイトル

 * ブログタイトル

### タグ

 * Product ideas or UX explorations
 * Design, visual, or motion work
 * Writing, research, or ecosystem analysis
 * Code, tools, or technical experiments
 * Content, media, or community initiatives

### これはなんですか？

 * 

### なぜ重要ですか？

 * 

### ブログポスト

 * 英語版 : https://www.stardust.box/
 * 日本語版 : https://www.stardust.box/

### Xスレッド

 * 英語版 : https://x.com/stardustdotbox
 * 日本語版 : https://x.com/stardustdotbox

## ブログ更新コマンド

```
┌──(stardust✨stardust)-[~/stardustdotbox.github.io]
└─$ git add -A && git commit -m 'Startale App調査レポートの更新' && git push
```

## 参考文献

 * https://openclaw.ai/
 * https://docs.openclaw.ai/start/getting-started
 * https://discord.com/invite/clawd
 * https://github.com/openclaw/openclaw
 * https://zenn.dev/yujmatsu/articles/20260125_clawdbot_beginners_guide
 * https://platform.openai.com/api-keys
 * https://discord.com/developers/applications
 * https://www.clawhub.com/
 * https://www.anthropic.com/
 * https://app.uniswap.org/explore/tokens/base/0xB695559b26BB2c9703ef1935c37AeaE9526bab07?inputCurrency=NATIVE
 * https://www.moltbook.com/
 * https://en.wikipedia.org/wiki/Moltbook
 * https://github.com/moltbook
 * https://robonet.finance/