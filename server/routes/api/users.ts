const express = require('express')
const router = express.Router()
const usersController = require('../../controllers/usersController')
const ROLES_LIST = require('../../config/rolesList')
const verifyRoles = require('../../middleware/verifyRoles')

router
  .route('/')
  .get(usersController.getAllUsers)
  .post(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    usersController.createUser
  )
//   .put(
//     verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
//     usersController.updateEmployee
//   )
//   .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteEmployee)

// router.route('/:id').get(usersController.getEmployee)

module.exports = router
