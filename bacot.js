require("dotenv").config();

const axios = require("axios");
const moment = require("moment-timezone");

async function callAPI(data) {
  try {
    const response = await axios.post(process.env.ENDPOINT_TRX, data);
    console.log(response.data);
  } catch (error) {
    console.error(error.response.data);
  }
}

async function executeRequests() {
  const data1 = new URLSearchParams();
  data1.append("key", process.env.API_KEY);
  data1.append("sign", process.env.SIGN);
  data1.append("type", "order");
  data1.append("service", process.env.CODE_PRODUCT_1);
  data1.append("data_no", process.env.TARGET_NUMBER_1);

  const data2 = new URLSearchParams();
  data2.append("key", process.env.API_KEY);
  data2.append("sign", process.env.SIGN);
  data2.append("type", "order");
  data2.append("service", process.env.CODE_PRODUCT_2);
  data2.append("data_no", process.env.TARGET_NUMBER_2);

  try {
    await Promise.allSettled([callAPI(data1), callAPI(data2)]);
    console.log("Kedua permintaan telah selesai dieksekusi secara bersamaan.");
  } catch (error) {
    console.error(
      "Gagal mengeksekusi kedua permintaan secara bersamaan:",
      error
    );
  }
}

const targetDate = moment.tz(process.env.TIME_HIT, "Asia/Jakarta");
const interval = setInterval(updateCountdown, 1000);

function updateCountdown() {
  const currentDate = moment.tz(moment(), "Asia/Jakarta");
  const timeUntilTargetDate = targetDate - currentDate;

  if (timeUntilTargetDate > 0) {
    const duration = moment.duration(timeUntilTargetDate);
    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();
    const seconds = duration.seconds();
    console.log(
      `Countdown: ${hours} hours ${minutes} minutes ${seconds} seconds`
    );
  } else {
    clearInterval(interval);
    console.log(
      "Waktu hitung mundur sudah habis. Menjalankan panggilan API..."
    );
    executeRequests();
  }
}
