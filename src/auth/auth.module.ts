import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserEntity } from "../entities/user.entity";
import { JwtStrategy } from "./jwt.strategy";


@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      //TODO: this should be exacly the same to the secret in jwt.strategy.ts
      secret: "secretThatNOBodyCanGuess",
      signOptions: {
        algorithm: "HS512",
        expiresIn: "1d",
      }
    }),
    PassportModule.register({defaultStrategy: 'jwt'}),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {
}
