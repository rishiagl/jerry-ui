export const callExternalApi = async (config) => {
  let data
  let error
  try {
    const response = await fetch(config.url, {
      method: config.method,
      headers: config.headers,
    });
    data = await response.json();
  }
  catch(e) {
    console.log(e)
    error = e
  }

  return {
    data: data,
    error: ""
  }
}

export const callExternalApiWithBody = async (config) => {
  let data
  let error
  try {
    const response = await fetch(config.url, {
      method: config.method,
      body: config.body,
      headers: config.headers,
    });
    data = await response.json();
  }
  catch(e) {
    console.log(e)
    error = e
  }

  return {
    data: data,
    error: ""
  }
}