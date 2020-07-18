console.log("Outside the promise");
const fetchDataCallback = (num, callback, errorCallback) => {
  if (num > 0) {
    setTimeout(() => {
      callback("Success");
    }, 1000);
  } else {
    setTimeout(() => {
      errorCallback("Error");
    }, 1000);
  }
};
fetchDataCallback(
  4,
  (res) => {
    console.log("Callback success ", res);
  },
  (err) => {
    console.log("Callback error ", err);
  }
);

const fetchDataPromise = (num) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (num > 0) {
        resolve("Success");
      } else {
        reject("Error");
      }
    }, 1000);
  });
  return promise;
};

fetchDataPromise(5)
  .then((res) => {
    console.log("Promise res ", res);
  })
  .catch((err) => {
    console.log("Promise err ", err);
  });
