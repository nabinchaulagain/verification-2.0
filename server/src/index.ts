import logger from '@/utils/logger.js';
import express from 'express';

const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
 logger.info(`Server is running on http://localhost:${PORT}`);
});
