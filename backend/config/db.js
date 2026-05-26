
import mongoose from 'mongoose';
const uri = "mongodb+srv://pratiik_raghav:Raghukul@raghav.ac8ectp.mongodb.net/lodasur?appName=Raghav";

async function run() {
  try {
    await mongoose.connect(uri);

    console.log('MongoDB Connected');
  } catch (error) {
    console.log(error);
  }
}

export default run;