import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('/tracks')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'cover', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  create(@UploadedFiles() files, @Body() trackDto: CreateTrackDto) {
    const { cover, audio } = files;

    return this.tracksService.createTrack(trackDto, cover[0], audio[0]);
  }

  @Get()
  getActiveTracks(
    @Query('count') limit: number,
    @Query('offset') offset: number,
  ) {
    return this.tracksService.getActiveTracks(limit, offset);
  }
  @Get('all')
  getAllTracks(@Query('count') limit: number, @Query('offset') offset: number) {
    return this.tracksService.getAllTracks(limit, offset);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() trackDto: UpdateTrackDto) {
    return this.tracksService.updateTrack(id, trackDto);
  }

  @Delete(':id')
  removeTrack(@Param('id') id: string) {
    return this.tracksService.removeTrack(id);
  }

  //   @Get('/track')
  //   getTrack() {
  //     return this.TracksService.getTrack();
  //   }
  //   @Get('/article')
  //   getArticle() {
  //     return this.TracksService.getArticle();
  //   }
  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}
