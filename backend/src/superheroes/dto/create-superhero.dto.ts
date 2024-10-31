import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateSuperheroDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  nickname: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  realName: string;

  @IsNotEmpty()
  @IsString()
  originDescription: string;

  @IsNotEmpty()
  @IsString()
  catchPhrase: string;

  @IsNotEmpty()
  @IsString()
  superpowers: string;
}
