const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API documentation for Quiz Admin',
            contact: {
                name: 'Rupesh Bhade',
                email: 'rupeshbhade@gmail.com',
            },
        },
        servers: [
            {
                url: 'http://localhost:3000', // Change to your server URL
                description: 'Development server',
            },
        ],
    },
    apis: ['./routes/*.js'], // Path to your route files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = swaggerDocs;