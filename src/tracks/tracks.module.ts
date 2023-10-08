import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Track } from './track.model';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { FileService } from 'src/file/file.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [SequelizeModule.forFeature([Track]), AuthModule],
  providers: [TracksService, FileService],
  controllers: [TracksController],
})
export class TracksModule {}
