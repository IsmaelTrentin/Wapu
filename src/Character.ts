/**
 * Basic MAL character infos.
 * 
 * @author Ismael Trentin
 * @version 2020.08.10
 * @since 1.0.0
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