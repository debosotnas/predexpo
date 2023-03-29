import { Controller, Get, Param } from '@nestjs/common';
import { BibleService } from './bible.service';

@Controller('bible')
export class BibleController {
  constructor(private readonly bibleService: BibleService) {}

  @Get('/:book/:chapter/:verse')
  async getVerse(
    @Param('book') book: number,
    @Param('chapter') chapter: number,
    @Param('verse') verse: number,
  ): Promise<string> {
    return this.bibleService.getVerse({
      book,
      chapter,
      verse,
    });
  }
}
