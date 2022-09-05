import morgan from "morgan";

import { DIKeys } from "../ioc/ioc.enums";
import { AppContainerInstance } from "../ioc/ioc.init";

import { LogLevel } from "../enums/logging.enums";

import { LoggingService } from "../log/loggingService";

const stream = {
    write: (message: string) => {
        const loggingService: LoggingService = AppContainerInstance.getContainerItem(
            DIKeys.LoggingService,
        );

        loggingService.logMessage(LogLevel.HTTP, message);
    }
}

export const morganMiddleware = morgan(
    ":remote-addr | :method | :url | :status | :res[content-length] B | :response-time ms | [:date[web]]",
    { stream },
);
