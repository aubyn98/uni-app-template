export const Dev = {
	baseURL: 'http://192.168.41.187:88', // pz

	// baseURL: 'http://192.168.41.140:88', // fq

}

export const Pro = {
	baseURL: 'https://ft.360hwj.com',
}

export const STORAGE_KEY_ENUMS = {
	token: 'x-fronted-token'
}

export default process.env.NODE_ENV === 'development' ? Dev : Pro
