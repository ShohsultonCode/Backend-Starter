import { IsNotEmpty, IsString } from 'class-validator';

//LoginWithGoogleDto
export class LoginWithGoogleDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}
