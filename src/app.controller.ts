import { Controller, Get, Post, Body, HttpStatus, HttpCode, Query, HttpException, Param} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDTO } from './dto/user.dto';
import { CreateTweetDTO } from './dto/tweet.dto';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('/')
  getHealth(): string {
    return this.appService.getHealth();
  }

  @Post('/sign-up')
  @HttpCode(HttpStatus.OK)
  createUser(@Body() body: CreateUserDTO){
    const result = this.appService.createUser(body);
    return { message: result.message}
  }

  @Post('/tweets')
  postTweet(@Body() body: CreateTweetDTO) {
    return this.appService.createTweet(body);
  }

  @Get('/tweets')
  getTweets(@Query('page') page?: number) {
    if (page !== undefined && (isNaN(page) || page < 1)) {
      throw new HttpException('Informe uma página válida!', 400);
    }
    return this.appService.getLatestTweets(page);
  }

  @Get('tweets/:username')
  getTweetsFromUser(@Param('username') username: string) {
    return this.appService.getUserTweets(username);
  }
}
