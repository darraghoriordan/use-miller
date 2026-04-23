import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CoreModule } from "@darraghor/nest-backend-libs";
import {
    createCoreConfig,
    createLoggerConfig,
} from "./config/library.config.js";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),

        CoreModule.forRootAsync({
            core: {
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: createCoreConfig,
            },
            logger: {
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: createLoggerConfig,
            },
        }),
    ],
    controllers: [],
    providers: [],
})
export class MainModule {}
