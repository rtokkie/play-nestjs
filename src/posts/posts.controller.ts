import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { JwtPayload } from '../auth/types';
import { GetCurrentUser } from '../common/decorators';
import { CreatePostRequest, UpdatePostRequest } from './dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  async findAll() {}

  @Get(':id')
  async findOne() {}

  @Post()
  async create(@GetCurrentUser() user: JwtPayload, @Body() dto: CreatePostRequest) {
    return this.postsService.create(user, dto);
  }

  @Put(':id')
  async update(
    @GetCurrentUser() user: JwtPayload,
    @Param('id') id: string,
    @Body() dto: UpdatePostRequest,
  ) {
    return this.postsService.update(user, id, dto);
  }

  @Delete(':id')
  async delete(@GetCurrentUser() user: JwtPayload, @Param('id') id: string) {
    return this.postsService.delete(user, id);
  }
}
