const Joi = require("@hapi/joi");

const addCommentValidation = Joi.object({
    comment: Joi.string().required(),
    userId: Joi.string().length(24).required(),
    postId: Joi.string().length(24).required()
});

const deleteCommentValidation = Joi.object({

    userId: Joi.string().length(24).required(),
    comment: Joi.string().required(),
});

const updateCommentValidation = Joi.object({
    type: Joi.string().required,
    userId: Joi.string().length(24).required(),
    postId: Joi.string().length(24).required(),
})

module.exports = {
    addCommentValidation,
    deleteCommentValidation,
    updateCommentValidation,
}