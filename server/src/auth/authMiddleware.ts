import { Elysia } from 'elysia'


export const authMiddleware = new Elysia()
	.onBeforeHandle({ as: 'global' }, ({ cookie, path }) => {
		console.log({cookie, path})
	})

    export default authMiddleware