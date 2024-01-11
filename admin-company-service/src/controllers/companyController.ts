import { Request, Response } from "express";
import { Op } from 'sequelize';
import companyModel from '../models/companyModel'
import constants from "../helpers/constants";
import commonQuery from "../helpers/commonQuries";
import { roles, codes} from '../helpers/messagesAndCode'
import moment from "moment";

const companyController = {
    /**
     * The Admin can create company with below details
     * @param req - Request Body
     * @param res - Response
     * @returns - Success response with company details
     */
    createCompany: async (req: Request, res: Response) => {

        //declaring variables
        // const authUserId = req.user?.dataValues.id;
        let checkRole, checkCompanyExist, createCompany;

        //destructing the variables
        const { email, first_name, last_name, city, state, phone, logo, status, company_address } = req.body;
        let message=constants.checkLanguageSetting(req.headers)

        try {

            //This method will check role of auth user and validate
            checkRole = await constants.checkRole(req.user, [roles.SUPER_ADMIN])
            if (!checkRole) {
                return constants.createError(codes.FORBIDDEN, message.FORBIDDEN_ACCESS, res)
            }

            //validation for required fields
            if (!(email && first_name && last_name && city && state && phone)) {
                return constants.createError(codes.BAD_REQUEST, message.REQUIRED_FIELDS, res)
            }

            //checking that company is already register with same email or not
            checkCompanyExist = await companyModel.findOne({ where: { [Op.or]: [{ email: email }, { phone: phone }], deleted_at: null } })
            if (checkCompanyExist) {
                return constants.createError(codes.BAD_REQUEST, message.EMAIL_ALREADY_EXISTS, res)
            }

            //creating company
            createCompany = await companyModel.create({
                is_company: true,
                email: (email) ? email : null,
                company_address: (company_address) ? company_address : null,
                city: (city) ? city : null,
                state: (state) ? state : null,
                status: (status) ? status : false,
                first_name: (first_name) ? first_name : null,
                last_name: (last_name) ? last_name : null,
                phone: (phone) ? phone : null,
                logo: (logo) ? logo : null
            })
            if (createCompany) {

                //This method will generate token & send email
                constants.verifyAndSendInvite(createCompany, 'company',message.INVITE_COMPANY)
                return res.status(codes.SUCCESS).json(constants.sendResponse(codes.SUCCESS, message.COMPANY_CREATED_SUCCESSFULLY, { companyData: createCompany }));
            }

            return res.status(codes.INTERNAL_SERVER_ERROR).json(constants.sendResponse(codes.INTERNAL_SERVER_ERROR, message.SOMETHING_WENT_WRONG));
        } catch (error) {
            console.log('error----', error);
            return res.status(codes.INTERNAL_SERVER_ERROR).json(constants.sendResponse(codes.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
        }
    },
    /**
     * This API Will give list of all companies in system
     * @param req -Request Body
     * @param res - Response 
     * @returns - Will give the list of all companies
     */
    listCompany: async (req: Request, res: Response) => {

        //variables declarations
        // const authUserId = req.user?.dataValues.id;
        let checkRole, countCompany, companyList, attributes = constants.getSelectedAttributes('company');

        interface WhereObject {
            [key: string]: null | { [Op.iLike]: string } | string | number | boolean;
        }

        let whereObj: WhereObject = { deleted_at: null };
        const { first_name, last_name, status, address, email, sort_by, sort_on, limit, skip } = req.query
        let message=constants.checkLanguageSetting(req.headers)
        try {
            //This method will check role of auth user and validate
            checkRole = await constants.checkRole(req.user, [roles.SUPER_ADMIN])
            if (!checkRole) {
                return constants.createError(codes.FORBIDDEN, message.FORBIDDEN_ACCESS, res)
            }

            //filters on fields
            if (first_name) {
                whereObj.first_name = { [Op.iLike]: `%${first_name}%` }
            }
            if (last_name) {
                whereObj.last_name = { [Op.iLike]: `%${last_name}%` }
            }

            if (status && typeof status === 'string') {
                whereObj.status = status
            }

            if (address && typeof address === 'string') {
                whereObj.company_address = { [Op.iLike]: `%${address}%` }
            }

            if (email && typeof email === 'string') {
                whereObj.email = { [Op.iLike]: `%${email}%` }
            }
            //End filters on fields

            // Default sort if no sort query parameter is provided
            let sort: [string, string][] = [['id', 'DESC']];
            if (sort_by && sort_on && typeof sort_on === 'string' && typeof sort_by === 'string') {
                sort = [[sort_on, sort_by]]
            }

            //Getting company total counts
            countCompany = await companyModel.count({ where: { deleted_at: null } })

            //Pagination
            let offset = 0;
            let defaultLimit = 10;
            if (skip && limit && typeof limit == 'string' && typeof skip == 'string') {
                offset = parseInt(skip)
                defaultLimit = parseInt(limit)
            }

            //getting all list of companies
            companyList = await companyModel.findAll({
                where: whereObj, attributes,
                order: sort,
                offset, limit: defaultLimit
            })

            //getting the proper response for list
            let response = constants.getListResponse(companyList, countCompany, offset, defaultLimit)

            return res.status(codes.SUCCESS).json(constants.sendResponse(codes.SUCCESS, message.LIST_COMPANY_SUCCESSFULLY, response));
        } catch (error) {
            console.log('error----', error);
            return res.status(codes.INTERNAL_SERVER_ERROR).json({ message: message.INTERNAL_SERVER_ERROR });
        }
    },
    /**
     * This API will give the company by id
     * @param req - Request Body
     * @param res - Response 
     * @returns - Returns the company details
     */
    getCompanyById: async (req: Request, res: Response) => {
        // const authUserId = req.user?.dataValues.id;
        let checkRole, getCompany, attributes = constants.getSelectedAttributes('company');
        const { id } = req.params;
        let message=constants.checkLanguageSetting(req.headers)
        try {

            //This method will check role of auth user and validate
            checkRole = await constants.checkRole(req.user, [roles.SUPER_ADMIN, roles.COMPANY])
            if (!checkRole) {
                throw constants.createError(codes.FORBIDDEN, message.FORBIDDEN_ACCESS, res)
            }

            //validation for id
            if (!id) {
                return res.status(codes.BAD_REQUEST).json(constants.sendResponse(codes.BAD_REQUEST, message.REQUIRED_FIELDS));
            }

            //finding company by id and selection some required attributes
            getCompany = await commonQuery.findCompanyByIdWithAttributes(id, attributes)
            if (!getCompany) {
                return res.status(codes.NOT_FOUND).json(constants.sendResponse(codes.NOT_FOUND, message.COMPANY_NOT_FOUND));
            }

            return res.status(codes.SUCCESS).json(constants.sendResponse(codes.SUCCESS, message.GET_COMPANY_SUCCESSFULLY, getCompany));
        } catch (error) {
            console.log('error----', error);
            return res.status(codes.INTERNAL_SERVER_ERROR).json({ message: message.INTERNAL_SERVER_ERROR });
        }
    },

    /**
     * This API will Update the company by id
     * @param req - Request Body
     * @param res - Response 
     * @returns - Returns the updated company details
     */
    updateCompany: async (req: Request, res: Response) => {
        // const authUserId = req.user?.dataValues.id;
        let checkRole, getCompany, attributes = constants.getSelectedAttributes('company')
        const { id } = req.params;
        const { phone, first_name, last_name, company_address, state, city, status, logo } = req.body
        let message=constants.checkLanguageSetting(req.headers)
        try {

            //This method will check role of auth user and validate
            checkRole = await constants.checkRole(req.user, [roles.SUPER_ADMIN, roles.COMPANY])
            if (!checkRole) {
                throw constants.createError(codes.FORBIDDEN, message.FORBIDDEN_ACCESS, res)
            }

            //validation for params id
            if (!id) {
                return res.status(codes.BAD_REQUEST).json(constants.sendResponse(codes.BAD_REQUEST, message.REQUIRED_FIELDS));
            }

            //finding company by id
            getCompany = await commonQuery.findCompanyById(id)
            if (!getCompany) {
                return res.status(codes.NOT_FOUND).json(constants.sendResponse(codes.NOT_FOUND, message.COMPANY_NOT_FOUND));
            }

            //check the requested phone number is already in our system. If exists then we are not allowing for further process
            let checkPhone = (phone) ? await companyModel.findOne({ where: { phone: phone, id: { [Op.ne]: id }, deleted_at: null } }) : null
            if (checkPhone) {
                return res.status(codes.BAD_REQUEST).json(constants.sendResponse(codes.BAD_REQUEST, message.PHONE_ALREADY_EXIST));
            }

            //updating company
            let updatedCompany: object | null = await companyModel.update({
                first_name: (first_name) ? first_name : null,
                last_name: (last_name) ? last_name : null,
                company_address: (company_address) ? company_address : null,
                state: (state) ? state : null,
                city: (city) ? city : null,
                phone: (phone) ? phone : null,
                status: (status) ? status : false,
                logo: (logo) ? logo : null
            }, { where: { id: getCompany.id, deleted_at: null } })

            //if company updated then will provide the updated details of company
            if (updatedCompany) {
                updatedCompany = await commonQuery.findCompanyByIdWithAttributes(getCompany.id, attributes)
                return res.status(codes.SUCCESS).json(constants.sendResponse(codes.SUCCESS, message.COMPANY_UPDATED_SUCCESSFULLY, updatedCompany));
            }

            return res.status(codes.INTERNAL_SERVER_ERROR).json({ message: message.SOMETHING_WENT_WRONG });
        } catch (error) {
            console.log('error----', error);
            return res.status(codes.INTERNAL_SERVER_ERROR).json({ message: message.INTERNAL_SERVER_ERROR });
        }
    },

    /**
     * This API Will delete company by id
     * @param req -Request
     * @param res -Response
     * @returns - Success message
     */
    deleteCompany: async (req: Request, res: Response) => {
        // const authUserId = req.user?.dataValues.id;
        let checkRole, getCompany, deleteCompany;
        const { id } = req.params;
        let message=constants.checkLanguageSetting(req.headers)
        try {
            //This method will check role of auth user and validate
            checkRole = await constants.checkRole(req.user, [roles.SUPER_ADMIN, roles.COMPANY])
            if (!checkRole) {
                throw constants.createError(codes.FORBIDDEN, message.FORBIDDEN_ACCESS, res)
            }

            //validation for id
            if (!id) {
                return res.status(codes.BAD_REQUEST).json(constants.sendResponse(codes.BAD_REQUEST, message.REQUIRED_FIELDS));
            }

            //finding company by id and selection some required attributes
            getCompany = await commonQuery.findCompanyById(id)
            if (!getCompany) {
                return res.status(codes.NOT_FOUND).json(constants.sendResponse(codes.NOT_FOUND, message.COMPANY_NOT_FOUND));
            }

            deleteCompany = await companyModel.update({ deleted_at: moment().format('YYYY-MM-DD HH:mm:ss') }, { where: { id } })
            if (deleteCompany) {
                return res.status(codes.SUCCESS).json(constants.sendResponse(codes.SUCCESS, message.COMPANY_DELETED_SUCCESSFULLY));
            }
            return res.status(codes.INTERNAL_SERVER_ERROR).json(constants.sendResponse(codes.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
        } catch (error) {
            console.log('error----', error);
            return res.status(codes.INTERNAL_SERVER_ERROR).json({ message: message.INTERNAL_SERVER_ERROR });
        }
    }

}
export default companyController