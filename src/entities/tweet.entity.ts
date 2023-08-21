import { User } from './user.entity';

export class Tweet {
    private _user: User;
    private _tweet: string;
  
    constructor(user: User, tweet: string) {
        this._user = user;
        this._tweet = tweet;
    }
    get user(): User {
        return this._user;
    }
    
    get tweet(): string {
        return this._tweet;
    }
  }