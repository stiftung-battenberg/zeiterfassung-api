import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AbsenceController } from "./absence.controller";
import { AbsenceService } from "./absence.service";
import { AbsenceEntity } from "../entities/absence.entity";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([AbsenceEntity]),
    AuthModule
  ],
  controllers: [AbsenceController],
  providers: [AbsenceService]
})
export class AbsenceModule {}
