import { ApiProperty } from "@nestjs/swagger";
import {IsNotEmpty, IsOptional} from "class-validator";

export class CreateAbsenceDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  fromDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  toDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  reason: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  remarks?: string;
}
