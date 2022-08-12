const { StatusCodes } = require("http-status-codes");
import { ApiError } from "../../../../helpers";
import { userDatabase } from "../user/mysql";
import { message } from "../../../../constants";
import { generateToken } from "../../../../utils";

class UserService {
	/**
	 * API for user sign-up
	 * @param {*} req (json)
	 * @param {*} res (json with success/failure)
	 */
	async register(info) {
		try {
			if (!info.role_id || (info.role_id !== 1 && info.role_id !== 2) || !info.username || !info.password) {
				throw new ApiError(message.badRequest, StatusCodes.BAD_REQUEST);
			}

			const userDetails = await userDatabase.checkUser(info);
			if (Object.keys(userDetails).length !== 0) {
				throw new ApiError(message.dublicateUsername, StatusCodes.BAD_REQUEST);
			}

			const registrationDetails = await userDatabase.register(info);
			if (Object.keys(registrationDetails).length === 0) {
				throw new ApiError(message.internalServerError, StatusCodes.INTERNAL_SERVER_ERROR);
			}

			if (!registrationDetails.user_id) {
				throw new ApiError(message.dbError, StatusCodes.INTERNAL_SERVER_ERROR);
			}

			if (registrationDetails.user_exists) {
				throw new ApiError(message.dublicateUsername, StatusCodes.BAD_REQUEST);
			}

			return {
				status: StatusCodes.OK,
				message: message.success,
				data: {}
			};
		} catch (error) {
			throw new ApiError(error.message, error.status);
		}
	}

	/**
	 * API for user login
	 * @param {*} req (email address & password)
	 * @param {*} res (json with success/failure)
	 */
	async login(info) {
		try {
			if (!info.username || !info.password) {
				throw new ApiError(message.badRequest, StatusCodes.BAD_REQUEST);
			}

			const userDetails = await userDatabase.checkUser(info);
			if (Object.keys(userDetails).length === 0) {
				throw new ApiError(message.invalidLoginDetails, StatusCodes.NOT_FOUND);
			}

			if (userDetails.is_banned) {
				throw new ApiError(message.userBanned, StatusCodes.FORBIDDEN);
			}

			if (userDetails.password !== info.password) {
				throw new ApiError(message.invalidLoginDetails, StatusCodes.BAD_REQUEST);
			}

			delete userDetails.password;

			const token = generateToken(userDetails);

			const userData = {
				user_id: userDetails.user_id,
				role_id: userDetails.role_id,
				username: userDetails.username,
				first_name: userDetails.first_name,
				last_name: userDetails.last_name,
				x_auth_token: token
			};

			return {
				status: StatusCodes.OK,
				message: message.success,
				data: userData
			};
		} catch (error) {
			throw new ApiError(error.message, error.status);
		}
	}

	/**
	 * API for user login
	 * @param {*} req (email address & password)
	 * @param {*} res (json with success/failure)
	 */
	async changePassword(info, token) {
		try {
			if (!info.previous_password || !info.new_password) {
				throw new ApiError(message.badRequest, StatusCodes.BAD_REQUEST);
			}

			const userDetails = await userDatabase.checkUser(token);
			if (Object.keys(userDetails).length === 0) {
				throw new ApiError(message.invalidLoginDetails, StatusCodes.NOT_FOUND);
			}

			if (userDetails.password !== info.previous_password) {
				throw new ApiError(message.invalidLoginDetails, StatusCodes.BAD_REQUEST);
			}

			const changePasswordDetails = await userDatabase.changePassword({ ...info, username: token.username });
			if (Object.keys(changePasswordDetails).length === 0) {
				throw new ApiError(message.internalServerError, StatusCodes.NOT_FOUND);
			}

			if (!changePasswordDetails.user_exists) {
				throw new ApiError(message.internalServerError, StatusCodes.NOT_FOUND);
			}

			return {
				status: StatusCodes.OK,
				message: message.success,
				data: {}
			};
		} catch (error) {
			throw new ApiError(error.message, error.status);
		}
	}

	/**
	 * API for user login
	 * @param {*} req (email address & password)
	 * @param {*} res (json with success/failure)
	 */
	async deactivateUser(info) {
		try {
			if (!info.user_id) {
				throw new ApiError(message.badRequest, StatusCodes.BAD_REQUEST);
			}

			const deactivateUserDetails = await userDatabase.deactivateUser(info);
			if (Object.keys(deactivateUserDetails).length === 0) {
				throw new ApiError(message.internalServerError, StatusCodes.NOT_FOUND);
			}

			if (!deactivateUserDetails.user_exists) {
				throw new ApiError(message.userNotFound, StatusCodes.NOT_FOUND);
			}

			return {
				status: StatusCodes.OK,
				message: message.success,
				data: {}
			};
		} catch (error) {
			throw new ApiError(error.message, error.status);
		}
	}

	async changeUsername(info, token) {
		try {
			if (!info.new_username) {
				throw new ApiError(message.badRequest, StatusCodes.BAD_REQUEST);
			}

			const userDetails = await userDatabase.checkUser({ username: token.username });
			if (Object.keys(userDetails).length === 0) {
				throw new ApiError(message.userNotFound, StatusCodes.NOT_FOUND);
			}

			const changeUsernameDetails = await userDatabase.changeUsername({ ...info, user_id: token.user_id });
			if (Object.keys(changeUsernameDetails).length === 0) {
				throw new ApiError(message.internalServerError, StatusCodes.NOT_FOUND);
			}

			if (!changeUsernameDetails.user_exists) {
				throw new ApiError(message.internalServerError, StatusCodes.NOT_FOUND);
			}

			return {
				status: StatusCodes.OK,
				message: message.success,
				data: {}
			};
		} catch (error) {
			throw new ApiError(error.message, error.status);
		}
	}
}

export const userService = new UserService();
