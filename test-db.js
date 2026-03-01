const mongoose = require('mongoose');

const mongoUrl = process.env.NEXT_PUBLIC_MONGODB_URL || 'mongodb+srv://usmanashraf:rdbms1234@cluster0.yaudehg.mongodb.net/?appName=Cluster0';

console.log('Testing MongoDB connection...');
console.log('URL:', mongoUrl);

mongoose.connect(mongoUrl)
  .then(() => {
    console.log('✅ SUCCESS: Connected to MongoDB!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ FAILED: Could not connect to MongoDB');
    console.error('Error:', err.message);
    process.exit(1);
  });

// Timeout after 15 seconds
setTimeout(() => {
  console.error('⏱️ TIMEOUT: Connection attempt took too long');
  process.exit(1);
}, 15000);
