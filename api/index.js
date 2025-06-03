import express from 'express';
import piecesRouter from './art-pieces.js';
import exhibitionsRouter from './exhibitions.js';

const router = express.Router();

router.use('/art-pieces', piecesRouter);
router.use('/exhibitions', exhibitionsRouter);

export default router;