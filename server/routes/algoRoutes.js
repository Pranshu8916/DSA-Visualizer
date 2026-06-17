import express from 'express';
import { listAlgorithms, getAlgorithm } from '../controllers/algoController.js';

const router = express.Router();

router.get('/', listAlgorithms);
router.get('/:id', getAlgorithm);

export default router;
