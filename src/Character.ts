/**
 * Basic MAL character infos.
 * 
 * @author Ismael Trentin
 * @version 2020.08.08
 */
export interface Character {
  id: number,
  name: string,
  aliases: Array<string>,
  image: string,
  animeography: Array<string>,
  rarity: string,
  tags?: Array<string>
}

/**
 * Defines how a character is stored
 * in the database.
 * 
 * @author Ismael Trentin
 * @version 2020.08.08
 */
export interface DBCharacter {
  id: number,
  name: string,
  aliases: string,
  image: string,
  animeography: string,
  rarity: string,
  tags?: string
}

/**
 * Builds a Character object from a DBCharacter object.
 * 
 * @param dbData the character object fetched from the DB
 * @returns a Character object.
 * @since 1.1.0
 * @see {@linkcode DBCharacter}
 */
export function buildFromDBCharacter(dbData: DBCharacter): Character {
  let c: Character = { id: -1, name: '', aliases: [], image: '', animeography: [], rarity: '', tags: [] };
  try {
    c.id = dbData.id;
    c.name = dbData.name;
    if (dbData.aliases != null) {
      c.aliases = dbData.aliases.split(',');
    } else {
      c.aliases = [];
    }
    c.image = dbData.image;
    if (dbData.animeography != null) {
      c.animeography = dbData.animeography.split(',');
    } else {
      c.animeography = [];
    }
    c.rarity = dbData.rarity;
    if (dbData.tags != null) {
      c.tags = dbData.tags.split(',');
    } else {
      c.tags = [];
    }
    return c;
  } catch{
    throw 'Invalid JSON';
  }
}

/**
 * Builds a Character object from a DBCharacter object.
 * 
 * @param character the character object fetched from the API
 * @returns a DBCharacter object.
 * @since 1.1.0
 * @see {@linkcode Character}
 */
export function fromCharacter(character: Character): DBCharacter {
  let c: DBCharacter = { id: -1, name: '', aliases: '', image: '', animeography: '', rarity: '', tags: '' };
  try {
    c.id = character.id;
    c.name = character.name;
    if (character.aliases != null) {
      c.aliases = character.aliases.join(',');
    } else {
      c.aliases = '';
    }
    c.image = character.image;
    if (character.animeography != null) {
      c.animeography = character.animeography.join(',');
    } else {
      c.animeography = '';
    }
    c.rarity = character.rarity;
    if (character.tags != null) {
      c.tags = character.tags.join(',');
    } else {
      c.tags = '';
    }
    return c;
  } catch{
    throw 'Invalid JSON';
  }
}