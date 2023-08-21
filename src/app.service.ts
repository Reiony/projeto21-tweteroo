import { Injectable, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { CreateUserDTO } from './dto/user.dto';
import { CreateTweetDTO } from './dto/tweet.dto';
import { User } from './entities/user.entity';
import { Tweet } from './entities/tweet.entity';

@Injectable()
export class AppService {
  private users: User[] = [];
  private tweets: Tweet[] = [];

  
  getHealth(): string {
    return "I'm okay!";
  }

  createUser(body: CreateUserDTO) {
    const { username, avatar } = body;
    if (!username || !avatar) {
      return { statusCode: HttpStatus.BAD_REQUEST, message: 'All fields are required!' };
    }

    const existingUser = this.users.find(user => user.username === username);
    if (existingUser) {
      return { statusCode: HttpStatus.BAD_REQUEST, message: 'Username already exists!' };
    }

    this.users.push(new User(username, avatar));

    return { message: 'OK' };
  }
  
  createTweet(body: CreateTweetDTO) {
    const user = this.users.find((u) => u.username === body.username);

    if (!user) throw new UnauthorizedException();

    const tweet = new Tweet(user, body.tweet);
    this.tweets.push(tweet);
  }
  
  getLatestTweets(page?: number){
    const latestTweets = this.tweets.map((tweet) => {
      const user = tweet.user;
      return {
        username: user.username,
        avatar: user.avatar,
        tweet: tweet.tweet
      };
    });

    if (page && page >= 1) {
      const limit = 5;
      const start = (page - 1) * limit;
      const end = page * limit;

      return latestTweets.slice(start, end);
    }

    return latestTweets.slice(-15);
  }
  
  getUserTweets(username: string) {
    const userTweets = this.tweets
      .filter((tweet) => tweet.user.username === username)
      .map((tweet) => {
        const user = tweet.user;
        return {
          username: user.username,
          avatar: user.avatar,
          tweet: tweet.tweet,
        };
      });

    return userTweets;
  }
}