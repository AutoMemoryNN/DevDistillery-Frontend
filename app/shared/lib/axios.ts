import type { AxiosInstance } from 'axios';
import axios from 'axios';

import cookies from 'js-cookie';

/**
 * AxiosSingleton is a singleton class that provides a single instance of Axios with predefined configurations and interceptors.
 */
class AxiosSingleton {
	private static instance: AxiosSingleton;

	private axiosInstance: AxiosInstance;

	private constructor() {
		this.axiosInstance = this.buildAxiosInstance();

		this.addInterceptors();
	}

	/**
	 * Creates and configures an Axios instance with predefined settings.
	 *
	 * @returns A new Axios instance configured with the base URL
	 * from the environment variable `VITE_BACKEND_URL`
	 * and a timeout of 1500 milliseconds.
	 */
	private buildAxiosInstance(): AxiosInstance {
		return axios.create({
			baseURL: import.meta.env.VITE_BACKEND_URL,
			timeout: 1500,
		});
	}

	/**
	 * Adds interceptors to the Axios instance to handle
	 * the Authorization header.
	 */
	private addInterceptors(): void {
		this.axiosInstance.interceptors.request.use((config) => {
			const token = cookies.get('session');

			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}

			return config;
		});

		this.axiosInstance.interceptors.request.use((config) => {
			if (config.url) {
				const [url, query] = config.url.split('?');

				if (!url.endsWith('/')) {
					config.url = `${url}/`;
				}

				if (query) {
					config.url = `${config.url}?${query}`;
				}

				return config;
			}

			return config;
		});
	}

	/**
	 * Returns the single instance of AxiosSingleton.
	 *
	 * @returns The single instance of AxiosSingleton.
	 */
	public static getInstance(): AxiosSingleton {
		if (!AxiosSingleton.instance) {
			AxiosSingleton.instance = new AxiosSingleton();
		}

		return AxiosSingleton.instance;
	}

	/**
	 * Returns the Axios instance.
	 *
	 * @returns The Axios instance.
	 */
	public getAxiosInstance(): AxiosInstance {
		return this.axiosInstance;
	}
}

const axiosInstance = AxiosSingleton.getInstance().getAxiosInstance();

export { axiosInstance as axios };
