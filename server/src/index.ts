import logger from '@/utils/logger';
import express from 'express';
import cors from 'cors';
import verificationRoutes from '@/modules/verification/route';
import defaultErrorHandler from '@/middlewares/defaultErrorHandler';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use(verificationRoutes);

app.use(defaultErrorHandler);

app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
