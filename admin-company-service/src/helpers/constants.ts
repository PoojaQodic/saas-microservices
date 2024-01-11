const bcrypt = require('bcrypt');
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import emailSend from './sendEmail';
import { messageEn, messageFrench } from './messagesAndCode';
import Company from '../models/companyModel';

const secretKey = '12we34e5r6tt'; // Replace with your actual secret key
const commonFunctions = {

    /**
     * This method will generate hash password
     * @param password -plain password
     * @returns -returns encrypted password
     */
    hashPassword: async (password: any) => {
        let saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    },

    /**
     * This method will compare the plain password with hash password
     * @param inputPassword  - Plain Password
     * @param hashedPassword  - hashed password
     * @returns - return boolean response
     */
    comparePasswords: async (inputPassword: any, hashedPassword: any) => {
        const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
        return isMatch;
    },

    /**
     * This method will create generate  jwt token
     * @param payload - object contains the details of user
     * @returns - return the jwt token
     */
    generateToken: (payload: any) => {
        // Sign the token with the secret key and set an expiration time (e.g., 1 hour)
        const token = jwt.sign(payload, secretKey, { expiresIn: '1d' });
        return token;
    },

    /**
     * This method will verify jwt token
     * @param token - jwt token 
     * @returns - return null or decoded information
     */
    verifyToken: (token: any) => {
        try {
            const decoded = jwt.verify(token, secretKey);
            return decoded;
        } catch (error) {
            // If the token is invalid or has expired, jwt.verify will throw an error
            return null;
        }
    },

    /**
     * This method will create error/success response
     * @param status - response status
     * @param message - response message
     * @param res - response
     * @returns - return the response with status & message
     */
    createError: (status: any, message: any, res: any) => {
        return res.status(status).json({ statusCode: status, responseMessage: message });
    },

    /**
     * This method will check the role of given user
     * @param id - user id
     * @param roleId - role
     * @returns  return boolean response
     */
    checkRole: async (user: any, roleId: number[]) => {
        let role = false, findUser = null

        //if isCompany true then will check role for customer else for admin
        if (user.isCompany) {
            findUser = await Company.findOne({ where: { id: user.dataValues.id } })
            role = (findUser) ? true : false
        } else {
            findUser = await User.findOne({ where: { id: user.dataValues.id } })
            if (findUser && findUser.role_id && roleId.includes(findUser.role_id)) {
                role = true
            }
        }
        return role
    },
    /**
     * This method will give the response in object form
     * @param list - list of document
     * @param count - total count of document
     * @param page - current page number
     * @param perPage - perPage number
     * @returns - returns object with response
     */
    getListResponse: (list: any, count: number, page: number, perPage: number) => {
        return {
            list,
            totalCounts: count,
            page,
            totalPage: (Math.ceil(count / perPage)) ? Math.ceil(count / perPage) : 0
        }
    },

    /**
     * This method will create response object 
     * @param status - response status  
     * @param message - response message
     * @param Data - response data
     * @returns - response object
     */
    sendResponse: (status: number, message: string, Data?: any) => {
        if (!Data) {
            return {
                statusCode: status,
                responseMessage: message,
            }
        }
        return {
            responseCode: status,
            responseMessage: message,
            Data
        }
    },

    /**
     * This method will give the select attributes for modules
     * @param module - table name
     * @returns - the array of required attributes
     */
    getSelectedAttributes: (module: string) => {

        if (module == 'company') {
            return ['id', 'email', 'company_address', 'first_name', 'last_name', 'status', 'city', 'status', 'phone', 'logo']
        }
        if (module == 'user') {
            return ['id', 'name', 'email', 'phone', 'address', 'city', 'date_of_birth', 'profile_pic', 'is_subuser', 'company_id', 'is_verified', 'status']
        }
    },

    /**
     * This method will verify the user/company and send Invite email to set password
     * @param user 
     * @param module 
     */
    verifyAndSendInvite: (user: any, module: string,message:string) => {

        //binding the name
        let name = ''
        if (module == 'company') {
            name = `${user.first_name} ${user.last_name}`
        } else {
            name = user.name
        }

        //creating token
        let details = {
            id: (user && user.id) ? user.id : null,
            email: (user && user.email) ? user.email : null
        }
        let createToken = commonFunctions.generateToken(details)

        //TOOD: Need to put in constant file
        let emailText = `<b>Welcome! ${name}</b><br>
        Click Here to set password & Verify Your email-${user.email} : <a href="http://localhost:3000/api?token=${createToken}" target="_blank">Click here</a> `

        //Common function to send email
        emailSend('abc@gmail.com', user.email, message, 'Hey! Welcome Please click and set your password', emailText)
    },

    checkLanguageSetting: (req: any) => {

        let lang, message;
        lang = (req.lang) ? req.lang : 'en'
        message = (lang && lang == 'fr') ? messageFrench : messageEn

        return message
    }

}
export default commonFunctions