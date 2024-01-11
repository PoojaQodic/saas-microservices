import express from 'express';
import companyController from '../controllers/companyController'
import {authenticateUser} from '../middleware/authMiddleware'

const route=express.Router()

//for crete company
route.post('/',authenticateUser,companyController.createCompany)

//for get all list of companies
route.get('/',authenticateUser,companyController.listCompany)

//for get company by id
route.get('/:id',authenticateUser,companyController.getCompanyById)

//for get company by id & update 
route.patch('/:id',authenticateUser,companyController.updateCompany)

//for get company by id & delete 
route.delete('/:id',authenticateUser,companyController.deleteCompany)

export default route
