import express from 'express'
import ticketApi from '../controller/ticketController.js'

const router = express.Router()

const {searchTicketById, getAllTickets,getOpenTicketCount,
    getClosedTicketCount,getPendingTicketCount,
    getSolvedTicketCount,getTicketCreatedCountOnParticularMonth,
    getTicketClosedCountOnParticularMonth,getLowTicketViolatedCount,
    getLowTicketNonViolatedCount,getHighTicketViolatedCount,getHighTicketNonViolatedCount,
    getMediumTicketViolatedCount,getMediumTicketNonViolatedCount,
    getUrgentTicketViolatedCount,getUrgentTicketNonViolatedCount
} = ticketApi

router.route('/').get(getAllTickets)
router.route('/:id').get(searchTicketById)
router.route('/open/count').get(getOpenTicketCount)
router.route('/pending/count').get(getPendingTicketCount)
router.route('/closed/count').get(getClosedTicketCount)
router.route('/solved/count').get(getSolvedTicketCount)
router.route('/createdcount/:month').get(getTicketCreatedCountOnParticularMonth)
router.route('/closedcount/:month').get(getTicketClosedCountOnParticularMonth)
router.route('/low/violated/count').get(getLowTicketViolatedCount)
router.route('/low/nonviolated/count').get(getLowTicketNonViolatedCount)
router.route('/medium/violated/count').get(getMediumTicketViolatedCount)
router.route('/medium/nonviolated/count').get(getMediumTicketNonViolatedCount)
router.route('/high/violated/count').get(getHighTicketViolatedCount)
router.route('/high/nonviolated/count').get(getHighTicketNonViolatedCount)
router.route('/urgent/violated/count').get(getUrgentTicketViolatedCount)
router.route('/urgent/nonviolated/count').get(getUrgentTicketNonViolatedCount)

export default router