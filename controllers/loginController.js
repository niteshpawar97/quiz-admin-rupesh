const { getAllLogins, getLoginById, createLogin, updateLogin, deleteLogin } = require('../models/userModel');
const Joi = require('joi');

// Input validation schema using Joi
const userSchema = Joi.object({
    name: Joi.string().min(3).required(),
    dob: Joi.date()
    .max('now')  // Ensures the date is not in the future
    .min(moment().subtract(100, 'years').toDate())  // Ensures age is no more than 100 years
    .required()
    .messages({
        'date.base': `"dateOfBirth" should be a valid date`,
        'date.max': `"dateOfBirth" cannot be in the future`,
        'date.min': `"dateOfBirth" should make the person younger than 100 years old`
    }),
    gender: Joi.string().min(1).required(),
    phoneNumber: Joi.string()
        .pattern(/^[6-9]\d{9}$/)  // Validates Indian phone numbers (starting with 6-9 and exactly 10 digits)
        .required()
        .messages({
            'string.base': `"phone" should be a string`,
            'string.empty': `"phone" cannot be empty`,
            'string.pattern.base': `"phone" must be a valid 10-digit Indian phone number`,
        }),

    email: Joi.string().email().required(),
    role_tblrefid: Joi.number()
    .integer()  // Ensures the value is an integer
    .min(1)     // Ensures the integer is greater than or equal to 1
    .required()
    .messages({
        'number.base': `"RoleID" should be a number`,
        'number.integer': `"RoleID" must be an integer`,
        'number.min': `"RoleID" must be greater than or equal to 1`,
        'any.required': `"RoleID" is a required field`,
    })
});

// Get all users
async function getLogins(req, res, next) {
    try {
        const users = await getAllLogins();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

// Get a single user by ID
async function getLogin(req, res, next) {
    try {
        const { id } = req.params;
        const user = await getLoginById(id);
        if (!user) {
            return res.status(404).json({ message: 'Login not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

// Create a new user
async function createNewLogin(req, res, next) {
    try {
        const { error } = userSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const userId = await createLogin(req.body);
        res.status(201).json({ message: 'Login created', userId });
    } catch (error) {
        next(error);
    }
}

// Update an existing user
async function updateExistingLogin(req, res, next) {
    try {
        const { error } = userSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const { id } = req.params;
        await updateLogin(id, req.body);
        res.status(200).json({ message: 'Login updated' });
    } catch (error) {
        next(error);
    }
}

// Delete a user
async function removeLogin(req, res, next) {
    try {
        const { id } = req.params;
        await deleteLogin(id);
        res.status(200).json({ message: 'Login deleted' });
    } catch (error) {
        next(error);
    }
}

module.exports = { getLogins, getLogin, createNewLogin, updateExistingLogin, removeLogin };