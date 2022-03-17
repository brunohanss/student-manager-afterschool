"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const logger_service_1 = require("./core/logger.service");
const config_1 = require("./config");
const morgan = require("morgan");
const compression = require("compression");
function initSwagger(app) {
    const options = new swagger_1.DocumentBuilder()
        .setTitle("Nest Node Starter API")
        .setDescription("API description")
        .setVersion("1.0")
        .addBearerAuth("Authorization", "header")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup("swagger", app, document);
}
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule, {
            logger: new logger_service_1.WinstonLogger(),
            cors: true,
        });
        app.use(morgan("dev"));
        if (config_1.default.api.useSwagger) {
            initSwagger(app);
        }
        if (config_1.default.api.useCompression) {
            app.use(compression());
        }
        yield app.listen(config_1.default.api.port);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map