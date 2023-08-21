import { IsString, IsUrl } from 'class-validator';

export class CreateUserDTO {
    @IsString({ message: 'All fields are required!' })
    username: string;
  
    @IsUrl({}, { message: 'All fields are required!' })
    avatar: string;
  }