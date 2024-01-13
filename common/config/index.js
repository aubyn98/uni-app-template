export const Dev = {
	baseURL: 'https://mp.api.360hwj.com'
}

export const Pro = {
	baseURL: 'https://mp.api.360hwj.com',
}

export const ENUMS = {
	TOKEN_KEY: 'x-fronted-token',
}

export default process.env.NODE_ENV === 'development' ? Dev : Pro