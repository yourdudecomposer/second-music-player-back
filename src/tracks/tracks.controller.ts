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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('/tracks')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'cover', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  create(@UploadedFiles() files, @Body() trackDto: CreateTrackDto) {
    console.log('==================================');
    console.log(trackDto);
    console.log('==================================');
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

  @UseGuards(AuthGuard)
  @Get('all')
  getAllTracks(@Query('count') limit: number, @Query('offset') offset: number) {
    return this.tracksService.getAllTracks(limit, offset);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  update(@Param('id') id: string, @Body() trackDto: UpdateTrackDto) {
    console.log('==================================');
    console.log(id, trackDto);
    console.log('==================================');

    return this.tracksService.updateTrack(id, trackDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  removeTrack(@Param('id') id: string) {
    return this.tracksService.removeTrack(id);
  }
}
