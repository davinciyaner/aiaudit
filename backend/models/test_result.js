import mongoose from 'mongoose';

const stepResultSchema = new mongoose.Schema({
  step:         Number,
  action:       String,
  selector:     String,
  selectorType: String,
  value:        String,
  url:          String,
  timestamp:    String,
  meta:         String,
  optional:     { type: Boolean, default: false },
  result:       { type: String, enum: ['pass', 'fail', 'warn', 'skip'], default: 'skip' },
  error:        String,
  screenshot:   String,
  duration:     Number,
  attempts:     Number,
}, { _id: false });

const testResultSchema = new mongoose.Schema({
  userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name:      { type: String, default: 'Unbenannter Test' },
  csv:       String,
  status:    { type: String, enum: ['running', 'done', 'error'], default: 'running' },
  steps:     [stepResultSchema],
  summary: {
    total:    Number,
    passed:   Number,
    failed:   Number,
    duration: Number, // ms gesamt
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('TestResult', testResultSchema);