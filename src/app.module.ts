import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { JournalModule } from './journal/journal.module';
import { AbsenceModule } from './absence/absence.module';
import { AuthModule } from './auth/auth.module';


const ormOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '992563Ah',
  database: 'zeiterfassung',
  autoLoadEntities: true,
  synchronize: true,
};

@Module({
  imports: [
    TypeOrmModule.forRoot(ormOptions), 
    JournalModule,
    AbsenceModule, 
    AuthModule,
    MailerModule.forRoot({
      transport: {
        host: "smtp.sendgrid.net",
        port: 587,
        auth: { 
          user: "apikey", 
          pass: "provide send grid password here!"//smtp password
        },
      },
      defaults: { from: "provider default email here" },//default email
    }),

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
