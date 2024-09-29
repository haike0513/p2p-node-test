import axios from "axios";
export interface PostJobOption {
  user: string;
}
const DISPATCHER_URL = 'http://18.136.124.172:3000';



export const randomTag = () => {
  return "";
};

export const randomPrompt = () => {
  return "What is AI?";
};


export const randomJobType = () => {

  const opmlType = {
      type: "opml",
      user: "b77f1799de0148c07bc6ef630fb75ac267f31d147cd28797ad145afe7230opml",
  }
  const teeType = {
    type: "tee",
    user: "b77f1799de0148c07bc6ef630fb75ac267f31d147cd28797ad145afe72302tee",
}
return teeType;
};

export async function postJob(option?: PostJobOption) {
  const tag = randomTag();
  const prompt = randomPrompt();
  const jobType = randomJobType();


  const submitJob = {
    "from": "haike0513@gmail.com",
    "tag": tag,
    "user": jobType.user,
    "job": {
        "tag": jobType.type,
        "prompt": prompt,
        "model": "ss",
        "params": {
            "temperature": 1.0,
            "top_p": 0.5,
            "max_tokens": 1024
        }
    },
    "verify": "haike0513@gmail.com"
  };
  const rs = await axios.post(`${DISPATCHER_URL}/api/job/submit`, submitJob);
  return rs;
}
