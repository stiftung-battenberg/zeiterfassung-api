import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbsenceEntity } from '../entities/absence.entity';
import { CreateAbsenceDto } from '../dtos/create-absence.dto';
import { UserEntity } from '../entities/user.entity';


@Injectable()
export class AbsenceService {
  constructor(@InjectRepository(AbsenceEntity) private repo: Repository<AbsenceEntity> ) {}

  async getAllAbsences(user: UserEntity) {
    const query = this.repo.createQueryBuilder('absence');
    query.where(`absence.userId = :userId`, { userId: user.id });
    try {
      return await query.getMany();
    } catch (err) {
      throw new NotFoundException('No absence found please create one');
    }
  }

  async findAllAbsences(): Promise<AbsenceEntity[]> {
    return await this.repo.find();
  }

  async getAbsenceById(id: number) {
    return await this.repo.findOne({ where: { id } });
  }

  async createAbsence(absenceDto: CreateAbsenceDto ) {
    const creadedAbsence = this.repo.create(absenceDto);
    try {
      return await this.repo.save(creadedAbsence);
    } catch (err) {
      throw new InternalServerErrorException('Absence data were not created.');
    }
  }


  async deleteAbsence (id: number): Promise<AbsenceEntity> {
    const result = await this.repo.findOne({ where: { id } });
    if (!result) { throw new NotFoundException('Absence not found') }
    return await this.repo.remove(result);
  }
}
