import express from 'express';
import {
  getAllExhibitions,
  getExhibitionById,
  createExhibition,
  updateExhibition,
  deleteExhibition
} from '../db/queries/exhibitions.js';

const router = express.Router();

// GET all
router.get('/', async (req, res, next) => {
  try {
    const exhibitions = await getAllExhibitions();
    res.json(exhibitions);
  } catch (err) {
    next(err);
  }
});

// GET one
router.get('/:id', async (req, res, next) => {
  try {
    const exhibition = await getExhibitionById(req.params.id);
    if (!exhibition) {
      res.status(404).json({ error: 'Exhibition not found' });
    } else {
      res.json(exhibition);
    }
  } catch (err) {
    next(err);
  }
});

// POST
router.post('/', async (req, res, next) => {
  try {
    const { name, location, start_date, end_date } = req.body;
    if (!name || !location || !start_date || !end_date) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newExhibition = await createExhibition({
      name,
      location,
      start_date,
      end_date
    });

    res.status(201).json(newExhibition);
  } catch (err) {
    next(err);
  }
});

// PUT
router.put('/:id', async (req, res, next) => {
  try {
    const updated = await updateExhibition(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// DELETE
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await deleteExhibition(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: 'Exhibition not found' });
    } else {
      res.json(deleted);
    }
  } catch (err) {
    next(err);
  }
});

export default router;
