import { userService } from "./user";
import { response } from "../../../../utils";
import { logger } from "../../../../helpers";

export const controller = {
	register: async (req, res, next) => {
		try {
			const signUpDetails = await userService.register(res.locals.requestBody);
			res.status(signUpDetails.status);
			res.send(response(signUpDetails.message, signUpDetails.data));
		} catch (error) {
			logger.serverLogger(error);
			next(error);
		}
	},

	login: async (req, res, next) => {
		try {
			const loginDetails = await userService.login(res.locals.requestBody);
			res.status(loginDetails.status);
			res.send(response(loginDetails.message, loginDetails.data));
		} catch (error) {
			logger.serverLogger(error);
			next(error);
		}
	},

	changePassword: async (req, res, next) => {
		try {
			const changePasswordDetails = await userService.changePassword(res.locals.requestBody, res.locals.token);
			res.status(changePasswordDetails.status);
			res.send(response(changePasswordDetails.message, changePasswordDetails.data));
		} catch (error) {
			logger.serverLogger(error);
			next(error);
		}
	},

	deactivateUser: async (req, res, next) => {
		try {
			const deactivateUserDetails = await userService.deactivateUser(res.locals.requestBody);
			res.status(deactivateUserDetails.status);
			res.send(response(deactivateUserDetails.message, deactivateUserDetails.data));
		} catch (error) {
			logger.serverLogger(error);
			next(error);
		}
	},

	changeUsername: async (req, res, next) => {
		try {
			const changeUsernameDetails = await userService.changeUsername(res.locals.requestBody, res.locals.token);
			res.status(changeUsernameDetails.status);
			res.send(response(changeUsernameDetails.message, changeUsernameDetails.data));
		} catch (error) {
			logger.serverLogger(error);
			next(error);
		}
	}
};
