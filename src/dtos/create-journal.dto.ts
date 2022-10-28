import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString} from "class-validator";

export class CreateJournalDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  activities: string;

  @ApiProperty()
  @IsNotEmpty()
  dayOfWeek: string;

  @ApiProperty()
  @IsNotEmpty()
  fromDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  toDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  remarks: string;
}
