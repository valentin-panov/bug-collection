import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { decodeURL } from "@utils/url-parse";
import { getClientCSRF } from "@utils/cookie-parse-client-side";
import {
  aws_session_token,
  dynatrace_internal_token,
  stripe_api_key,
} from "@data/constants";

class BaseService {
  BASE_URL = `${process.env.BASE_URL}api`;
  url: string;
  instance: AxiosInstance;
  stripeApiKey: string = stripe_api_key;
  awsSessionToken: string = aws_session_token;
  dynatraceInternalToken: string = dynatrace_internal_token;

  /**
   * Creates the URL string used for all requests
   * @param {string} path - the URL path to append to the base URL
   * @param {string} reactFlow - header to identify the React flow the request is being made from
   * @param {string} specificDomain - override base url if flow use specific domain for call
   */
  constructor(
    private path: string,
    private reactFlow: string,
    private specificDomain?: string
  ) {
    this.BASE_URL = this.specificDomain ? this.specificDomain : this.BASE_URL;
    this.url =
      this.path.length > 0 ? `${this.BASE_URL}/${this.path}` : this.BASE_URL;
    this.instance = axios.create({
      baseURL: this.BASE_URL,
      withCredentials: true,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "react-flow": `${this.reactFlow}`,
        "STRIPE-API-KEY": `${this.stripeApiKey}`,
      },
    });

    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (
          typeof window !== "undefined" &&
          error.response?.status === 401 &&
          error.response?.data?.retUrl
        ) {
          window.location.href = decodeURL(error.response?.data?.retUrl);
          return;
        }
        // eslint-disable-next-line consistent-return
        return Promise.reject(error);
      }
    );
  }

  /**
   * GET request on URL created when instantiating the base service (+ optional suffix path)
   * @param {string} path - path to add to the URL
   * @return {Promise<AxiosResponse<T>>} - API response
   */
  get<T>(path?: string): Promise<AxiosResponse<T>> {
    return this.instance.get(path ? `${this.url}${path}` : this.url);
  }

  /**
   * POST request on URL created when instantiating the base service (+ optional suffix path)
   * @param {string} path - path to add to the URL
   * @param {URLSearchParams} body - the request body
   * @param {AxiosRequestConfig} config - the request config
   * @return {Promise<AxiosResponse<T>>} - API response
   */
  post<T>(
    path?: string,
    body: URLSearchParams = new URLSearchParams({
      aws_session_token: this.awsSessionToken,
    }),
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    body.append("csrf", getClientCSRF());
    return this.instance.post(
      path ? `${this.url}/${path}` : this.url,
      body,
      config
    );
  }

  /**
   * PUT request on URL created when instantiating the base service (+ optional suffix path)
   * @param {string} path - path to add to the URL
   * @param {URLSearchParams} body - the request body
   * @param {AxiosRequestConfig} config - the request config
   * @return {Promise<AxiosResponse<T>>} - API response
   */
  put<T>(
    path: string,
    body: URLSearchParams = new URLSearchParams({
      dynatrace_internal_token: this.dynatraceInternalToken,
    }),
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.put(
      path ? `${this.url}/${path}` : this.url,
      body,
      config
    );
  }

  /**
   * DELETE request on URL created when instantiating the base service (+ optional suffix path)
   * @param {string} path - path to add to the URL
   * @param {AxiosRequestConfig} config - the request config
   * @return {Promise<AxiosResponse<T>>} - API response
   */
  delete<T>(
    path: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.delete(
      path ? `${this.url}/${path}` : this.url,
      config
    );
  }
}

export default BaseService;
