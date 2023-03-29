import { Injectable } from '@nestjs/common';
import * as sqlite from 'sqlite3';
import { open } from 'sqlite';

@Injectable()
export class BibleService {
  async getVerse({
    book,
    chapter,
    verse,
  }: {
    book: number;
    chapter: number;
    verse: number;
  }): Promise<string> {
    try {
      const db = await open({
        filename: 'NTGspa.sqlite',
        driver: sqlite.Database,
        mode: sqlite.OPEN_READONLY,
      });
      const row = await db.get(
        'SELECT Scripture from Bible where Book = ? AND Chapter = ? AND Verse = ?',
        [book, chapter, verse],
      );
      return row?.Scripture ? row.Scripture : '';
    } catch (err) {
      console.log('Error getting verse: ', err);
    }
    return `Test: ${book}-${chapter}-${verse}`;
  }
}
