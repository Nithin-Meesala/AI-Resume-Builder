import mongoose, { Schema } from "mongoose";

// Define subdocument schemas
const skillSchema = new Schema({
  name: { type: String, required: true },
  rating: { type: Number, min: 0, max: 5 }
});

const experienceSchema = new Schema({
  workTitle: { type: String, required: true },
  companyName: { type: String, required: true },
  city:{ type: String, required: true },
  state:{ type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String },
  workSummary: { type: String }
});

const projectSchema = new Schema({
  projectTitle: { type: String, required: true },
  projectDescription: { type: String }
});

const educationSchema = new Schema({
  universityName: { type: String, required: true },
  degree: { type: String, required: true },
  major: { type: String },
  startDate: { type: String, required: true },
  endDate: { type: String },
  score:{type:String},
  description: { type: String }
});

// Define main schema
const resumeSchema = new Schema({
  title: { type: String, required: true },
  resumeid: { type: String },
  userEmail: { type: String },
  userName: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  address: { type: String },
  jobTitle: { type: String },
  email: { type: String },
  phone: { type: String },
  summary: { type: String },
  // Array of subdocuments
  experience: [experienceSchema],
  projects: [projectSchema],
  education: [educationSchema],
  skills: [skillSchema],
  themeColor: { type: String },
  linkedinusername: { type: String },
  linkedinurl: { type: String },
  githubusername: { type: String },
  githuburl: { type: String },
  showLinkedIn: { type: Boolean },
  showGitHub: { type: Boolean },
});

const Resume = mongoose.model("Resume", resumeSchema);

export { Resume };
