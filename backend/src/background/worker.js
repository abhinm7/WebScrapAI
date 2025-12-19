require('dotenv').config();
const { Worker } = require('bullmq');
const { connection } = require('./queue.js');
const puppeteer = require('puppeteer');
const { fetchTask, updateTask } = require('../db/queries.js');
const fetchWebContent = require('./webscrapper.js');
const generateAnswer = require('./gemini.js');

const worker = new Worker('tasks', async (job) => {

  const { url, question } = job.data;
  // Change the task status > Proccessing
  await updateTask(job.id, { status: 'processing' });

  //scrape the data from web url
  const content = await fetchWebContent(url);
  //generate answer using gemini API
  let answer;

  //generete answer using only if the content generated is not null
  if (content == null) {
    answer = "I am sorry, but the provided web content is null. Therefore, I cannot tell you what the website is for.";
  } else {
    answer = await generateAnswer(content, question);
  }

  updateTask(job.id, { status: 'completed', answer, })

  return true;

}, {
  connection,
  concurrency: 1,
})

worker.on('ready', () => {
  console.log('Worker is connected and ready to process jobs.');
});

worker.on('completed', async (job, result) => {
  const data = await fetchTask(job.id)
  console.log("\n\n\njob:", data, "\n\n\n")
})

worker.on('error', (err) => {
  console.error('Worker connection error:', err);
});