import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BibleModule } from './bible/bible.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'alpha', 'dist'),
    }),
    ConfigModule.forRoot(),
    BibleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
