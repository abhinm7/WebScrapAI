require('dotenv').config({ path: '../../.env' });
const { Worker } = require('bullmq');
const { connection } = require('./queue.js');
const puppeteer = require('puppeteer');
const { fetchTask, updateTask } = require('../db/queries.js');
const fetchWebContent = require('./webscrapper.js');

const worker = new Worker('tasks', async (job) => {
  const { url, question } = job.data;
  console.log(url, question)

  // Change the task status > Proccessing
  await updateTask(job.id, { status: 'processing' });
  console.log(`Processing job ${job.id}`);

  //scrape the data from web url
  const content = fetchWebContent(url);

  console.log('content', content);

  const answer = `
Question: ${question}
Based on website content:
${content.slice(0, 500)}...
`;
  updateTask(job.id, { status: 'compeleted', answer, })

  return true;
}, {
  connection,
  concurrency: 1,
})

worker.on('ready', () => {
  console.log('Worker is connected and ready to process jobs.');
});

worker.on('completed', async (job, result) => {
  console.log("hello")
  const data = await fetchTask(job.id)
  console.log("job:", data, "::", result)
})

worker.on('error', (err) => {
  console.error('Worker connection error:', err);
});