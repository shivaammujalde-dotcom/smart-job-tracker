import express from 'express';
import protect from '../middleware/authMiddleware.js';
import {
  getDashboard,
  getMonthlyApplications,
  getConversionStats,
} from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/', protect, getDashboard);
router.get('/monthly', protect, getMonthlyApplications);
router.get("/conversion", protect, getConversionStats);



export default router;
