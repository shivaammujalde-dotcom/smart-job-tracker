import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
     user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        },
        company: {
            type: String,
            required: true,
        },
        role:{
            type: String,
            required: true,
        },
        status: {
  type: String,
  enum: ['Applied', 'Interview', 'Rejected', 'Hired'],
  default: 'Applied',
},
        notes: {
            type: String,
        },
        },
        { timestamps: true}
     );

export default mongoose.model('Job', jobSchema);
