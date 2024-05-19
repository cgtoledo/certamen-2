import { users } from '../repositories/authen.js'


export function authMiddleware(req, res, next) {

	const authorizationToken = req.get('x-authorization')

	if (!authorizationToken) {
		return res.status(401).send
        ({ error: 'El Token de autorización no enviado' })
	}

	const user = users.find(user => user.token === authorizationToken)
	if (!user) {
		return res.status(401).send
        ({ error: 'el token es invalido' })
	}
     next()
}