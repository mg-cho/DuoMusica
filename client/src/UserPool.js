import {CognitoUserAttribute, CognitoUserPool} from 'amazon-cognito-identity-js';
import poolData from './config.js'


export default new CognitoUserPool(poolData);