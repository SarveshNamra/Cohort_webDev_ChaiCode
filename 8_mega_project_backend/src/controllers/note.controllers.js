import mongoose from "mongoose";
import { ProjectNote } from "../models/note.models.js";
import { Project } from "../models/project.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";

const getNotes = async (req,res) => {
    // get all notes
    const {projetId} = req.params;

    const project = await Project.findById(projetId);
    if(!project){
        throw new ApiError(404, "Project not found")
    }

    const notes = await ProjectNote.find({
        project: new mongoose.Types.ObjectId(projetId),
    }).populate("createdBy", "username fullname avatar")    // By using populate we can access another schema from presect schema. Like here we are we are
                                                            // in 'projectNoteSchema' in note.models where, from 'createdBy' property by it's > ref: "User" <
                                                            // we can move to 'userSchema' and can access it's propertys.
    return res.status(200).json(
        new ApiResponse(200, notes, "Notes fetched successfully")
    )                
};

const getNoteById = async (req, res) => {
    // get note by id
    const {noteId} = req.params

    const note = await ProjectNote.findById(noteId).populate("createdBy", "username fullname avatar")
    if(!note){
        throw new ApiError(404, "Note not found");
    }

    return res.status(200).json(new ApiResponse(200, note, "Note fetched successfully"))
}

const createNote = async (req, res) => {
    // create note
    const {projetId} = req.params
    const {content} = req.body

    const project = await Project.findById(projetId);

    if(!project){
        throw new ApiError(404, "Project not found");
    }

    const note = ProjectNote.create({
        project: new mongoose.Types.ObjectId(projetId),
        content,
        createdBy: new mongoose.Types.ObjectId(req.user._id),
    })

    const populatedNote = await ProjectNote.findById(note._id).populate("createdBy", "username fullname avater")

    return res.status(200).json(new ApiResponse(200, populatedNote, "Created note successfully"))
}

const updateNote = async (req, res) => {
    // update note
    const {noteId} = req.params
    const {content} = req.body

    const exsistingNote = await ProjectNote.findById(noteId)
    if(!exsistingNote){
        throw new ApiError(404, "Note not found");
    }

    const note = await ProjectNote.findByIdAndUpdate(noteId, {content}, {new: true}).populate("createdBy", "username fullname avater")

    return res.status(200).json(new ApiResponse(200, note, "Updated note successfully"))
}

const deleteNote = async (req, res) => {
    // delete note
    const {noteId} = req.params

    const note = await ProjectNote.findByIdAndDelete(noteId)

    if(!note){
        throw new ApiError(404, "Note not found")
    }

    return res.status(200).json(new ApiResponse(200, note, "Note deleted successfully"))
}

export { createNote, deleteNote, getNoteById , getNotes, updateNote};