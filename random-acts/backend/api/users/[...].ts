import { createRouter, useBase, defineEventHandler} from "h3";
import createHandler from '../../events/users/create'
import getAllUsers from '../../events/users/list'
import getUserById from '../../events/users/read'
import updateUserById from '../../events/users/update'
import removeUserById from '../../events/users/remove'

const router = createRouter()

router.get('/list', getAllUsers)

router.post('/create', createHandler )
router.get('/:id', getUserById)
router.put('/:id', updateUserById)
router.delete('/:id', removeUserById)



export default useBase('/api/users', router.handler)
