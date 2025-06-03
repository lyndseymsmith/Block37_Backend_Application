import express from "express";
import {
  getAllArtPieces,
  getArtPieceById,
  createArtPiece,
  updateArtPiece,
  deleteArtPiece,
} from "../db/queries/art-pieces.js";

const router = express.Router();

//GET all art pieces
router.get("/", async (req, res, next) => {
  try {
    const pieces = await getAllArtPieces();
    res.json(pieces);
  } catch (error) {
    next(error);
  }
});

//GET by ID
router.get("/:id", async (req, res, next) => {
  try {
    const piece = await getArtPieceById(req.params.id);
    if (!piece) {
      res.status(404).json({ error: "Art piece not found" });
    } else {
      res.json(piece);
    }
  } catch (error) {
    next(error);
  }
});

//POST create a new art piece
router.post("/", async (req, res, next) => {
  try {
    const { title, artist, year, medium, exhibition_id } = req.body;
    if (!title || !artist || !year || !medium || !exhibition_id) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newPiece = await createArtPiece({
      title,
      artist,
      year,
      medium,
      exhibition_id,
    });
    res.status(201).json(newPiece);
  } catch (error) {
    next(error);
  }
});

//PUT update an art piece
router.put("/:id", async (req, res, next) => {
  try {
    console.log("REQ BODY:", req.body);
    
    const updated = await updateArtPiece(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

//DELETE an art piece
router.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await deleteArtPiece(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Art piece not found" });
    } else {
      res.json(deleted);
    }
  } catch (error) {
    next(error);
  }
});

export default router;
