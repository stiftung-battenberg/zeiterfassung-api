import { Module } from "@nestjs/common";
import { JournalController} from "./journal.controller";
import { JournalService } from "./journal.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JournalEntity } from "../entities/journal.entity";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([JournalEntity]),
    AuthModule
  ],
  controllers: [JournalController],
  providers: [JournalService]
})
export class JournalModule {}
