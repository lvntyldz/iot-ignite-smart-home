import * as config from 'MgrConfig';

export const _POST = "POST";
export const _GET = "GET";

export const doFetch = (url, params, timeout = config.HTTP_REQUEST_TIMEOUT) => {

  const fetchUrl = config.API_BASE_URL + url;

  return {
    header: (headers) => {
      return doHeader(headers, fetchUrl, params, timeout);
    },
    default: () => {
      return doHeader(null, fetchUrl, params, timeout);
    }
  }
}

export const doHeader = (headers, url, params, timeout) => {

  const fetchOptions = {
    method: 'GET',
    headers: {}
  }

  console.info("headers : ", headers);

  if (headers !== null) {
    fetchOptions.headers = headers;
  }

  return {
    json: () => {
      fetchOptions.headers['Accept'] = 'application/json';
      fetchOptions.headers['Content-Type'] = 'application/json';

      console.info("doFetch::fetchOptions : ", fetchOptions);

      return doRequest(url, fetchOptions, params, timeout)
    },
    formData: () => {
      fetchOptions.headers['Content-Type'] = 'application/x-www-form-urlencoded';

      let formData = [];
      for (let property in params) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(params[property]);
        formData.push(encodedKey + "=" + encodedValue);
      }
      formData = formData.join("&");

      console.info(formData);
      return doRequest(url, fetchOptions, formData, timeout).post(false);
    }
  }
}

export const doRequest = (url, fetchOptions, params, timeout) => {
  return {
    get: () => {
      fetchOptions.method = _GET;
      return fetchWrapper(url, fetchOptions, timeout);
    },
    post: (json = true) => {
      console.info("json : ", json);

      fetchOptions.method = _POST;
      fetchOptions.body = JSON.stringify(params);

      if (json === false) {
        fetchOptions.body = params;
      }

      console.info("fetchOptions : ", fetchOptions);

      return fetchWrapper(url, fetchOptions, timeout);
    }
  }
}

export const fetchWrapper = (url, fetchOptions, timeout) => {

  return fetchTimeOut(timeout, fetch(url, fetchOptions))
    .then(response => {
      console.info("converting response to JSON... data : ", response);
      return response.json();
    })
    .then((responseJson) => {
      console.info("api JSON response  : ", responseJson);
      return responseJson;
    }).catch((error) => {
      console.error("something went wrong while http request! error : ", error);
    });
}

export const fetchTimeOut = (timeOutMs, promise) => {

  return new Promise(((resolve, reject) => {
    setTimeout(() => {
      reject({
        status: "Request timeout",
        code: 408
      });
    }, timeOutMs); // setTimeout

    promise.then(resolve, reject);
  })); // Promise

} // fetchTimeOut
