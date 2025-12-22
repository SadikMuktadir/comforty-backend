import app from './app';

import dotenv from 'dotenv';

dotenv.config();

function server() {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`);
  });
}
server();
