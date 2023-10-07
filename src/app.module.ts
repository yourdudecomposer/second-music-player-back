import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Track } from './tracks/track.model';
import { TracksModule } from './tracks/tracks.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, 'static') }),

    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'filippgoriainov',
      password: 'filippgoriainov',
      database: 'template1',
      models: [Track],
      autoLoadModels: true,
      synchronize: true,
    }),
    TracksModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
