const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
import { config } from "../config";

export const response = (msg, data = {}) => {
	const details = {
		message: msg,
		data
	};
	return details;
};

export const generateToken = tokenData => {
	const token = jwt.sign({ data: tokenData, exp: Math.floor(Date.now() / 1000) + 60 * 60 }, config.jwtTokenKey);
	return token;
};

export const verifyToken = token => {
	try {
		const decodedData = jwt.verify(token, config.jwtTokenKey);
		return decodedData;
	} catch (err) {
		if (err.name === "TokenExpiredError") {
			err.message = "User Session Expired";
			err.status = 401;
			throw err;
		}
		throw err;
	}
};

export const decryptRequestData = async data => {
	try {
		if (config.encryption === "true") {
			const decrypted = await CryptoJS.AES.decrypt(data, config.cryptoKey);
			if (decrypted) {
				const requestInfo = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
				return requestInfo;
			}
			return data;
		}
		return data;
	} catch (err) {
		return err;
	}
};
