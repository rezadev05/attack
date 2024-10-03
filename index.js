require("dotenv").config();
const axios = require("axios");
const moment = require("moment-timezone");

async function callAPI(data) {
  try {
    const response = await axios.get(
      "https://api.inshopmall.vip/api/user/do_register",
      data
    );
    console.log(response.data);
  } catch (error) {
    console.error(error.response.data);
  }
}

async function executeRequests() {
  const data1 = new URLSearchParams();
  data1.append("tel", "0826787879kljkl");
  data1.append("pwd", "Jancok453555@");
  data1.append("paypassword", "Jancok453555@");
  data1.append("invite_code", "383432");

  const data2 = new URLSearchParams();
  data2.append("tel", "0826787879808huh");
  data2.append("pwd", "Jancok453555@");
  data2.append("paypassword", "Jancok453555@");
  data2.append("invite_code", "383432");

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
