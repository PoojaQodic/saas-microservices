import companyModel from "../models/companyModel"
import userModel from "../models/userModel"
import { Op } from "sequelize"

//This file contain common db quires which may going to use in all over the project.
const commonQuery = {

    findCompanyById: async (id: any) => {
        let getCompany = await companyModel.findOne({ where: { id: id, deleted_at: null } })
        return getCompany
    },
    findCompanyByIdWithAttributes: async (id: any,attributes:any) => {
        let getCompany = await companyModel.findOne({ where: { id: id, deleted_at: null },attributes })
        return getCompany
    },

    findUserById: async (id: any) => {
        let user = await userModel.findOne({where:{id,deleted_at:null}})
        return user
    },
    findUserByEmailPhone: async (email: any,phone:any) => {
        let user = await userModel.findOne({
            where:{
                [Op.or]:[{email},{phone}],
                deleted_at:null
            }})
        return user
    },
    getUserByIdAndCompany:async(id:any,company_id:any)=>{
        let findUser = await userModel.findOne({where: { id, deleted_at: null, company_id }})
        return findUser
    }

}

export default commonQuery