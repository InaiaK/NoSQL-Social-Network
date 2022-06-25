const { Schema, model, Types } = require ("mongoose");
const dateFormat = require ("../utils/dateFormat");

const ReactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            // set to a new ObjID
            default: () => new Types.ObjectId(),
        },
        reactionBody:{
            type: String,
            required: true,
            maxlength: 280,
        },
        username:{
            type:Date,
            //set value to current timestamp
            default:Date.now,
            //user get to format the timestamp
            get: (timestamp) => dateFormat(timestamp),
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

const ThoughtSchema = new Schema (
    {
        thoughtText:{
            type: String,
            required: true, // message ?? 
            minlength:1,
            maxlength: 280,
        },
        createdAt: {
            type:Date,
            default:Date.now,
            //user get to format the timestamp
            get: (timestamp) => dateFormat(timestamp),
        },
        username: {
            type: String,
            required: true,
        },
        // replies
        reactions:[ReactionSchema]
    },
    {
        toJSON:{
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

ThoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;