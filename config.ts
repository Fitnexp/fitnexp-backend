const environment = process.env.NODE_ENV ?? 'development';

function getConfig() {
    let config: { PORT: number; MONGODB_URI: string } = {
        MONGODB_URI: 'mongodb://127.0.0.1:27017/fitnexp',
        PORT: 8080,
    };

    switch (environment) {
        case 'development':
            config = {
                MONGODB_URI: 'mongodb://127.0.0.1:27017/fitnexp',
                PORT: 8080,
            };
            break;
        case 'production':
            return config;
        case 'test':
            config = {
                MONGODB_URI: 'mongodb://127.0.0.1:27017/fitnexp-backend',
                PORT: 8080,
            };
            break;
        default:
            return config;
    }

    return config;
}

export default getConfig();
