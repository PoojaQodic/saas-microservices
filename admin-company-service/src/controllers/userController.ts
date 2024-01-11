import { Request, Response } from "express";
import userModel from '../models/userModel'
import constants from "../helpers/constants";
import { codes, roles } from "../helpers/messagesAndCode";
import commonQuery from "../helpers/commonQuries";
import moment from "moment";
import Company from "../models/companyModel";
import { Op } from "sequelize";

const UserController = {

    /**
     * This API Will create sub user for company
     * @param req  - Request Body
     * @param res - Response
     * @returns - return the created user object
     */
    createUser: async (req: Request, res: Response) => {

        //declaring variables
        const authUserId = req.user?.dataValues.id;
        let checkRole, checkEmailOfUser, createUser;
        const { name, email, phone, city, state, status, profile_pic, date_of_birth, address, role } = req.body; //destructing variables
        let message=constants.checkLanguageSetting(req.headers)

        try {

            //This method will check role of auth user and validate
            checkRole = await constants.checkRole(req.user, [roles.COMPANY])
            if (!checkRole) {
                return constants.createError(codes.FORBIDDEN, message.FORBIDDEN_ACCESS, res)
            }

            //validation for required fields
            if (!(name && email && phone && city && state && role)) {
                return constants.createError(codes.BAD_REQUEST, message.REQUIRED_FIELDS, res)
            }

            //checking for email & phone is unique from our system
            checkEmailOfUser = await commonQuery.findUserByEmailPhone(email, phone)
            if (checkEmailOfUser) {
                return constants.createError(codes.BAD_REQUEST, message.EMAIL_ALREADY_EXISTS, res)
            }

            //creating user 
            createUser = await userModel.create({
                name: (name) ? name : null,
                email: (email) ? email : null,
                city: (city) ? city : null,
                status: (status) ? status : false,
                phone: (phone) ? phone : null,
                is_subuser: true,
                company_id: authUserId,
                profile_pic: (profile_pic) ? profile_pic : null,
                date_of_birth: (date_of_birth) ? date_of_birth : null,
                address: (address) ? address : null,
                role_id: (role) ? role : null
            })

            if (createUser) {

                //This method will generate token & send email
                constants.verifyAndSendInvite(createUser, 'user',message.INVITE_COMPANY)
                return res.status(codes.SUCCESS).json(constants.sendResponse(codes.SUCCESS, message.USER_CREATED_SUCCESSFULLY, createUser));

            }
            return constants.createError(codes.INTERNAL_SERVER_ERROR, message.SOMETHING_WENT_WRONG, res)

        } catch (error) {
            console.log('error----', error);
            return constants.createError(codes.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR, res)
        }
    },
    getUserById: async (req: Request, res: Response) => {
        //declaring variable
        const authUserId = req.user?.dataValues.id;
        let checkRole, getUser, attributes = constants.getSelectedAttributes('user');
        let message=constants.checkLanguageSetting(req.headers)

        //destructing req params
        const { id } = req.params

        try {
            //This method will check role of auth user and validate
            checkRole = await constants.checkRole(req.user, [roles.COMPANY])
            if (!checkRole) {
                return constants.createError(codes.FORBIDDEN, message.FORBIDDEN_ACCESS, res)
            }

            //validation for id
            if (!id) {
                return res.status(codes.BAD_REQUEST).json(constants.sendResponse(codes.BAD_REQUEST, message.REQUIRED_FIELDS));
            }

            //finding company by id and selection some required attributes
            getUser = await userModel.findOne({
                where: { id, deleted_at: null, company_id: authUserId }, attributes,
                include: [{
                    model: Company,
                    attributes: constants.getSelectedAttributes('company'),
                    as: 'company',
                    where: { deleted_at: null }
                }]
            })
            if (!getUser) {
                return res.status(codes.NOT_FOUND).json(constants.sendResponse(codes.NOT_FOUND, message.USER_NOT_FOUND));
            }

            return res.status(codes.SUCCESS).json(constants.sendResponse(codes.SUCCESS, message.USER_GET_SUCCESSFULLY, getUser));
        } catch (error) {
            console.log('error----', error);
            return constants.createError(codes.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR, res)
        }
    },

    /**
     * This API Will Delete user By Id
     * @param req 
     * @param res 
     * @returns 
     */
    deleteUserById: async (req: Request, res: Response) => {
        //variable declarations
        const authUserId = req.user?.dataValues.id;
        let checkRole, getUser, deleteUser;
        let message=constants.checkLanguageSetting(req.headers)

        //destructing req params
        const { id } = req.params
        try {
            //This method will check role of auth user and validate
            checkRole = await constants.checkRole(req.user, [roles.COMPANY])
            if (!checkRole) {
                return constants.createError(codes.FORBIDDEN, message.FORBIDDEN_ACCESS, res)
            }

            //validation for id
            if (!id) {
                return res.status(codes.BAD_REQUEST).json(constants.sendResponse(codes.BAD_REQUEST, message.REQUIRED_FIELDS));
            }

            //finding company by id and selection some required attributes
            getUser = await userModel.findOne({ where: { id, deleted_at: null, company_id: authUserId } })
            if (!getUser) {
                return res.status(codes.NOT_FOUND).json(constants.sendResponse(codes.NOT_FOUND, message.USER_NOT_FOUND));
            }

            //updating 
            deleteUser = await userModel.update({ deleted_at: moment().format('YYYY-MM-DD HH:mm:ss') }, { where: { id } })
            if (deleteUser) {
                return res.status(codes.SUCCESS).json(constants.sendResponse(codes.SUCCESS, message.USER_DELETED_SUCCESSFULLY));
            }
            return res.status(codes.INTERNAL_SERVER_ERROR).json(constants.sendResponse(codes.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
        } catch (error) {
            console.log('error----', error);
            return constants.createError(codes.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR, res)
        }
    },

    /**
     * This API Will list all the user for particular company
     * @param req -Request Body
     * @param res - Response
     * @returns 
     */
    listUser: async (req: Request, res: Response) => {
        const authUserId = req.user?.dataValues.id;

        interface WhereObject {
            [key: string]: null | { [Op.iLike]: string } | string | number | boolean
        }
        let checkRole, listUser, whereObj: WhereObject = { deleted_at: null, company_id: authUserId }, defaultSkip = 0, defaultLimit = 10, userCount: number;
        const { skip, limit, name, address, email, status, is_verified, sort_on, sort_by } = req.query;
        let message=constants.checkLanguageSetting(req.headers)
        try {

            //This method will check role of auth user and validate
            checkRole = await constants.checkRole(req.user, [roles.COMPANY])
            if (!checkRole) {
                return constants.createError(codes.FORBIDDEN, message.FORBIDDEN_ACCESS, res)
            }

            if (skip && limit && typeof limit == 'string' && typeof skip == 'string') {
                defaultSkip = parseInt(skip);
                defaultLimit = parseInt(limit);
            }

            userCount = await userModel.count({ where: whereObj })

            //filters on fields
            if (name) {
                whereObj.name = { [Op.iLike]: `%${name}%` }
            }

            if (address && address !== null) {
                whereObj.address = { [Op.iLike]: `%${address}%` }
            }

            if (email && email !== null) {
                whereObj.email = { [Op.iLike]: `%${email}%` }
            }

            if (status && typeof status == 'string') {
                whereObj.status = status
            }

            if (is_verified && typeof is_verified == 'string') {
                whereObj.is_verified = is_verified
            }
            //end filters on fields

            //Dynamic sorting
            let sort: [string, string][] = [['id', 'DESC']]
            if (sort_on && sort_by && typeof sort_on == 'string' && typeof sort_by == 'string') {
                sort = [[sort_on, sort_by]]
            }

            //getting list of users
            listUser = await userModel.findAll({
                where: whereObj,
                attributes: constants.getSelectedAttributes('user'),
                offset: defaultSkip,
                order: sort,
                limit: defaultLimit
            })

            let response = constants.getListResponse(listUser, userCount, defaultSkip, defaultLimit)

            return res.status(codes.SUCCESS).json(constants.sendResponse(codes.SUCCESS, message.USER_LIST_SUCCESSFULLY, response));
        } catch (error) {
            console.log('error----', error);
            return constants.createError(codes.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR, res)
        }
    },

    /**
     * This API will update user by id
     * @param req - Request Body
     * @param res - Response
     * @returns 
     */
    updateUser: async (req: Request, res: Response) => {

        //variable declarations
        const authUserId = req.user?.dataValues.id;
        let checkRole, getUser, updatedUser;

        //destructing variables
        const { id } = req.params
        const { name, phone, email, city, status, profile_pic, date_of_birth, address, role } = req.body;
        let message=constants.checkLanguageSetting(req.headers)
        
        try {
            //This method will check role of auth user and validate
            checkRole = await constants.checkRole(req.user, [roles.COMPANY])
            if (!checkRole) {
                return constants.createError(codes.FORBIDDEN, message.FORBIDDEN_ACCESS, res)
            }

            //validation for id
            if (!id) {
                return res.status(codes.BAD_REQUEST).json(constants.sendResponse(codes.BAD_REQUEST, message.REQUIRED_FIELDS));
            }

            //finding company by id
            getUser = await commonQuery.getUserByIdAndCompany(id, authUserId)
            if (!getUser) {
                return res.status(codes.NOT_FOUND).json(constants.sendResponse(codes.NOT_FOUND, message.USER_NOT_FOUND));
            }

            //This query will check that email & phone are register in out system. if exist then we are not allowing for further process
            let checkPhone = (phone && email) ? await userModel.findOne({ where: { [Op.or]: [{ phone: phone }, { email: email }], id: { [Op.ne]: id }, deleted_at: null } }) : null
            if (checkPhone) {
                return res.status(codes.BAD_REQUEST).json(constants.sendResponse(codes.BAD_REQUEST, message.EMAIL_ALREADY_EXISTS));
            }

            //updating user info
            let updateUser = await userModel.update({
                name: (name) ? name : getUser.name,
                email: (email) ? email : getUser.email,
                city: (city) ? city : getUser.city,
                status: status || getUser.status,
                phone: (phone) ? phone : getUser.phone,
                profile_pic: (profile_pic) ? profile_pic : getUser.profile_pic,
                date_of_birth: (date_of_birth) ? date_of_birth : getUser.date_of_birth,
                address: (address) ? address : getUser.address,
                role_id: (role) ? role : getUser.role_id,
            }, { where: { id: id } })

            //if user update then send updated data in response
            if (updateUser) {

                updatedUser = await commonQuery.getUserByIdAndCompany(id, authUserId)
                return res.status(codes.SUCCESS).json(constants.sendResponse(codes.SUCCESS, message.COMPANY_UPDATED_SUCCESSFULLY, updatedUser));
            }

            return res.status(codes.INTERNAL_SERVER_ERROR).json(constants.sendResponse(codes.INTERNAL_SERVER_ERROR, message.SOMETHING_WENT_WRONG));
        } catch (error) {
            console.log('error----', error);
            return constants.createError(codes.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR, res)
        }
    }

}
export default UserController