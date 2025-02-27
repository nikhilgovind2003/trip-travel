import express from 'express'
import { addReview, getReview, deleteReview, updateReview } from '../controllers/review.Controller.js'
import { isAdmin } from '../middlewares/roleMiddleware.js'
const router = express.Router()

router.post("/add-review", addReview)
router.get("/get-reviews", getReview)
router.delete("/delete-reviews", isAdmin(true), deleteReview)
router.patch("/update-reviews", isAdmin(true), updateReview)

export default router