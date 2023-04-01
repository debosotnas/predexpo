import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as sqlite from 'sqlite3';
import { open } from 'sqlite';
import { ConfigService } from '@nestjs/config';
import { GetVersesDto } from './dto/get-verses.dto';
import { BiBleSource, BibleVersion } from './bible.enum';
import {
  BIBLE_ABBR,
  BIBLE_FULL,
  BIBLE_VERSIONS,
  getScriptureApiEndpoint,
} from './bible.data';
import axios from 'axios';
import {
  DataVerseResponse,
  ExternalVerseResponse,
  ScriptureApiVerseData,
} from './bible.type';
import { JSDOM } from 'jsdom';
import * as path from 'path';

@Injectable()
export class BibleService {
  constructor(private readonly configService: ConfigService) {}

  async getVerse(getVersesDto: GetVersesDto): Promise<DataVerseResponse> {
    const { book, chapter, verse }: GetVersesDto = getVersesDto;
    const CURR_ENV = this.configService.get<string>('ENV');

    let pathToDB: string;
    if (CURR_ENV === 'dev') {
      pathToDB = 'NTGspa.sqlite';
    } else {
      pathToDB = path.join(__dirname, '..', 'NTGspa.sqlite');
    }
    // console.log('>>> pathToDB: ', pathToDB);

    const db = await open({
      filename: pathToDB,
      driver: sqlite.Database,
      mode: sqlite.OPEN_READONLY,
    });
    const row = await db.get(
      'SELECT Scripture from Bible where Book = ? AND Chapter = ? AND Verse = ?',
      [book, chapter, verse],
    );

    if (!row) {
      throw new NotFoundException('Bible verse not found');
    }
    // For now leaving without external verse. FE will get once greek version will be rendered
    // const externalVerse: ExternalVerseResponse = await this.getExternalVerse(
    //   getVersesDto,
    // );
    const response: DataVerseResponse = {
      id: `${book}/${chapter}/${verse}`,
      label: `${BIBLE_ABBR[book - 1]}. ${chapter}:${verse}`,
      greek: row?.Scripture ? row.Scripture : '',
      verse: '',
      // verse: externalVerse.verse,
    };

    return response;
  }

  async getExternalVerse(
    versesData: GetVersesDto,
  ): Promise<ExternalVerseResponse | ExternalVerseResponse[]> {
    const enabledVersions = BIBLE_VERSIONS.map((bv) => bv.value);
    const bibleVersion: BibleVersion = versesData.version
      ? versesData.version
      : BibleVersion.V1909;

    if (!enabledVersions.includes(bibleVersion)) {
      throw new NotFoundException(`Version '${bibleVersion}' not found'`);
    }

    if (bibleVersion === BibleVersion.V1909) {
      return this.getFromScripture({ ...versesData, version: bibleVersion });
    }

    return this.getFromBG({ ...versesData, version: bibleVersion });
  }

  async getFromScripture(
    versesData: GetVersesDto,
  ): Promise<ExternalVerseResponse> {
    const { book, chapter, verse, version } = versesData;
    const scriptureApiKey = this.configService.get<string>('API_BIBLE_TOKEN');

    try {
      const endpoint = getScriptureApiEndpoint(versesData);
      const {
        data: { data },
      }: { data: { data: ScriptureApiVerseData } } = await axios.get(endpoint, {
        headers: {
          'api-key': scriptureApiKey,
        },
      });
      return {
        id: `${version}/${book}/${chapter}/${verse}`,
        version,
        verse: data.content,
      };
    } catch (err) {
      console.log('>>> SCRIPTURE API Err: ', err?.message);
      throw new InternalServerErrorException(
        'Error: Get data from Scripture API',
      );
    }
  }

  async getFromBG(
    versesData: GetVersesDto,
  ): Promise<ExternalVerseResponse | ExternalVerseResponse[]> {
    const { book, chapter, verse } = versesData;

    const bookName = BIBLE_FULL[book - 1];
    const bookPath = encodeURIComponent(`${bookName} ${chapter}:${verse}`);
    // query = "John 3:16",
    // version: string = "ESV"
    // let encodedSearch = encodeURIComponent(query);
    // let encoodedVersion = encodeURIComponent(version);
    // const url = `https://www.biblegateway.com/verse/es/1%20Corintios%201:1`;

    const url = `https://www.biblegateway.com/verse/es/${bookPath}`;
    let resp;
    try {
      resp = await axios.get(url);
    } catch (err) {
      console.log('>> Error getting axios data: ', err?.message);
      throw new InternalServerErrorException('Error getting data from BG');
    }
    const data = resp.data;
    const { document } = new JSDOM(data).window;

    try {
      const verses = document?.querySelectorAll('.singleverse-row');
      const arrVerses = Array.from(verses);
      if (arrVerses?.length) {
        const enabledVersions = BIBLE_VERSIONS.map((bv) => bv.value);
        const versesObjs: ExternalVerseResponse[] = arrVerses
          .map((verseContent: any) => {
            const v = verseContent.querySelector(
              '.singleverse-version a',
            )?.textContent;
            const t =
              verseContent.querySelector('.singleverse-text')?.textContent;
            if (v && t && enabledVersions.includes(v)) {
              const id = `${v}/${book}/${chapter}/${verse}`;
              return {
                id,
                version: v,
                verse: t,
              };
            }
            return;
          })
          .filter(Boolean);
        return versesObjs;
      }
    } catch (err) {
      throw new InternalServerErrorException(
        'Error: Parsing getFromBG content',
      );
    }
  }
}
