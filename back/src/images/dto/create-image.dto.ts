import { IsNotEmpty } from "class-validator";

export class CreateImagesDto {
  @IsNotEmpty()
  imageData: Buffer;
}
