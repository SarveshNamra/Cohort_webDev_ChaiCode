import { Router } from "express";
import {validateProjectPermission} from "../middleware/auth.middleware.js";
import { AvailableUserRole, UserRolesEnum } from "../utils/constants.js";
import { createNote, deleteNote, getNoteById, getNotes, updateNote } from "../controllers/note.controllers.js";

const router = Router()

router.route("/:projetId")
    .get(
        validateProjectPermission(AvailableUserRole),
        getNotes)
    .post(
        validateProjectPermission([UserRolesEnum.ADMIN]),
        createNote)

router.route("/:projectId/n/:noteId")
        .get(validateProjectPermission(AvailableUserRole),
        getNoteById)
        .put(validateProjectPermission([UserRolesEnum.ADMIN]),
        updateNote)
        .delete(validateProjectPermission([UserRolesEnum.ADMIN]),
        deleteNote)

export default router