"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
const productList_1 = require("./productList");
process.env.AWS_SDK_LOAD_CONFIG = '1';
const dynamoDB = new aws_sdk_1.DynamoDB.DocumentClient();
const productPromises = [];
const stockPromises = [];
const addTestData = async () => {
    const products = productList_1.mockProducts;
    for (const [index, product] of products.entries()) {
        const productData = {
            TableName: 'products',
            Item: {
                ...product,
            },
        };
        const stockData = {
            TableName: 'stocks',
            Item: {
                product_id: product.id,
                count: index < 5 ? 0 : index,
            },
        };
        productPromises.push(dynamoDB.put(productData).promise());
        stockPromises.push(dynamoDB.put(stockData).promise());
        await Promise.all(productPromises);
        await Promise.all(stockPromises);
        console.log('Test data has been added');
    }
};
addTestData().catch((error) => {
    console.error('Error:', error);
});
