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
import { getScriptureApiEndpoint } from './bible.data';
import axios from 'axios';
import {
  DataVerseResponse,
  ExternalVerseResponse,
  ScriptureApiVerseData,
} from './bible.type';

@Injectable()
export class BibleService {
  constructor(private readonly configService: ConfigService) {}

  async getVerse(getVersesDto: GetVersesDto): Promise<DataVerseResponse> {
    const { book, chapter, verse }: GetVersesDto = getVersesDto;
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
      const externalVerse: ExternalVerseResponse = await this.getExternalVerse(
        getVersesDto,
      );
      const response: DataVerseResponse = {
        id: `${book}/${chapter}/${verse}`,
        greek: row?.Scripture ? row.Scripture : '',
        verse: externalVerse.verse,
      };

      return response;
    } catch (err) {
      console.log('Error on getting verse: ', err);
      throw new InternalServerErrorException(`Error on serving verses: ${err}`);
    }
  }

  async getExternalVerse(
    versesData: GetVersesDto,
  ): Promise<ExternalVerseResponse> {
    // const { book, chapter, verse, source } = versesData;
    const { book, chapter, verse, source, version } = versesData;
    const bibleSource: BiBleSource = source ? source : BiBleSource.SCRIPTURE;
    const bibleVersion: BibleVersion = version ? version : BibleVersion.V1909;

    // add more external-sources, for now only scriptureApi
    if (bibleSource !== BiBleSource.SCRIPTURE) {
      throw new NotFoundException(`Bible '${bibleSource}' not found`);
    }

    if (bibleVersion !== BibleVersion.V1909) {
      throw new NotFoundException(
        `Version '${bibleVersion}' not found for '${bibleSource}'`,
      );
    }

    const scriptureApiKey = this.configService.get<string>('API_BIBLE_TOKEN');

    const endpoint = getScriptureApiEndpoint(versesData);
    const { data }: { data: ScriptureApiVerseData } = await axios.get(
      endpoint,
      {
        headers: {
          'api-key': scriptureApiKey,
        },
      },
    );

    return {
      id: `${bibleSource}/${bibleVersion}/${book}/${chapter}/${verse}`,
      verse: data.content,
    };
  }
}
