enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

type TOptions = {
  method: METHOD;
  data?: unknown;
  timeout?: number;
};

type TData = Record<string, string>;

// Тип Omit принимает два аргумента: первый — тип, второй — строка
// и удаляет из первого типа ключ, переданный вторым аргументом
// Omit<TOptions, 'method'>;
// Этот тип эквивалентен следующему:
// type OptionsWithoutMethod = { data?: any };

type HTTPMethod = (url: string, options?: Omit<TOptions, 'method'>) => Promise<unknown>

function queryStringify(data: TData) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  // Здесь достаточно и [object Object] для объекта
  const keys = Object.keys(data);

  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

export default class HTTPTransport {
  get: HTTPMethod = (url, options = {}) => (
    this.request(url, {...options, method: METHOD.GET})
  )

  post: HTTPMethod = (url, options = {}) => (
    this.request(url, {...options, method: METHOD.POST})
  )

  put: HTTPMethod = (url, options = {}) => (
    this.request(url, {...options, method: METHOD.PUT})
  )

  delete: HTTPMethod = (url, options = {}) => (
    this.request(url, {...options, method: METHOD.DELETE})
  )

  request(url: string, options: TOptions = { method: METHOD.GET, timeout: 5000 }): Promise<XMLHttpRequest> {
    const {method, data, timeout} = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      let dataObj;
      let isGet = false;

      if (method === METHOD.GET && data) {
        isGet = true;
        dataObj = data as TData;
      }

      xhr.open(
        method,
        isGet && !!dataObj
          ? `${url}${queryStringify(dataObj)}`
          : url,
      );

      xhr.onload = function() {
        if (xhr.status != 200) {
          reject(JSON.parse(xhr.response).reason);
        } else {
          try {
            resolve(JSON.parse(xhr.response));

            return true;
          } catch {
            resolve(xhr);
          }
        }
      };

      xhr.withCredentials = true;

      xhr.onabort = reject;
      xhr.onerror = reject;

      if (typeof timeout === "number") {
        xhr.timeout = timeout;
      }

      xhr.ontimeout = reject;

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
          xhr.send(data);
      } else {
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(data as Document | XMLHttpRequestBodyInit | null | undefined);
      }
    });
  };
}
