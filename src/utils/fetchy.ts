// Requests and retrieves API calls 

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export type BodyT = string | number | boolean | null | BodyT[] | { [key: string]: BodyT };

/**
 * A wrapper around fetch that handles errors and alerts the messages to the user.
 *
 * @param url The url to fetch from
 * @param method The HTTP method to use
 * @param options.query The query parameters to add to the url
 * @param options.body The body to send
 * @param options.alert Whether to alert the user of the response message (default: true)
 * @returns The response body
 * @throws An error if the response is not ok
 */
export async function fetchy(
  url: string,
  method: HttpMethod,
  options?: {
    query?: Record<string, string>;
    body?: BodyT;
    alert?: boolean;
  },
) {
  options = options ?? {};
  options.alert = options.alert ?? true;

  const queryString = new URLSearchParams(options.query).toString();
  const fullUrl = `${url}?${queryString}`;

  if ((method === "GET" || method === "DELETE") && options.body) {
    throw new Error(`Cannot have a body with a ${method} request`);
  }

  const fetchOptions: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      credentials: "same-origin",
    },
  };

  if (options.body) {
    fetchOptions.body = JSON.stringify(options.body);
  }

  const response = await fetch(fullUrl, fetchOptions);
  const result = await response.json();
  console.log("fetchy response", response, result);

  if (!response.ok) {
    throw new Error(result.msg ?? "Something went wrong");
  }

  return result;
}

export async function sendRequest(url: string) {
  const proxy = "https://cors-anywhere.herokuapp.com/";
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}