import { Body,Controller,Delete,Get,Param,Post,ValidationPipe } from '@nestjs/common';
import { JournalService } from './journal.service';
import { CreateJournalDto } from '../dtos/create-journal.dto';
import { JournalEntity } from 'src/entities/journal.entity';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';


// http://localhost:3001/api/journals
@Controller('journals')
@ApiTags("Journals")
@ApiSecurity('access-token')
export class JournalController {
  constructor(private journalService: JournalService) {}


  @Post()
  async createJournal(@Body(ValidationPipe) data: CreateJournalDto) {
    const createdJournal = await this.journalService.createJournal(data);
    return createdJournal;
  }

  @Get("admin")
  async findAllJournals(): Promise<JournalEntity[]> {
    return await this.journalService.findAllJournals();
  }

  @Get('admin/:id')
  async getJournalById(@Param('id') id: number) {
    return await this.journalService.getJournalById(id);
  
  }

  @Delete(':id')
  async deleteJournal(@Param('id') id: number) {
    return await this.journalService.delete(id);
  }
}
