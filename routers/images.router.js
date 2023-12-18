const express = require('express');
const multer = require('multer');
const { findAll, findById, save, update, deletear } = require('../services/images.services');
const midLoadImage = require('../middlewares/upImagen');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.use(express.json());
router.get('/', findAll);
router.get('/:id', findById);
router.post('/:idUser', upload.single('imagen'), midLoadImage, save);
router.patch('/:id', update);
router.delete('/:id', deletear);

module.exports = router;