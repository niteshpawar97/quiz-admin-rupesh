const express = require('express');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const dotenv = require('dotenv');

const userRoutes = require('./routes/userRoutes');
const instituteRoutes = require('./routes/instituteRoutes');
const roleRoutes = require('./routes/roleRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const standardRoutes = require('./routes/standardRoutes');
const boardRoutes = require('./routes/boardRoutes');
const mediumRoutes = require('./routes/mediumRoutes');
const questionRoutes = require('./routes/questionRoutes');

const errorMiddleware = require('./middleware/errorMiddleware');
const logger = require('./utils/logger');
require('express-async-errors');  // Automatically catches async errors

dotenv.config();

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API for Quiz Admin',
            contact: {
                name: 'Rupesh Bhade',
                email: 'rupeshbhade@gmail.com'
            },
            servers: [
                {
                    url: 'http://localhost:3000',
                    description: 'Development server'
                }
            ]
        }
    },
    apis: ['./routes/*.js'] // This path tells swagger-jsdoc to scan your route files for API documentation
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
// app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// API routes
app.use('/api/v1/users', userRoutes);// TODO: users not working
app.use('/api/v1/roles', roleRoutes); // TODO: roles not working
app.use('/api/v1/institutes', instituteRoutes); // TODO: institutes working Now**
app.use('/api/v1/subjects', subjectRoutes);// TODO: subjects  working Now **
app.use('/api/v1/standards', standardRoutes);// TODO: standard working Now **
app.use('/api/v1/boards', boardRoutes);// TODO: boards working Now **
app.use('/api/v1/mediums', mediumRoutes);// TODO: medium not working
app.use('/api/v1/questions', questionRoutes);// TODO: medium not working

// Error handling middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});