import axios, { AxiosResponse } from "axios";
import { Product } from "../models/product";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(async (response) => {
  try {
    await sleep(1000); // [CR 19-08-2023] This is for simulating a longer API response, right?
    return response;
  } catch (error) {
    console.log(error);
    return await Promise.reject(error); // [CR 19-08-2023] Think about a common erorrs support. What will happen if your API is offline? Will the app "nicely" crash? Maybe it would be nice if you can always display some kind of alert/popup if there's an unexpected error?
  }
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

// [CR 19-08-2023] It's always nice to create wrappers for small stuff like axios. You can read more about that here: https://www.codejourney.net/how-and-why-to-wrap-external-libraries/
const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Products = {
  // [CR 19-08-2023] What will happen if the structure of your Product changes in C# side, but forgets to update the Product.ts model? For example, someone renames "price" to "currentPrice". What will happen with your code? Will it still work correctly?
  list: () => requests.get<Product[]>("/products"),
  details: (id: string) => requests.get<Product>(`/products/${id}`),
  create: (product: Product) => axios.post<void>("/products", product),
  update: (product: Product) =>
    axios.put<void>(`/products/${product.id}`, product),
  delete: (id: string) => axios.delete<void>(`/products/${id}`),
};

const agent = {
  Products,
};

export default agent;
