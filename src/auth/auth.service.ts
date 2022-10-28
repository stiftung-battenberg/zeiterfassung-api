import {Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';


@Injectable()
export class AuthService {
  constructor(@InjectRepository(UserEntity) private repo: Repository<UserEntity> ) {}

  //Create new user
  async createUser(data: any): Promise<UserEntity> {
    return await this.repo.save(data);
  }

  //find on by some condition
  async findOne(condition: any): Promise<UserEntity> {
    return await this.repo.findOne(condition);
  }
  


  //get all users
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.repo.find();
  }

  //Delete user by id
  async deleteUserById(id: number): Promise<UserEntity> {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) { throw new NotFoundException('user you are trying to delete is not found') }
    return await this.repo.remove(user);
  }

  //get user by id
  async getUserById(id: number): Promise<UserEntity> {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) { throw new NotFoundException('User not found') }
    return user;
  }

  //reset password
  async resetPassword(email: string, password: string): Promise<UserEntity> {
    const user = await this.repo.findOne({ where: { email } });
    if (!user) { throw new NotFoundException('User not found') }
    user.password = password;
    return await this.repo.save(user);
  }

  //forgot password
  async forgotPassword(email: string): Promise<UserEntity> {
    const user = await this.repo.findOne({ where: { email } });
    if (!user) { throw new UnauthorizedException('Invalid credentials') } 
    return user;
  }

  //update user
  async updateUser(id: number, data: Partial<UserEntity>): Promise<UserEntity> {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) { throw new NotFoundException('User not found') }
    Object.assign(user, data);
    return await this.repo.save(user);
  }

}
