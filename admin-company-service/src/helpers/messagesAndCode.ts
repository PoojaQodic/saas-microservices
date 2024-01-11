//static message
export const messageEn = {
    UNAUTHORIZED: 'Authorization Required',
    FORBIDDEN_ACCESS: 'Forbidden Access',
    REQUIRED_FIELDS: 'Please Pass Required fields',
    NOT_FOUND: 'Not Found',
    INVALID_CREDENTIALS: 'Invalid Credentials',
    LOGIN_SUCCESSFULLY: 'Login Successfully',
    COMPANY_ALREADY_EXISTS:'Company Already exists',
    COMPANY_CREATED_SUCCESSFULLY:'Company Created Successfully',
    LIST_COMPANY_SUCCESSFULLY:'Company List Successfully',
    INTERNAL_SERVER_ERROR:'Internal Server Error',
    GET_COMPANY_SUCCESSFULLY:'Get Company Successfully',
    COMPANY_NOT_FOUND:'Company Not Found',
    SOMETHING_WENT_WRONG:'Something Went Wrong',
    INVITE_COMPANY:'You Have Invited to verify & Set Password',
    INVALID_MATCH_PASSWORD:'Please provide the same password in both fields!',
    SET_PASSWORD_SUCCESSFULLY:'Set Password Successfully',
    COMPANY_UPDATED_SUCCESSFULLY:'Company Updated Successfully',
    PHONE_ALREADY_EXIST:'Please Pass Another Phone Number',
    EMAIL_ALREADY_EXISTS:'Please check email or phone number has already exist in our system',
    USER_CREATED_SUCCESSFULLY:'User Is Created Successfully',
    TOKEN_IS_REQUIRED:'Token Is Required',
    PLEASE_PASS_MODULE_FOR_SET_PASSWORD:'Please Provide The Module For Set Password',
    USER_GET_SUCCESSFULLY:'User Get Successfully',
    COMPANY_DELETED_SUCCESSFULLY:'Company Deleted Successfully',
    USER_DELETED_SUCCESSFULLY:'User Deleted Successfully',
    USER_NOT_FOUND:'User Not Found',
    USER_LIST_SUCCESSFULLY:'User List Successfully'
}

export const messageFrench = {
    UNAUTHORIZED: 'Autorisation requise',
    FORBIDDEN_ACCESS: 'Accès interdit requis',
    REQUIRED_FIELDS: 'Veuillez transmettre les champs obligatoires',
    NOT_FOUND: 'Pas trouvé',
    INVALID_CREDENTIALS: "Les informations d'identification invalides",
    LOGIN_SUCCESSFULLY: 'Connectez-vous avec succès',
    COMPANY_ALREADY_EXISTS:"L'entreprise existe déjà",
    COMPANY_CREATED_SUCCESSFULLY:'Entreprise créée avec succès',
    LIST_COMPANY_SUCCESSFULLY:'Liste des entreprises avec succès',
    INTERNAL_SERVER_ERROR:'Erreur interne du serveur',
    GET_COMPANY_SUCCESSFULLY:'Créer une entreprise avec succès',
    COMPANY_NOT_FOUND:'Entreprise introuvable',
    SOMETHING_WENT_WRONG:"Quelque chose s'est mal passé",
    INVITE_COMPANY:'Vous avez invité à vérifier et définir le mot de passe',
    INVALID_MATCH_PASSWORD:'Veuillez fournir le même mot de passe dans les deux champs !',
    SET_PASSWORD_SUCCESSFULLY:'Définir le mot de passe avec succès',
    COMPANY_UPDATED_SUCCESSFULLY:'Société mise à jour avec succès',
    PHONE_ALREADY_EXIST:'Veuillez transmettre un autre numéro de téléphone',
    EMAIL_ALREADY_EXISTS:"Veuillez vérifier que l'e-mail ou le numéro de téléphone existe déjà dans notre système",
    USER_CREATED_SUCCESSFULLY:"L'utilisateur est créé avec succès",
    TOKEN_IS_REQUIRED:'Le jeton est requis',
    PLEASE_PASS_MODULE_FOR_SET_PASSWORD:'Veuillez fournir le module pour définir le mot de passe',
    USER_GET_SUCCESSFULLY:"L'utilisateur obtient avec succès",
    COMPANY_DELETED_SUCCESSFULLY:'Société supprimée avec succès',
    USER_DELETED_SUCCESSFULLY:'Utilisateur supprimé avec succès',
    USER_NOT_FOUND:'Utilisateur non trouvé',
    USER_LIST_SUCCESSFULLY:'Liste des utilisateurs avec succès'
}

//HTTP codes
export const codes = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    NOT_ACCEPTABLE: 406
}

//static state ids
export const state={
    NAVADA:1,
    GUJRAT:2,
    MP:3
}

//static city ids
export const city={
    LAS_VEGAS:1,
    AHEMDABAD:2,
    GANDHINAGAR:3
}

//satic roles
export const roles = {
    SUPER_ADMIN: 1,
    COMPANY: 2,
    SALES_USER: 3,
    SALES_MANAGER: 4
}
