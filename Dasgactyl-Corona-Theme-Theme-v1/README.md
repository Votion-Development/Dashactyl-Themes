```
Theme Name: No Name 1

Dashactyl Version: v1

Theme Language: English

Made in: EJS

Creator: Abraar#7724
```
Replace files in frontend folder to install

Quote fromm creator:

In order for the shop to work correctly, you need to set the per/unit as below in your settings.yml file. You can change the price as you want but keep the (per) so that the page functions correctly. else you might need to edit the store.ejs file yourself

```yml
store: # This is the store options.
  # 'enabled' is an option, which toggles if you can buy a single type of resource of.
  # 'cost' is the amount of coins 'per' of a resource would cost.

  memory:
    enabled: true
    cost: 2000 # can change / Price per GB
    per: 1024 # Cannot change / 

  disk:
    enabled: true
    cost: 2000
    per: 1024

  cpu:
    enabled: true
    cost: 5000
    per: 10

  servers:
    enabled: true
    cost: 150
    per: 1
```