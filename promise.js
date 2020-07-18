const timeout = 1500;

console.log("Outside the promise");
const fetchDataCallback = (num, callback, errorCallback) => {
  setTimeout(() => {
    if (num > 0) {
      callback("Success");
    } else {
      errorCallback("Error");
    }
  }, timeout);
};

const fetchDataPromise = (num) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (num > 0) {
        resolve("Success");
      } else {
        reject("Error");
      }
    }, timeout);
  });
  return promise;
};

const callbackExample = (num) => {
  fetchDataCallback(
    num,
    (res) => {
      console.log("Callback success", res);
    },
    (err) => {
      console.log("Callback error", err);
    }
  );
};

const promiseExample = (num) => {
  fetchDataPromise(num)
    .then((res) => {
      console.log("Promise res", res);
      return res;
    })
    .catch((err) => {
      console.log("Promise err", err);
    });
};

const asyncExample = async (num) => {
  console.log("Inside Async func");
  let succ, error;
  try {
    const result = await fetchDataPromise(num);
    succ = result;
    console.log("Async res", result);
  } catch (err) {
    error = err;
    console.log("Async err", err);
  }
  console.log("succ", succ);
  console.log("error", error);
  console.log("After Res");
};

asyncExample(5);
