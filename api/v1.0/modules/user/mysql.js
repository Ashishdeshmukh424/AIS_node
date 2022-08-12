const { StatusCodes } = require("http-status-codes");
import { mysqlConnection, ApiError } from "../../../../helpers";

class UserDatabase {
	async checkUser(info) {
		try {
			const sqlProcedureCall = `call checkUser(?)`;
			const userDetails = await mysqlConnection(sqlProcedureCall, [info.username]);

			let user = {};
			if (
				typeof userDetails !== "undefined" &&
				typeof userDetails[0] !== "undefined" &&
				typeof userDetails[0][0] !== "undefined"
			) {
				user = userDetails[0][0];
			}

			return user;
		} catch (error) {
			throw new ApiError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
		}
	}

	async register(info) {
		try {
			const sqlProcedureCall = `call register(?, ?, ?, ?, ?)`;
			const userDetails = await mysqlConnection(sqlProcedureCall, [
				info.role_id,
				info.first_name,
				info.last_name,
				info.username,
				info.password
			]);

			let user = {};
			if (
				typeof userDetails !== "undefined" &&
				typeof userDetails[0] !== "undefined" &&
				typeof userDetails[0][0] !== "undefined"
			) {
				user = userDetails[0][0];
			}

			return user;
		} catch (error) {
			throw new ApiError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
		}
	}

	async changePassword(info) {
		try {
			const sqlProcedureCall = `call changePassword(?, ?)`;
			const userDetails = await mysqlConnection(sqlProcedureCall, [info.username, info.new_password]);

			let user = {};
			if (
				typeof userDetails !== "undefined" &&
				typeof userDetails[0] !== "undefined" &&
				typeof userDetails[0][0] !== "undefined"
			) {
				user = userDetails[0][0];
			}

			return user;
		} catch (error) {
			throw new ApiError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
		}
	}

	async deactivateUser(info) {
		try {
			const sqlProcedureCall = `call deactivateUser(?)`;
			const userDetails = await mysqlConnection(sqlProcedureCall, [info.user_id]);

			let user = {};
			if (
				typeof userDetails !== "undefined" &&
				typeof userDetails[0] !== "undefined" &&
				typeof userDetails[0][0] !== "undefined"
			) {
				user = userDetails[0][0];
			}

			return user;
		} catch (error) {
			throw new ApiError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
		}
	}

	async changeUsername(info) {
		try {
			const sqlProcedureCall = `call changeUsername(?, ?)`;
			const userDetails = await mysqlConnection(sqlProcedureCall, [info.user_id, info.new_username]);

			let user = {};
			if (
				typeof userDetails !== "undefined" &&
				typeof userDetails[0] !== "undefined" &&
				typeof userDetails[0][0] !== "undefined"
			) {
				user = userDetails[0][0];
			}

			return user;
		} catch (error) {
			throw new ApiError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
		}
	}
}

export const userDatabase = new UserDatabase();
