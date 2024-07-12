import Feedback from "../model/feedbackModel.js"; // Adjust the path as per your project structure
import asyncHandler from 'express-async-handler'
// Function to get all feedback entries
const getAllFeedback = asyncHandler(async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Function to create new feedback entry
const createFeedback = asyncHandler(async (req, res) => {
    try {
        const { rating, feedbackDescription } = req.body;
        const newFeedback = new Feedback({ rating, feedbackDescription });
        const savedFeedback = await newFeedback.save();
        res.status(201).json(savedFeedback);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Function to delete a feedback entry by ID
const deleteFeedback = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const deletedFeedback = await Feedback.findByIdAndDelete(id);
        if (!deletedFeedback) {
            throw new Error('Feedback not found');
        }
        res.status(200).json({ message: 'Feedback deleted successfully' });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});
// Function to get counts of feedback based on rating categories
const getFeedbackCounts = asyncHandler(async (req, res) => {
    try {
        const negativeCount = await Feedback.countDocuments({ rating: { $in: [1, 2] } });
        const neutralCount = await Feedback.countDocuments({ rating: 3 });
        const positiveCount = await Feedback.countDocuments({ rating: { $in: [4, 5] } });
        res.status(200).json({
            negativeFeedbackCount: negativeCount,
            neutralFeedbackCount: neutralCount,
            positiveFeedbackCount: positiveCount
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default { getAllFeedback, createFeedback, deleteFeedback, getFeedbackCounts };