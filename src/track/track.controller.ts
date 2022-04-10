import {
  Controller,
  Delete,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFiles,
  Query,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackService } from './track.service';

@Controller('/tracks')
export class TrackController {
  constructor(private trackSerivce: TrackService) {}

  @Post('/')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  create(@UploadedFiles() files, @Body() dto: CreateTrackDto) {
    const { picture, audio } = files;

    return this.trackSerivce.create(dto, picture[0], audio[0]);
  }

  @Get('/')
  getAll(@Query('count') count: number, @Query('offset') offset: number) {
    return this.trackSerivce.getAll(count, offset);
  }

  @Get('/search')
  search(@Query('query') query: string) {
    return this.trackSerivce.search(query);
  }

  @Get('/:id')
  getOne(@Param('id') id: ObjectId) {
    return this.trackSerivce.getOne(id);
  }

  @Delete('/:id')
  delete(@Param('id') id: ObjectId) {
    return this.trackSerivce.delete(id);
  }

  @Post('/comment')
  addComment(@Body() dto: CreateCommentDto) {
    return this.trackSerivce.addComent(dto);
  }

  @Post('/listen/:id')
  listen(@Param('id') id: ObjectId) {
    return this.trackSerivce.listen(id);
  }
}
