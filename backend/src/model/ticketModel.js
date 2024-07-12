import mongoose, { Schema } from "mongoose"
const ticketModel = new Schema({
    ticketId: {
        type: Number,
        required: true
    },
    ticketSubject: {
        type: String,
        required: true
    },
    ticketDescription: {
        type: String
    },
    ticketType: {
        type: String,
        required: true
    },
    ticketPriority: {
        type: String,
        required: true
    },
    ticketRequester: {
        type: String,
        required: false
    },
    ticketCreationDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    ticketDueDate: {
        type: Date,
        required: false
    },
    ticketClosingDate: {
        type: Date

    },
    ticketSolvedDate: {
        type: Date

    },
    ticketStatus: {
        type: String

    }
},
    {
        timestamps: true
    }
)

export default mongoose.model('ticket', ticketModel)