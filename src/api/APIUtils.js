const getCityTemps = (ids, unit = 'metric') =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/group?id=${ids.join(
          ','
        )}&units=${unit}&appid=9578bce0efcfc3d25b7d3e3704490270`
      );

      if (!response.ok)
        reject(new Error(`${response.status} ${response.statusText}`));

      const body = await response.json();
      resolve(body);
    } catch (error) {
      reject(error);
    }
  });

export { getCityTemps };
