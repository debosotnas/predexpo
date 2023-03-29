import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BibleModule } from './bible/bible.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'alpha', 'dist'),
    }),
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //   // database: 'test.sqlite',
    //   // autoLoadEntities: true,
    //   // synchronize: true,
    //   //
    //   database: 'NTGspa.sqlite',
    // }),
    BibleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
