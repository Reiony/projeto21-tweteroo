import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTweetDTO {
  @IsNotEmpty({ message: 'All fields are required!' })
  @IsString()
  username: string;

  @IsNotEmpty({ message: 'All fields are required!' })
  @IsString()
  tweet: string;
}