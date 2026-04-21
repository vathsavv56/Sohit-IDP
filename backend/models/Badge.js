import mongoose from 'mongoose';

const badgeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String, // e.g., 'Trophy', 'Star', 'Medal' - mapped to lucide icons on frontend
      required: true,
    },
    color: {
      type: String, // e.g., 'text-amber-500'
      default: 'text-indigo-500', 
    },
    criteria: {
      type: String,
    },
    awardedTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Badge = mongoose.model('Badge', badgeSchema);
export default Badge;
