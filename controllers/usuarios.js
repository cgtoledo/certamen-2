import { Router } from 'express';
import { authMiddleware } from '../middleware/valmidle.js'
import { login, logout } from '../repositories/authen.js'

import { loginSchema } from '../schemas/valido.js'

const router = Router();


router.post("/login", async (req, res) => {

    try {
        const pass = loginSchema.validateSync(req.body, { stripUnknown: true, strict: true });
       let user = await login(pass.username, pass.password);

        res.send(user);
    } catch (ex) {
        res.status(401).send();
    }
})

router.post("/logout", authMiddleware, (req, res) => {
    const authorizationToken = req.get('x-authorization')

    const a = logout(authorizationToken);

    if (a === 'no ex') {
        return res.status(401).send()
    }
    if (a === 'ok') {
        return res.status(204).send()
    }

})
export default router