import { Column, Entity, Index } from 'typeorm';

@Index('bibleBCV', ['Book', 'Chapter', 'Verse'], { unique: true })
@Entity()
export class Bible {
  @Column()
  Book: number;

  @Column()
  Chapter: number;

  @Column()
  Verse: number;

  @Column()
  Scripture: string;
}
