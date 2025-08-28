import { CronJob } from 'cron';

// A simple heartbeat job every minute to demonstrate cron wiring
const job = new CronJob('0 * * * * *', () => {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log(`[cron] heartbeat ${new Date().toISOString()}`);
  }
});

job.start();
