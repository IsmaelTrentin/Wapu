import { Character } from "./Character";
import _fetch from 'node-fetch';

/**
 * Contains the methods user for fetching character data
 * from the website myanimelist.net or the database.
 * 
 * @author Ismael Trentin
 * @version 2020.08.09
 * @since 1.0.0
 */
export class Wapu {

  /**
   * Returns the Character object corresponding to the MAL id.
   * 
   * @param malId the myanimelist global id
   * @returns a Character object containing all the character basic info.
   * @since 1.0.0
   * @see {@linkcode Parser.ts}
   */
  public static async fetch(malId: number, save?: boolean): Promise<Character> {
    let url: string = `http://176.46.234.88/character/${malId}?save=${(save === undefined) ? false : save}`;
    return new Promise<Character>((resolve, reject) => {
      _fetch(url)
        .then((resp: any) => resp.text())
        .then((json: string) => {
          resolve(JSON.parse(json) as Character);
          return;
        })
        .catch(err => {
          if (err.code === 'ECONNREFUSED') {
            reject('API offline');
            return;
          } else {
            reject(err);
            return;
          }
        });
    });
  }
}