import { Model, DataTypes, Optional } from "sequelize";
import sequelize from '../../config/dbconnection'
import { state, city } from '../helpers/messagesAndCode'

const Company : any = sequelize.define('companies', {
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
        defaultValue: null
    },
    company_address: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    city: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        validate: {
            isIn: [[city.AHEMDABAD, city.GANDHINAGAR, city.LAS_VEGAS]]
        }
    },
    state: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        validate: {
            isIn: [[state.GUJRAT, state.MP, state.NAVADA]]
        }
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: null
    },
    is_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    logo: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
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
        defaultValue: null
    }
})

export default Company;
