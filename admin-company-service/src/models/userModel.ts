import { DataTypes  } from "sequelize";
import sequelize from '../../config/dbconnection'
import { state } from "../helpers/messagesAndCode";
import Company from "./companyModel";

const User:any = sequelize.define('users',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:null
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:null
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:null,
        validate:{
            isIn:[[state.GUJRAT,state.NAVADA,state.MP]]
        }
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue:null
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:null
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:null
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date_of_birth: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue:null
    },
    profile_pic: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:null
    },
    is_subuser: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue:false
    },
    company_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue:null
    },
    is_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
        field: 'created_at'
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
        field: 'modified_at'
    },
    deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue:null
    },
})

User.belongsTo(Company, { foreignKey: 'company_id' });


export default User;
