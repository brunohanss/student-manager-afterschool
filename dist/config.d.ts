declare const _default: {
    api: {
        port: string;
        root: string;
        useSwagger: boolean;
        useCompression: boolean;
    };
    frontEnd: {
        domain: string;
    };
    auth: {
        jwt: {
            accessTokenSecret: string;
            refreshTokenSecret: string;
            accessTokenLife: number;
            refreshTokenLife: number;
        };
        resetPassword: {
            secret: string;
            ttl: number;
            algorithm: string;
            inputEncoding: string;
            outputEncoding: string;
        };
    };
    db: {
        url: string;
        name: string;
    };
    logger: {
        console: {
            level: string;
        };
        file: {
            logDir: string;
            logFile: string;
            level: string;
            maxsize: number;
            maxFiles: number;
        };
    };
};
export default _default;
