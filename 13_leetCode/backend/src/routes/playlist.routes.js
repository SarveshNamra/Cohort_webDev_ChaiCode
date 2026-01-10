import express from "express";
import { authMiddlewre } from "../middleware/auth.middleware.js";
import { addProblemToPlaylist, createPlaylist, deletePlaylist, getAllListDetails, getPlayListDetails, removeProblemFromPlaylist } from "../controllers/playlist.controllers.js";

const playlistRoutes = express.Router();

playlistRoutes.get("/", authMiddlewre, getAllListDetails);

playlistRoutes.get("/:playlistId", authMiddlewre, getPlayListDetails);

playlistRoutes.post("/create-playlist", authMiddlewre, createPlaylist);

playlistRoutes.post("/:playlistId/add-problem", authMiddlewre, addProblemToPlaylist);

playlistRoutes.delete("/:playlistId", authMiddlewre, deletePlaylist);

playlistRoutes.delete("/:playlistId/remove-problem", authMiddlewre, removeProblemFromPlaylist);

export default playlistRoutes;