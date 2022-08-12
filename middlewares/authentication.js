const { ReasonPhrases, StatusCodes } = require("http-status-codes");
import { response, verifyToken, generateToken, decryptRequestData } from "../utils";
import { message } from "../constants";

export const validateToken = (req, res, next) => {
	const { headers } = req;
	try {
		if (headers["x-auth-token"]) {
			const tokenDecryptInfo = verifyToken(headers["x-auth-token"]);
			if (tokenDecryptInfo.data) {
				res.locals.token = tokenDecryptInfo.data;
				const token = generateToken(tokenDecryptInfo.data);
				res.header("x-auth-token", token);
				next();
			} else {
				res.status(StatusCodes.UNAUTHORIZED);
				res.send(response(message.sessionExpired, {}));
			}
		} else {
			res.status(StatusCodes.UNAUTHORIZED);
			res.send(response(message.tokenMissing, {}));
		}
	} catch (e) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR);
		res.send(response(e.message, {}));
	}
};

export const decryptRequest = async (req, res, next) => {
	try {
		if (req.body) {
			const data = req.body.encrypted_req ? req.body.encrypted_req : req.body;
			const requestData = await decryptRequestData(data);
			res.locals.requestBody = requestData;
			res.locals.requestFiles = req.files;
			next();
		} else {
			res.status(StatusCodes.BAD_REQUEST);
			res.send(response(ReasonPhrases.BAD_REQUEST, {}));
		}
	} catch (error) {
		next(error);
	}
};

export const validateAdmin = (req, res, next) => {
	try {
		if (res.locals.token.role_id === 1) {
			next();
		} else {
			res.status(StatusCodes.FORBIDDEN);
			res.send(response(message.forbidden, {}));
		}
	} catch (e) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR);
		res.send(response(e.message, {}));
	}
};
