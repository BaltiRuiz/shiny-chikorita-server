import axios from "axios";

import { LogLevel } from "../enums/logging.enums";

export class LoggingService {
    public logMessage(logLevel: LogLevel, message: string) {
        message = message.trim();

        console.log(`[${logLevel}]: ${message}`);

        axios.post(
            "http://localhost:9000/log",
            { logLevel, message },
        );
    }
}
