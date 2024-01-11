import { Request, Response } from "express";
import userModel from '../models/userModel'
import companyModel from '../models/companyModel'
import constants from "../helpers/constants";
import { JwtPayload } from "jsonwebtoken";
import { codes} from "../helpers/messagesAndCode";

const authController = {
/**
 * This Method Will Login User/Admin/Company into our System
 * @param req Request Object
 * @param res Response Object
 * @returns - Success Login Message & JWT TOKEN
 */
    login: async (req: Request, res: Response) => {
        let findUser, comparePassword, userDetails, token

        let message=constants.checkLanguageSetting(req.headers)
        try {
            
            //destructing the variables
            const {email,password,isAdmin}=req.body

            //Checking for required fields
            if (!(email && password)) {
                return constants.createError(codes.BAD_REQUEST, message.REQUIRED_FIELDS, res)
            }

            //If will get isAdmin true then will login the admin abd find in user model else in company model
            if (!isAdmin) {

                //checking user is exist in our database or not
                findUser = await companyModel.findOne({ where: { email: email, deleted_at: null } })
                if (!findUser) {
                    return constants.createError(codes.BAD_REQUEST, message.INVALID_CREDENTIALS, res)
                }
            } else {
                //checking user is exist in our database or not
                findUser = await userModel.findOne({ where: { email: email, deleted_at: null } })
                if (!findUser) {
                    return constants.createError(codes.BAD_REQUEST, message.INVALID_CREDENTIALS, res)
                }
            }

            //comparing password
            comparePassword = await constants.comparePasswords(password, findUser.password)
            if (!comparePassword) {
                return constants.createError(codes.BAD_REQUEST, message.INVALID_CREDENTIALS, res)
            }

            //generating jwt token
            userDetails = {
                id: findUser.id,
                email: findUser.email,
                // roleId: (findUser.role_id) ? findUser.role_id : null
            }
            token = constants.generateToken(userDetails)

            return res.status(codes.SUCCESS).json(constants.sendResponse(codes.SUCCESS, message.LOGIN_SUCCESSFULLY, {token}));
        } catch (error) {
            console.log('error----', error);
            return constants.createError(codes.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR, res)
        }
    },
    /**
     * This API Will set password for company & users
     * @param req - Request Body -module,password,conf_password
     * @param res - Response Body
     * @returns - returns success message
     */
    setPassword: async (req: Request, res: Response) => {

        let getToken, decodeToken, checkUser
        let message=constants.checkLanguageSetting(req.headers)
        try {
            const {module,password,conf_password}=req.body

            //collection token from the headers
            getToken = (req.headers && req.headers.token) ? req.headers.token : null;
            if (!getToken) {
                return constants.createError(codes.BAD_REQUEST, message.UNAUTHORIZED, res)
            }

            //if module is company then password will set for company module else it for user
            if (!module) {
                return constants.createError(codes.BAD_REQUEST, message.PLEASE_PASS_MODULE_FOR_SET_PASSWORD, res)
            }

            //validation for required fields
            if (!(password && conf_password)) {
                return constants.createError(codes.BAD_REQUEST, message.REQUIRED_FIELDS, res)
            }

            //checking both password are equal or not
            if (password !== conf_password) {
                return constants.createError(codes.NOT_ACCEPTABLE, message.INVALID_MATCH_PASSWORD, res)
            }

            //decoding the token
            decodeToken = constants.verifyToken(getToken)
            if (!decodeToken) {
                return constants.createError(codes.BAD_REQUEST, message.UNAUTHORIZED, res)
            }

            //finding the company
            if (module == 'company') {
                checkUser = await companyModel.findOne({ where: { email: ((decodeToken as JwtPayload).email), deleted_at: null } })
                if (!checkUser) {
                    return constants.createError(codes.BAD_REQUEST, message.UNAUTHORIZED, res)
                }
            } else {
                checkUser = await userModel.findOne({ where: { email: ((decodeToken as JwtPayload).email), deleted_at: null } })
                if (!checkUser) {
                    return constants.createError(codes.BAD_REQUEST, message.UNAUTHORIZED, res)
                }
            }

            //creating hash password
            let hasPassword = await constants.hashPassword(password)
            if (hasPassword) {

                if (module && module == 'company') {
                    //updating/set password for the company
                    await companyModel.update({ password: hasPassword, is_verified: true }, {
                        where: { id: checkUser.id, deleted_at: null },
                    });
                } else {
                    //updating/set password for the company
                    await userModel.update({ password: hasPassword, is_verified: true }, {
                        where: { id: checkUser.id, deleted_at: null },
                    });
                }

                return res.status(codes.SUCCESS).json(constants.sendResponse(codes.SUCCESS, message.SET_PASSWORD_SUCCESSFULLY));
            }
            return constants.createError(codes.INTERNAL_SERVER_ERROR, message.SOMETHING_WENT_WRONG, res)

        } catch (error) {
            console.log('error:-', error);
            return constants.createError(codes.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR, res)
        }
    },

}

export default authController