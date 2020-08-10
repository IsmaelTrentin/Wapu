# Wapu - MAL Characters API

### IMPORTANT!

Don't rely on this API since is in testing and will probably be offline most of the times. I will try to
fix it so that it will be up 24/7 by the end of summer (more likely before). 

### Premise
Since the shutdown of the original Discord [WaifuBot](https://top.gg/bot/472141928578940958?__cf_chl_jschl_tk__=643fd8446c0cc1eba03c41afbc2898630011ce93-1596852477-0-AS3MfJIozFYg4Et7jmr3OZiXSLB6m8uGcH1byFLXjdxvLuw-EJmYmi_vESyi6QC0Zo0oswvScxri0pzHBizPjgnsgtYJo4ZGsQ2GRXx5mlgbBzDWBlgT1YcdAdYMblzDPpR_eDy9ZK-2Hq9eUYjW1_Rxn1XFsqQQ3N5SuesL5q1R62-fLwi5BPguBwcDYSKQyVphmpoM_4x1nJ40SGSKZL98NgagPRKwWPFzVE6QS20wgGdTFQ2ZCgNlRUbJrIno8HKotP960FTckk9WFYuYlpknKLqPoAnLSeuBdV1eDORY_4rgqj0pXXC3K8cN0CJdww 'The one and only') I wanted to try and recreate it by myself.
At first I searched for any [My Anime List](https://myanimelist.net 'MAL') APIs, but none of the small amount of existing one fit 
my requirements. Since i knew nothing about APIs I didn't want to create one by myself so I 
started working by saving characters data in JSON format. This idea quickly became 
inconvenient and slow so I finally decided to start learing about APIs and how to make them.

__READ HERE:__ I am new to APIs so this is probally going to be __BAD__, but it gets the job done.
I am also a student and I am no way near the level of a professional coder so the code 
will (most of the times) not be 100% efficient.  

---

### Links

* 📱 [Twitter](https://twitter.com/wapu65268026 'Twitter') :  state updates and more info about updates.
* 🧰 [npm](https://www.npmjs.com/package/wapu 'npm') : check out the wapu npm page.

### npm Package

This package lets you use the API in an easy and understandable way. You can install it with npm.

```bash
npm install wapu
```

---

### Wapu
This API let's you fetch [My Anime List](https://myanimelist.net 'MAL') characters data (name, aliases, ...). The data fields added
by users (like gender, blood type, etc.) __are not included__ since they are not common through the 
characters. For example some have them and some not.


### Allowed HTTPs requests:
* GET : Get a character by its MAL id.


### Description Of Server Responses
|Code|Message    |Description                                                                  |
|----|-----------|-----------------------------------------------------------------------------|
|200 |OK         |The request was successful                                                   |
|400 |Invalid Id |In [My Anime List](https://myanimelist.net 'MAL') some IDs are invalid        |
|401 |Unstored   |The character is not stored in the database|


### Allowed Queries
|Key    |Value  |Action                                                    |
|-------|-------|----------------------------------------------------------|
|save   |true   | If the character i not in the DB, it gets stored         |
|       |false  | If the character i not in the DB, it does not get stored|

If no save query is specified the default action will be *true*.

---


## Definitions

### Character

Defines the character data.

```typescript
interface Character{
    id: number,                  // The character MAL id.
    name: string,                // The character name.
    aliases: Array<string>,      // The character aliases.
    image: string,               // The character MAL image.
    animeography: Array<string>, // The character animeography.
    rarity: string,              // The character rarity.
    tags?: Array<string>         // The character optional tags.
}
```

* As of the **current version** the animeography contains only the amount of anime and not the names.

#### Rarity field

The rarity is calculated based on the user votes. These are the ranges:

|Rarity|Range           |
|------|----------------|
|α     |[0, 1000[       |
|β     |[1000, 5000[    |
|γ     |[5000, 10000[   |
|δ     |[10000, 20000[  |
|ε     |[20000, 30000[  |
|ζ     |[30000, 40000[  |
|η     |[40000, 60000[  |
|θ     |[60000, 70000[  |
|ι     |[70000, 99999[  |
|λ     |[100000, ∞[     |


## Usage

### Example

First install the npm package. It's has included types so you can use it in typescript.

```bash
npm install wapu
```

Then import it in your code, im going to use TypeScript language.

```typescript
import { Wapu } from 'wapu';
```

To fetch a character, use the fetch( id ) method. The id is the My Anime List ID, 
you can find it in the URL when you visit che character page on the website.

```typescript
Wapu.fetch(19566) // Mio Akiyama ID
    .then((character:Character) => console.log(character))
    .catch(err => console.err(err));
```

* Note: in this case, if the character is not in the database, it's going to be fetched
from the website and then stored in the database.

#### The save parameter

When you fetch a character the API tries to fetch the database. If the database does 
not contain the character, the API will fetch the website, return the character to you
and then create a new record for it in the database. The next time you will fetch this
character, it will be fetched from the database and the fetch time will be significantly
lower.

```typescript
Wapu.fetch(19566, false)  // Returns only if is in the database.
    .then((character:Character) => console.log(character))
    .catch(err => console.err(err));
```

* In this case, if the character with id __19566__ is not stored in the database the code 
above will fail and log the error. 



