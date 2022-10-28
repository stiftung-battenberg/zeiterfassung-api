import {BadRequestException,Body,Controller,Delete,Get,HttpCode,Param,Patch,Post,Put,Req,Res,UnauthorizedException, ValidationPipe } from '@nestjs/common';
import { Response, Request } from 'express';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { AuthService } from './auth.service';
import { UserEntity } from '../entities/user.entity';
import { RegisterUserDto } from 'src/dtos/registerUser.dto';
import { LoginUserDto } from 'src/dtos/login-user.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';


//http://zeiterfassung-api.bit.ch/api/users
@Controller('users')
@ApiTags("Users")
@ApiSecurity('access-token')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}



  //get current logged in user from jwt token
  //http://zeiterfassung-api.bit.ch/api/users/user

  @Get('user')
  async getCurentUser(@Req() req: Request) {
    try {
      const cookie = req.cookies['JwtToken'];
      if (!cookie) {throw new UnauthorizedException('No token provided')}
      const data = await this.jwtService.verifyAsync(cookie);
      const user = await this.authService.findOne({ where: { id: data.sub } });
      if (!user) { throw new UnauthorizedException('Invalid token')}
      delete user.password;
      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }



  //http://zeiterfassung-api.bit.ch/api/users/admin/register
  @Post('admin/register')
    async createUser(@Body(ValidationPipe) body: RegisterUserDto): Promise<UserEntity> {
      const salt = await bcrypt.genSalt(12);
      const hashed = await bcrypt.hash(body.password, salt);
      body.password = hashed;
      return await this.authService.createUser(body);
    }

//http://zeiterfassung-api.bit.ch/api/users/user/register
  @Post('user/register')
  async registerUser(@Body(ValidationPipe) body: RegisterUserDto): Promise<UserEntity> {
    const salt = await bcrypt.genSalt(12);
    const hashed = await bcrypt.hash(body.password, salt);
    body.password = hashed;
    return await this.authService.createUser(body);
  }

  //http://zeiterfassung-api.bit.ch/api/users/login
  @Post('login')
  @HttpCode(200)
  async loginUser(@Body() loginDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response ): Promise<any> {
    const user = await this.authService.findOne({ where: { email: loginDto.email } });
    if (!user) { 
      throw new BadRequestException('Invalid credentials') 
    }
    const isMatch = await bcrypt.compare(loginDto.password, user.password);
    if (!isMatch) { 
      throw new BadRequestException('Invalid credentials') 
    }
    const token = await this.jwtService.signAsync({
      username: user.email, 
      sub: user.id,
    });
    res.cookie('JwtToken', token, {
      httpOnly: true, 
    });
    return token;
  }

  
  
  //http://zeiterfassung-api.bit.ch/api/users
  @Get()
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.authService.getAllUsers();
  }

  //http://zeiterfassung-api.bit.ch/api/users/admin/id
  @Get('admin/:id')
  getUserById(@Param('id') id: number) {
    return this.authService.getUserById(id);
  }

  //http://zeiterfassung-api.bit.ch/api/users/id
  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.authService.deleteUserById(id);
  }

  //http://zeiterfassung-api.bit.ch/api/users/logout
  @Post('logout')
  @HttpCode(200)
  async logoutUser(@Res({ passthrough: true }) res: Response): Promise<string> {
    res.clearCookie('JwtToken');
    return `You have been logged out successfully`;
  }

  //forgot password
  //http://zeiterfassung-api.bit.ch/api/users/forgot
  @Post('forgot')
  @HttpCode(200)
  async forgotPassword(@Body("email") email: string ): Promise<string> {
    const user = await this.authService.forgotPassword(email);
    const url: string = `http://localhost:3000/reset`;
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Reset Password',
      text: `To reset your password, please click the following link`,
      html: `Please click <a href="${url}">Reset Password</a> to reset your password`,
    });
    return `Password reset link has been sent to: ${user.email}. please check your email`;
  }

  //reset password
  //http://zeiterfassung-api.bit.ch/api/users/reset
  @Put('reset')
  @HttpCode(200)
  async resetPassword(@Body("email") email: string,
    @Body("password") password: string ) {
    const hashed = await bcrypt.hash(password, 12);
    const user = await this.authService.resetPassword(email, hashed);
    return `Password reset successfully for user: ${user.email}`;
  }

  //update user
  //http://zeiterfassung-api.bit.ch/api/users/id
  @Patch(':id')
  async updateUser(@Param('id') id: number, @Body() user: UserEntity) {
    const updatedUser = await this.authService.updateUser(id, user);
    //hash password
    const salt = await bcrypt.genSalt(12);
    const hashed = await bcrypt.hash(updatedUser.password, salt);
    updatedUser.password = hashed;
    return updatedUser;
  }
}
