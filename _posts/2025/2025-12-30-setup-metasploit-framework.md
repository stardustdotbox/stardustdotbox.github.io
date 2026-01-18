---
title: 'metasploit frameworkをセットアップする'
date: 2025-12-30
permalink: /posts/2025/12/setup-metasploit-framework/
tags:
  - metasploit
header:
  image: https://github.com/user-attachments/assets/6ffdc56b-d066-47f0-9edb-3bae316c772b
---

<img width="468" height="448" alt="image" src="https://github.com/user-attachments/assets/6ffdc56b-d066-47f0-9edb-3bae316c772b" />

## PostgreSQLのインストール

```
┌──(stardust✨stardust)-[~/stardust]
└─$ sudo apt-get install postgresql

┌──(stardust✨stardust)-[~/stardust]
└─$ sudo systemctl status postgresql
○ postgresql.service - PostgreSQL RDBMS
     Loaded: loaded (/usr/lib/systemd/system/postgresql.service; disabled; preset: disabled)
     Active: inactive (dead)

┌──(stardust✨stardust)-[~/stardust]
└─$ sudo systemctl start postgresql

┌──(stardust✨stardust)-[~/stardust]
└─$ sudo systemctl enable postgresql
Synchronizing state of postgresql.service with SysV service script with /usr/lib/systemd/systemd-sysv-install.
Executing: /usr/lib/systemd/systemd-sysv-install enable postgresql
Created symlink '/etc/systemd/system/multi-user.target.wants/postgresql.service' → '/usr/lib/systemd/system/postgresql.service'.
```

## metasploit-frameworkのインストール

```
┌──(stardust✨stardust)-[~/stardust]
└─$ sudo apt-get install metasploit-framework
┌──(stardust✨stardust)-[~/stardust]
└─$ sudo msfdb init
┌──(stardust✨stardust)-[~/stardust]
└─$ msfconsole 
Metasploit tip: Search can apply complex filters such as search cve:2009 
type:exploit, see all the filters with help search
                                                  

      .:okOOOkdc'           'cdkOOOko:.
    .xOOOOOOOOOOOOc       cOOOOOOOOOOOOx.
   :OOOOOOOOOOOOOOOk,   ,kOOOOOOOOOOOOOOO:
  'OOOOOOOOOkkkkOOOOO: :OOOOOOOOOOOOOOOOOO'
  oOOOOOOOO.MMMM.oOOOOoOOOOl.MMMM,OOOOOOOOo
  dOOOOOOOO.MMMMMM.cOOOOOc.MMMMMM,OOOOOOOOx
  lOOOOOOOO.MMMMMMMMM;d;MMMMMMMMM,OOOOOOOOl
  .OOOOOOOO.MMM.;MMMMMMMMMMM;MMMM,OOOOOOOO.
   cOOOOOOO.MMM.OOc.MMMMM'oOO.MMM,OOOOOOOc
    oOOOOOO.MMM.OOOO.MMM:OOOO.MMM,OOOOOOo
     lOOOOO.MMM.OOOO.MMM:OOOO.MMM,OOOOOl
      ;OOOO'MMM.OOOO.MMM:OOOO.MMM;OOOO;
       .dOOo'WM.OOOOocccxOOOO.MX'xOOd.
         ,kOl'M.OOOOOOOOOOOOO.M'dOk,
           :kk;.OOOOOOOOOOOOO.;Ok:
             ;kOOOOOOOOOOOOOOOk:
               ,xOOOOOOOOOOOx,
                 .lOOOOOOOl.
                    ,dOd,
                      .

       =[ metasploit v6.4.103-dev                               ]
+ -- --=[ 2,584 exploits - 1,319 auxiliary - 1,694 payloads     ]
+ -- --=[ 433 post - 49 encoders - 14 nops - 9 evasion          ]

Metasploit Documentation: https://docs.metasploit.com/
The Metasploit Framework is a Rapid7 Open Source Project

msf > db_status
[*] Connected to msf. Connection type: postgresql.
````

## 参考文献

 * https://github.com/stardustdotbox/stardustdotbox.github.io/wiki/Pastebin_2025
