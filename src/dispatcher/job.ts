import axios from 'axios';
import dayjs from 'dayjs';
export interface PostJobOption {
  user: string;
}

function getRandomInt(min: number, max: number) {
  // min = Math.ceil(min);
  // max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const randomOneOfArray = <T>(all: T[]): T => {
  const index = getRandomInt(0, all.length - 1);
  return all[index];
};
const DISPATCHER_URL = 'http://18.136.124.172:3000';

export const randomTag = () => {
  return randomOneOfArray(['', '', '']);
};

export const randomPrompt = () => {
  const time = dayjs().format(`YYYY-MM-DD HH:mm:ss`);
  return randomOneOfArray([
    `What is the year of ${time}`,
    `What is the month of ${time}`,
  ]);
};

export const randomJobType = () => {
  const opmlType = {
    model: 'ss',
    type: 'opml',
    user: 'b77f1799de0148c07bc6ef630fb75ac267f31d147cd28797ad145afe7230opml',
    params: {
      temperature: 1.0,
      top_p: 0.5,
      max_tokens: 1024,
    },
  };
  const teeType = {
    model: 'ss',
    type: 'tee',
    user: 'b77f1799de0148c07bc6ef630fb75ac267f31d147cd28797ad145afe72302tee',
    params: {
      temperature: 1.0,
      top_p: 0.5,
      max_tokens: 1024,
    },
  };

  const zkMLType = {
    model: '2l_relu_fc',
    type: 'tee',
    user: 'b77f1799de0148c07bc6ef630fb75ac267f31d147cd28797ad145afe72302tee',
    params: {
      // temperature: 1.0,
      // top_p: 0.5,
      // max_tokens: 1024,
      proof_path: 'https://raw.githubusercontent.com/d5c5ceb0/t/main/proof.json',
    },
  };
  return randomOneOfArray([teeType, opmlType, zkMLType]);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function postJob(option?: PostJobOption) {
  const tag = randomTag();
  const prompt = randomPrompt();
  const jobType = randomJobType();

  const submitJob = {
    from: 'haike0513@gmail.com',
    tag: tag,
    user: jobType.user,
    job: {
      tag: jobType.type,
      prompt: prompt,
      model: 'ss',
      params: {
        temperature: 1.0,
        top_p: 0.5,
        max_tokens: 1024,
      },
    },
    verify: 'haike0513@gmail.com',
  };
  const rs = await axios.post(`${DISPATCHER_URL}/api/job/submit`, submitJob);
  return rs;
}
