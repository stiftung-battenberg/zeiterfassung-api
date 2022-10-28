import {Body,Controller,Delete,Get,Param,Post,ValidationPipe } from '@nestjs/common';
import { AbsenceService } from './absence.service';
import { CreateAbsenceDto } from "../dtos/create-absence.dto";
import { AbsenceEntity } from "../entities/absence.entity";
import { ApiSecurity, ApiTags } from '@nestjs/swagger';


// http://localhost:3001/api/absences
@Controller('absences')
@ApiTags("Absences")
@ApiSecurity('access-token')
export class AbsenceController {
  constructor(private absenceService: AbsenceService) {}

  // http POST verb
  @Post()
  async createAbsence(@Body(ValidationPipe) data: CreateAbsenceDto) {
    const createdAbsence = await this.absenceService.createAbsence(data);
    return createdAbsence;

  }

  @Get('admin')
  async findAllAbsences(): Promise<AbsenceEntity[]> {
    const creadedAbsence = await this.absenceService.findAllAbsences();
    return creadedAbsence;
  }
  
  @Get('admin/:id')
  async getAbsenceById(@Param('id') id: number) {
    const absence = await this.absenceService.getAbsenceById(id);
    return absence
  
  }

  @Delete(':id')
  async deleteAbsence(@Param('id') id: number) {
    return await this.absenceService.deleteAbsence(id);
  }
}
