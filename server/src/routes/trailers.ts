import express from 'express';
import { GenericDAO } from '../models/generic.dao';
import { Trailer } from '../models/trailer';

const router = express.Router();

router.get('/', async (req, res) => {
  const trailerDAO: GenericDAO<Trailer> = req.app.locals.trailerDAO;
  const trailers = await trailerDAO.findAll();
  res.json({ results: trailers });
});

export default router;
