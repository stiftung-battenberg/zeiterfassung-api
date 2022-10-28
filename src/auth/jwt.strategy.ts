import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(UserEntity) private userRepo: Repository<UserEntity>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      egnoreExpiration: false,
      //TODO: this should be exacly the same to the secret in auth.module.ts
      secretOrKey: "secretThatNOBodyCanGuess",

      
    });
  }

  async validate(payload: any): Promise<UserEntity> {
    const { sub } = payload;
    return await this.userRepo.findOne({ where: { id: sub } });
  }
}
