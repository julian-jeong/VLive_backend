const createError = require('http-errors');
const mongoose = require('mongoose');

const Episode = require('../../models/Episode');
const { ERR_MSG } = require('../../constants/errors/errorMessage');

exports.getEpisodes = async (_, res, next) => {
  try {
    const episodes = await Episode.find().exec();

    res.json({
      result: 'ok',
      data: episodes,
    });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        result: 'error',
        message: ERR_MSG.INVALID_DATA,
      });
    }

    next(createError(500, ERR_MSG.SERVER_ERR));
  }
};

exports.getSelectedEpisode = async (req, res, next) => {
  try {
    const { episodeId } = req.params;
    const episode = await Episode.findById(episodeId);

    res.json({
      result: 'ok',
      data: episode,
    });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        result: 'error',
        message: ERR_MSG.INVALID_DATA,
      });
    }

    next(createError(500, ERR_MSG.SERVER_ERR));
  }
};
