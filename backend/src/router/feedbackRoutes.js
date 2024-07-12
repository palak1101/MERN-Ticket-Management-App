import express from 'express';
import feedbackApi from '../controller/feedbackController.js'

const { getAllFeedback, createFeedback, deleteFeedback, getFeedbackCounts } = feedbackApi

const router = express.Router();

// Routes for Feedback operations

router.route('/').get(getAllFeedback).post(createFeedback); 
router.route('/:id').delete(deleteFeedback); 
router.route('/counts').get(getFeedbackCounts); 

export default router;
