import qs from 'qs'
import { tr } from 'zod/locales'

export const BASE_URL = 'http://localhost:1337'

const QUERY_HOMEPAGE = {
	populate: {
		sections: {
			on: {
				"layout.hero-section": {
					populate: {
						image: {
							fields: ["url", "alternativeText"]
						},
						link: {
							populate: true
						}
					}
				}
			}
		}
	}
}

export async function getHomePage() {
	'use cache'

	const query = qs.stringify(QUERY_HOMEPAGE)
	const res = await getDataStrapi(`/api/home-page?${query}`)
	return res?.data
}

export async function getDataStrapi(url: string) {
	try {
		const res = await fetch(`${BASE_URL}${url}`)
		if (!res.ok) {
			throw new Error(`HTTP error status: ${res.status}`)
		}
		const data = await res.json()
		return data
	} catch (error) {
		console.error(`Error Fetching data: ${error}`)
		return null
	}
}

export async function registerUserService(userData: object){
	const url = `${BASE_URL}/api/auth/local/register`

	try {
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		})

		const data = await res.json()
		return data
	} catch (error) {
		console.error(`Error registering user: ${error}`)
		throw error
	}
}

export async function loginUserService(userData: object){
	const url = `${BASE_URL}/api/auth/local`

	try {
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		})

		const data = await res.json()
		return data
	} catch (error) {
		console.error(`Error login user: ${error}`)
		throw error
	}
}