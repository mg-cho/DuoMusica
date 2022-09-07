import {CognitoUserAttribute, CognitoUserPool} from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: "us-west-1_7HoI2wG4A",
    ClientId: "5ajpguadk3s02l1ltfe2qel8c1"
};

export default new CognitoUserPool(poolData);