import mongoose from 'mongoose';

const FormSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String },
  companyName: String,
  industry: String,
  companySize: String,
  jobTitle: String,
}, { timestamps: true });

export default mongoose.models.Form || mongoose.model('Form', FormSchema);
