import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Track } from './track.model';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { FileService } from 'src/file/file.service';

@Module({
  imports: [SequelizeModule.forFeature([Track])],
  providers: [TracksService, FileService],
  controllers: [TracksController],
})
export class TracksModule {}
