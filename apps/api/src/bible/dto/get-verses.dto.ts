import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BiBleSource, BibleVersion } from '../bible.enum';

export class GetVersesDto {
  @IsNumber()
  book: number;
  @IsNumber()
  chapter: number;
  @IsNumber()
  verse: number;

  @IsOptional()
  @IsString()
  source: BiBleSource;

  @IsOptional()
  @IsString()
  version: BibleVersion;
}
