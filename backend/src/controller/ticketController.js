import Ticket from '../model/ticketModel.js'
import asyncHandler from 'express-async-handler'

const searchTicketById = asyncHandler(async (req, res) => {
    const id = req.params.id
    const tickets = await Ticket.findOne({ "ticketId": id })
    if (!tickets) {
        throw new Error(`Ticket id ${id} not found`)
    }
    res.status(200).json(tickets)
})

const getAllTickets = asyncHandler(async (req, res) => {
    const tickets = await Ticket.find()
    res.status(200).json(tickets)
})

// const searchContactsByName=async()=>{
   
// }

const getOpenTicketCount = asyncHandler(async (req, res) => {
    const openTicketCount = await Ticket.countDocuments({ ticketStatus: 'Open' });
    res.status(200).json({ count: openTicketCount });
})

const getSolvedTicketCount = asyncHandler(async (req, res) => {
    const solvedTicketCount = await Ticket.countDocuments({ ticketStatus: 'Solved' });
    res.status(200).json({ count: solvedTicketCount });
});


const getClosedTicketCount = asyncHandler(async (req, res) => {
    const closedTicketCount = await Ticket.countDocuments({ ticketStatus: 'Closed' });
    res.status(200).json({ count: closedTicketCount });
});

const getPendingTicketCount = asyncHandler(async (req, res) => {
    const pendingTicketCount = await Ticket.countDocuments({ ticketStatus: 'Pending' });
    res.status(200).json({ count: pendingTicketCount });
});

const getTicketCreatedCountOnParticularMonth =asyncHandler( async (req, res) => {
    try {
        // Extract year and month from query parameters
        const month = req.params.month;
        if (!month) {
            return res.status(400).json({ message: 'Month is required' });
        }
        // Ensure month is a number
        const monthNumber = parseInt(month, 10);
        // Validate month range
        if (monthNumber < 1 || monthNumber > 12) {
            return res.status(400).json({ message: 'Month must be between 1 and 12' });
        }
        // Use MongoDB's aggregation framework to count tickets by month
        const ticketsCount = await Ticket.aggregate([
            {
                $addFields: {
                    parsedDate: { $toDate: '$ticketCreationDate' }
                }
            },
            {
                $project: {
                    month: { $month: '$parsedDate' }
                }
            },
            {
                $match: {
                    month: monthNumber
                }
            },
            {
                $count: 'count'
            }
        ]);
        // If no tickets found, return count as 0
        if (ticketsCount.length === 0) {
            return res.json({ count: 0 });
        }
        // Return the count
        res.json({ count: ticketsCount[0].count });

        console.log(count)

        console.log("Querying with:", {
            ticketCreationDate: {
                $gte: startDate,
                $lte: endDate
            }
        });

        res.json({ month: monthNumber, year: year, count: count });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});


const getTicketClosedCountOnParticularMonth =asyncHandler( async (req, res) => {
    try {
        // Extract year and month from query parameters
        const month = req.params.month;
        if (!month) {
            return res.status(400).json({ message: 'Month is required' });
        }
        // Ensure month is a number
        const monthNumber = parseInt(month, 10);
        // Validate month range
        if (monthNumber < 1 || monthNumber > 12) {
            return res.status(400).json({ message: 'Month must be between 1 and 12' });
        }
        // Use MongoDB's aggregation framework to count tickets by month
        const ticketsCount = await Ticket.aggregate([
            {
                $addFields: {
                    parsedDate: { $toDate: '$ticketClosingDate' }
                }
            },
            {
                $project: {
                    month: { $month: '$parsedDate' }
                }
            },
            {
                $match: {
                    month: monthNumber
                }
            },
            {
                $count: 'count'
            }
        ]);
        // If no tickets found, return count as 0
        if (ticketsCount.length === 0) {
            return res.json({ count: 0 });
        }
        // Return the count
        res.json({ count: ticketsCount[0].count });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

const getLowTicketViolatedCount = asyncHandler(async (req, res) => {
    try {
        // Construct the aggregation pipeline to find low priority tickets violating SLA
        const violatedTicketsCount = await Ticket.aggregate([
            {
                $match: {
                    ticketPriority: 'Low', // Assuming 'ticketPriority' field indicates ticket priority
                    $or: [
                        { 
                            $and: [
                                { ticketClosingDate: { $exists: true } },
                                { ticketClosingDate: { $gt: '$ticketDueDate' } }
                            ]
                        },
                        {
                            $and: [
                                { ticketClosingDate: null },
                                { ticketStatus: { $ne: 'Closed' } }
                            ]
                        }
                    ]
                    // Add other conditions as needed
                }
            },
            {
                $count: 'count'
            }
        ]);

        // If no violated tickets found, return count as 0
        if (violatedTicketsCount.length === 0) {
            return res.json({ count: 0 });
        }

        // Return the count of violated low priority tickets
        res.json({ count: violatedTicketsCount[0].count });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});



const getLowTicketNonViolatedCount = asyncHandler(async (req, res) => {
    try {
        const nonViolatedTicketsCount = await Ticket.aggregate([
            {
                $match: {
                    ticketPriority: 'Low',
                    $or: [
                        {
                            $and: [
                                { ticketClosingDate: { $exists: true } },
                                { $expr: { $lte: ['$ticketClosingDate', '$ticketDueDate'] } }
                            ]
                        },
                        {
                            $and: [
                                { ticketClosingDate: null },
                                {
                                    $or: [
                                        { 
                                            $and: [
                                                { ticketStatus: 'Closed' },
                                                { $expr: { $lte: ['$ticketSolvedDate', '$ticketDueDate'] } }
                                            ]
                                        },
                                        { 
                                            $and: [
                                                { ticketStatus: { $ne: 'Closed' } },
                                                { $expr: { $gte: ['$ticketDueDate', new Date()] } }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            },
            {
                $count: 'count'
            }
        ]);

        if (nonViolatedTicketsCount.length === 0) {
            return res.json({ count: 0 });
        }

        res.json({ count: nonViolatedTicketsCount[0].count });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});



const getHighTicketViolatedCount = asyncHandler(async (req, res) => {
    try {
        // Construct the aggregation pipeline to find low priority tickets violating SLA
        const violatedTicketsCount = await Ticket.aggregate([
            {
                $match: {
                    ticketPriority: 'High', // Assuming 'ticketPriority' field indicates ticket priority
                    $or: [
                        { 
                            $and: [
                                { ticketClosingDate: { $exists: true } },
                                { ticketClosingDate: { $gt: '$ticketDueDate' } }
                            ]
                        },
                        {
                            $and: [
                                { ticketClosingDate: null },
                                { ticketStatus: { $ne: 'Closed' } }
                            ]
                        }
                    ]
                    // Add other conditions as needed
                }
            },
            {
                $count: 'count'
            }
        ]);

        // If no violated tickets found, return count as 0
        if (violatedTicketsCount.length === 0) {
            return res.json({ count: 0 });
        }

        // Return the count of violated low priority tickets
        res.json({ count: violatedTicketsCount[0].count });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});




const getHighTicketNonViolatedCount = asyncHandler(async (req, res) => {
    try {
        const nonViolatedTicketsCount = await Ticket.aggregate([
            {
                $match: {
                    ticketPriority: 'High',
                    $or: [
                        {
                            $and: [
                                { ticketClosingDate: { $exists: true } },
                                { $expr: { $lte: ['$ticketClosingDate', '$ticketDueDate'] } }
                            ]
                        },
                        {
                            $and: [
                                { ticketClosingDate: null },
                                {
                                    $or: [
                                        { 
                                            $and: [
                                                { ticketStatus: 'Closed' },
                                                { $expr: { $lte: ['$ticketSolvedDate', '$ticketDueDate'] } }
                                            ]
                                        },
                                        { 
                                            $and: [
                                                { ticketStatus: { $ne: 'Closed' } },
                                                { $expr: { $gte: ['$ticketDueDate', new Date()] } }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            },
            {
                $count: 'count'
            }
        ]);

        if (nonViolatedTicketsCount.length === 0) {
            return res.json({ count: 0 });
        }

        res.json({ count: nonViolatedTicketsCount[0].count });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});


const getMediumTicketViolatedCount = asyncHandler(async (req, res) => {
    try {
        // Construct the aggregation pipeline to find low priority tickets violating SLA
        const violatedTicketsCount = await Ticket.aggregate([
            {
                $match: {
                    ticketPriority: 'Medium', // Assuming 'ticketPriority' field indicates ticket priority
                    $or: [
                        { 
                            $and: [
                                { ticketClosingDate: { $exists: true } },
                                { ticketClosingDate: { $gt: '$ticketDueDate' } }
                            ]
                        },
                        {
                            $and: [
                                { ticketClosingDate: null },
                                { ticketStatus: { $ne: 'Closed' } }
                            ]
                        }
                    ]
                    // Add other conditions as needed
                }
            },
            {
                $count: 'count'
            }
        ]);

        // If no violated tickets found, return count as 0
        if (violatedTicketsCount.length === 0) {
            return res.json({ count: 0 });
        }

        // Return the count of violated low priority tickets
        res.json({ count: violatedTicketsCount[0].count });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

const getMediumTicketNonViolatedCount = asyncHandler(async (req, res) => {
    try {
        const nonViolatedTicketsCount = await Ticket.aggregate([
            {
                $match: {
                    ticketPriority: 'Medium',
                    $or: [
                        {
                            $and: [
                                { ticketClosingDate: { $exists: true } },
                                { $expr: { $lte: ['$ticketClosingDate', '$ticketDueDate'] } }
                            ]
                        },
                        {
                            $and: [
                                { ticketClosingDate: null },
                                {
                                    $or: [
                                        { 
                                            $and: [
                                                { ticketStatus: 'Closed' },
                                                { $expr: { $lte: ['$ticketSolvedDate', '$ticketDueDate'] } }
                                            ]
                                        },
                                        { 
                                            $and: [
                                                { ticketStatus: { $ne: 'Closed' } },
                                                { $expr: { $gte: ['$ticketDueDate', new Date()] } }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            },
            {
                $count: 'count'
            }
        ]);

        if (nonViolatedTicketsCount.length === 0) {
            return res.json({ count: 0 });
        }

        res.json({ count: nonViolatedTicketsCount[0].count });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});


const getUrgentTicketViolatedCount = asyncHandler(async (req, res) => {
    try {
        // Construct the aggregation pipeline to find low priority tickets violating SLA
        const violatedTicketsCount = await Ticket.aggregate([
            {
                $match: {
                    ticketPriority: 'Urgent', // Assuming 'ticketPriority' field indicates ticket priority
                    $or: [
                        { 
                            $and: [
                                { ticketClosingDate: { $exists: true } },
                                { ticketClosingDate: { $gt: '$ticketDueDate' } }
                            ]
                        },
                        {
                            $and: [
                                { ticketClosingDate: null },
                                { ticketStatus: { $ne: 'Closed' } }
                            ]
                        }
                    ]
                    // Add other conditions as needed
                }
            },
            {
                $count: 'count'
            }
        ]);

        // If no violated tickets found, return count as 0
        if (violatedTicketsCount.length === 0) {
            return res.json({ count: 0 });
        }

        // Return the count of violated low priority tickets
        res.json({ count: violatedTicketsCount[0].count });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

const getUrgentTicketNonViolatedCount = asyncHandler(async (req, res) => {
    try {
        const nonViolatedTicketsCount = await Ticket.aggregate([
            {
                $match: {
                    ticketPriority: 'Urgent',
                    $or: [
                        {
                            $and: [
                                { ticketClosingDate: { $exists: true } },
                                { $expr: { $lte: ['$ticketClosingDate', '$ticketDueDate'] } }
                            ]
                        },
                        {
                            $and: [
                                { ticketClosingDate: null },
                                {
                                    $or: [
                                        { 
                                            $and: [
                                                { ticketStatus: 'Closed' },
                                                { $expr: { $lte: ['$ticketSolvedDate', '$ticketDueDate'] } }
                                            ]
                                        },
                                        { 
                                            $and: [
                                                { ticketStatus: { $ne: 'Closed' } },
                                                { $expr: { $gte: ['$ticketDueDate', new Date()] } }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            },
            {
                $count: 'count'
            }
        ]);

        if (nonViolatedTicketsCount.length === 0) {
            return res.json({ count: 0 });
        }

        res.json({ count: nonViolatedTicketsCount[0].count });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

export default {
    searchTicketById, getAllTickets, getOpenTicketCount,
    getClosedTicketCount, getPendingTicketCount, getSolvedTicketCount,
    getTicketCreatedCountOnParticularMonth,
    getTicketClosedCountOnParticularMonth,getLowTicketViolatedCount,
    getLowTicketNonViolatedCount,getHighTicketViolatedCount,
    getHighTicketNonViolatedCount,getMediumTicketViolatedCount,
    getMediumTicketNonViolatedCount,getUrgentTicketViolatedCount,
    getUrgentTicketNonViolatedCount
};