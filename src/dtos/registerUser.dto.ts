import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Matches, MinLength, IsEmail, IsOptional } from "class-validator";
import { Roles } from "../app.roles";

export class RegisterUserDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @Matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  password: string;


  @ApiProperty()
  @IsOptional()
  roles?: Roles;
}
