import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";
import { DateTime } from 'luxon';
import { AppModule } from "./app.module";


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: "http://localhost:3000",
    credentials: true,

  });


  Date.prototype.toJSON = function () {
    return DateTime.fromJSDate(this).toLocaleString(DateTime.DATETIME_SHORT);
  };
  
app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle("Absence API")
    .setDescription("Absence, Jounals and Users Maker Api")
    .setVersion("1.0")
    .addBearerAuth({
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
      name: "Authorization",
      in: "header",
    }, "access-token")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);



  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Server is running on port http://localhost:${port}`);
}

bootstrap().then();
