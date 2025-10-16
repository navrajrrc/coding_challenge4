import express, { Router } from "express";
import { getUserProfile, deleteUser } from "../controllers/userController";
import authenticate from "../middleware/authentication";
import isAuthorized from "../middleware/authorize";

const router: Router = express.Router();

/** Route to get the user's profile - requires authentication */
router.get(
    "/profile",
    authenticate,
    isAuthorized({ hasRole: ["admin"], allowSameUser: true}),
    getUserProfile
);

/** Route to delete a user - requires authentication and admin role */
router.delete("/:id", 
    authenticate,
    isAuthorized({ hasRole: ["admin"], allowSameUser: true}),
    deleteUser
);

export default router;