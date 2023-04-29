import { initTelemetry } from "./instrumentation.js";
initTelemetry();

import "reflect-metadata";
import { INestApplication } from "@nestjs/common";
import {
    CoreModule,
    CoreConfigurationService,
} from "@darraghor/nest-backend-libs";
import { MainModule } from "./main.module.js";

CoreModule.initApplication(MainModule, async (app: INestApplication) => {
    const configService: CoreConfigurationService = app.get(
        CoreConfigurationService
    );

    await app.listen(configService.webPort);
});
