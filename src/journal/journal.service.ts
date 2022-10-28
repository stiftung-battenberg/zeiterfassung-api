import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JournalEntity } from '../entities/journal.entity';
import { Repository } from 'typeorm';
import { CreateJournalDto } from '../dtos/create-journal.dto';



@Injectable()
export class JournalService {
  constructor(@InjectRepository(JournalEntity) private repo: Repository<JournalEntity> ) {}


//get all journals
  async findAllJournals(): Promise<JournalEntity[]> {
    return await this.repo.find();
  }

  //get journal by id 
  async getJournalById(id: number) {
    return await this.repo.findOne({ where: { id } });
  }

  //create journal
  async createJournal(journalDto: CreateJournalDto) {
    const createdJournal = this.repo.create(journalDto);
    if (!createdJournal) {
      throw new InternalServerErrorException('Journal data were not created.');
    }
    try {
      return await this.repo.save(createdJournal);
    } catch (err) {
      throw new InternalServerErrorException('Journal data were not created.');
    }
  }

  //delete journal
  async delete(id: number): Promise<JournalEntity> {
    const result = await this.repo.findOne({ where: { id } });
    if (!result) {
      throw new NotFoundException('Journal not found');
    }
    return await this.repo.remove(result);
  }
}
