import jwt, { JwtPayload } from 'jsonwebtoken';
import constants from "../helpers/constants";
import { codes,} from '../helpers/messagesAndCode';
import { Request, Response, NextFunction } from "express";
import commonQuery from '../helpers/commonQuries';

export const authenticateUser = async(req:Request, res:Response, next:NextFunction) => {
    // Get the token from the request header or query parameter
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1]:null;
    let message=constants.checkLanguageSetting(req.headers)
    try {
        if (!token) {
            return constants.createError(codes.UNAUTHORIZED,message.TOKEN_IS_REQUIRED,res)
        }

        // Verify the token
        let verifyUser= constants.verifyToken(token) as JwtPayload
        if(!verifyUser){
            return constants.createError(codes.UNAUTHORIZED,message.UNAUTHORIZED,res)
        }

        //let find the user in our system
        let isCompany=false;
        let findUser = await  commonQuery.findUserById((verifyUser.id))
        if(!findUser){
            findUser= await  commonQuery.findCompanyById(verifyUser.id)
            isCompany=true;
            if(!findUser){
               return constants.createError(codes.UNAUTHORIZED,message.UNAUTHORIZED,res)
            }
        }

        req.user = {...findUser,isCompany};
        
        // Continue to the next middleware or route handler
        next();
        
    } catch (error) {
        console.log('error----',error);
        return constants.createError(codes.UNAUTHORIZED,message.UNAUTHORIZED,res)
    }
};