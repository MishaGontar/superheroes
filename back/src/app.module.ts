import { Module } from "@nestjs/common";
import { SuperheroesModule } from "./superheroes/superheroes.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "uploads"),
      serveRoot: "/uploads/",
    }),
    SuperheroesModule,
  ],
})
export class AppModule {}
