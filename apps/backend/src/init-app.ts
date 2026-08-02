import "reflect-metadata";
import {
    CoreModule,
    CoreConfigurationService,
} from "@darraghor/nest-backend-libs";
import { MainModule } from "./main.module.js";
import { synchronizeConfiguredAdminUsers } from "./auth/auth.js";

CoreModule.initApplication(
    MainModule,
    async (app) => {
        const configService: CoreConfigurationService = app.get(
            CoreConfigurationService,
        );

        await synchronizeConfiguredAdminUsers();
        await app.listen(configService.webPort, "0.0.0.0");
    },
    {
        bodyParser: false,
        preMiddleware: (app) => {
            const configService = app.get(CoreConfigurationService);
            app.enableCors({
                origin: [configService.frontEndAppUrl],
                credentials: true,
            });
        },
    },
);
