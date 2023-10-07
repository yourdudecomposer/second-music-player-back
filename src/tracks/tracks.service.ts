import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Track } from './track.model';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { FileService } from 'src/file/file.service';

@Injectable()
export class TracksService {
  constructor(
    @InjectModel(Track)
    private TrackModel: typeof Track,
    private fileService: FileService,
  ) {}

  async createTrack(dto: CreateTrackDto, cover, audio): Promise<Track | any> {
    if (!dto.title || !dto.description) return { status: 500 };
    const audioPath = this.fileService.createFile('audio', audio);
    const coverPath = this.fileService.createFile('cover', cover);
    return this.TrackModel.create({
      ...dto,
      audio: audioPath,
      cover: coverPath,
    });
  }

  async getActiveTracks(limit = 10, offset = 0): Promise<Track[]> {
    return this.TrackModel.findAll({
      offset,
      limit,
      where: {
        isActive: true,
      },
    });
  }

  async getAllTracks(limit = 10, offset = 0): Promise<Track[]> {
    return this.TrackModel.findAll({ offset, limit });
  }

  findOne(id: string): Promise<Track> {
    return this.TrackModel.findOne({
      where: {
        id,
      },
    });
  }

  async updateTrack(id: string, dto: UpdateTrackDto): Promise<any> {
    const Track = await this.findOne(id);
    await Track.update(dto);
    return Track.dataValues;
  }

  async removeTrack(id: string): Promise<Track> {
    const Track = await this.findOne(id);
    console.log(Track);

    this.fileService.removeFile(Track.dataValues.audio);
    this.fileService.removeFile(Track.dataValues.cover);
    await Track.destroy();
    return Track.dataValues;
  }
}
