export const Dev = {
	baseURL: 'https://mp.api.360hwj.com'
}

export const Pro = {
	baseURL: 'https://mp.api.360hwj.com',
}

export const STORAGE_KEY_ENUMS = {
	token: 'x-fronted-token'
}

export default process.env.NODE_ENV === 'development' ? Dev : Pro