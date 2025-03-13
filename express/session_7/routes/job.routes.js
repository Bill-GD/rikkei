import express from 'express';
import JobController from '../controllers/job.controller.js';

const router = express.Router();

router.get('/', JobController.getAll);

router.get('/:id', JobController.getOne);

router.post('/', JobController.createOne);

router.put('/:id', JobController.updateOne);

router.delete('/:id', JobController.deleteOne);

export default router;
