export const callExternalApi = async(config) => {
    let data = null;
    let error = "";
    await fetch(config.url, {
      method: config.method,
      body: config.body,
      headers: config.headers
    })
      .then((response) => response.json())
      .then((d) => {
        data = d;
      })
      .catch((err) => {
        console.log(err.message);
        error = err
      });

      return {
        data: data,
        error: error,
      };
  }