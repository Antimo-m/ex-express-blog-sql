import express from "express"

import postController from "../controller/postController.js"
const router = express.Router();

//ora andremo a creare le nostre rotte CRUD

//index
router.get(`/`, postController.index)

//show
router.get (`/:id`, postController.show)


//store
router.post(`/`, postController.store)

//update
router.put(`/:id`, postController.update)

//modify
router.patch(`/:id`, postController.modify)


//destroy
router.delete(`/:id`, postController.destroy)

export default router