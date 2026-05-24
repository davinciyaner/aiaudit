import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { runTest, getResult, listResults } from '../controllers/testController.js';
import { generatePDF } from '../controllers/pdfController.js';

const router = Router();

router.use(auth);

router.post('/run',      runTest);
router.get('/',          listResults);
router.get('/:id',       getResult);
router.get('/:id/pdf',   generatePDF);

export default router;