import { Controller, Get, Param, Query } from '@nestjs/common';
import { BiBleSource, BibleVersion } from './bible.enum';
import { BibleService } from './bible.service';
import { DataVerseResponse, ExternalVerseResponse } from './bible.type';

@Controller('bible')
export class BibleController {
  constructor(private readonly bibleService: BibleService) {}

  @Get('/:book/:chapter/:verse')
  async getVerse(
    @Param('book') book: number,
    @Param('chapter') chapter: number,
    @Param('verse') verse: number,
    @Query()
    { source, version }: { source: BiBleSource; version: BibleVersion },
  ): Promise<DataVerseResponse> {
    return this.bibleService.getVerse({
      book,
      chapter,
      verse,
      source,
      version,
    });
  }

  @Get('/external/:book/:chapter/:verse')
  async getExternalVerse(
    @Param('book') book: number,
    @Param('chapter') chapter: number,
    @Param('verse') verse: number,
    @Query()
    { source, version }: { source: BiBleSource; version: BibleVersion },
  ): Promise<ExternalVerseResponse | ExternalVerseResponse[]> {
    return this.bibleService.getExternalVerse({
      book,
      chapter,
      verse,
      source,
      version,
    });
  }
}
