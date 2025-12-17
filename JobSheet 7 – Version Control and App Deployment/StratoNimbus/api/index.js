import serverless from 'serverless-http';
import app from '../src/app.js';

// Export handler compatible with Vercel serverless functions
export default serverless(app);
