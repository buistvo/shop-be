"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.availableProductsMock = exports.mockProducts = void 0;
exports.mockProducts = [
    {
        id: 'ae9e233d-37f2-4f09-b4fc-63228c07762c',
        title: 'Laptop',
        description: 'A high performance laptop for everyday use.',
        price: 1200.5,
    },
    {
        id: '76145aca-c68a-4001-9390-ebea8f44b223',
        title: 'Headphones',
        description: 'Noise-cancelling over-ear headphones.',
        price: 150.75,
    },
    {
        id: '12d8229b-76f7-4fc8-9d38-cc14b6212197',
        title: 'Phone',
        description: 'Latest model smartphone with impressive camera.',
        price: 900.99,
    },
    {
        id: 'cc4a4c67-fbcc-4eae-9238-a1aa8fd64fdd',
        title: 'Watch',
        description: 'An elegant timepiece for the modern individual.',
        price: 250.0,
    },
    {
        id: '05102694-e60f-4ba6-96bf-cef04a7ce69b',
        title: 'Tablet',
        description: 'Convenient and portable tablet for on-the-go.',
        price: 300.25,
    },
    {
        id: '4aa8c0ad-3f77-4445-bf59-99e52bfa69b9',
        title: 'Camera',
        description: 'DSLR camera with 24MP and 4K video recording.',
        price: 800.5,
    },
    {
        id: '70807f12-4ce9-4de8-ba62-e096327c110a',
        title: 'Keyboard',
        description: 'Mechanical RGB keyboard for gamers.',
        price: 110.25,
    },
    {
        id: '00b96df0-aa0b-46d3-ad0e-cd59a291ab2e',
        title: 'Mouse',
        description: 'Ergonomic wireless mouse with high DPI.',
        price: 50.99,
    },
    {
        id: '35a9f9b4-625e-4156-93e9-9b233c01ba95',
        title: 'Backpack',
        description: 'Waterproof backpack with laptop compartment.',
        price: 70.2,
    },
    {
        id: 'd9b618c1-5b28-4d8c-bb50-e059f04a87bd',
        title: 'Smartwatch',
        description: 'Smartwatch with heart rate and sleep tracking.',
        price: 200.0,
    },
    {
        id: '5b38cb78-c2bc-4d64-9d94-afac9018493f',
        title: 'Bluetooth Speaker',
        description: 'Portable speaker with 12 hours battery life.',
        price: 60.5,
    },
    {
        id: '3997caa1-5a93-4df3-8bb5-d4da07df387b',
        title: 'Sunglasses',
        description: 'Polarized sunglasses with UV protection.',
        price: 90.75,
    },
    {
        id: '797801de-4886-47f6-8121-7e93768eb19e',
        title: 'Shoes',
        description: 'Running shoes with breathable material.',
        price: 85.0,
    },
    {
        id: '87ce0fb5-8668-416e-b180-5a42100bba95',
        title: 'Water Bottle',
        description: 'Stainless steel insulated water bottle.',
        price: 25.1,
    },
    {
        id: '70d925df-12d5-4256-99da-73a9552c6971',
        title: 'Umbrella',
        description: 'Windproof travel umbrella with automatic open/close.',
        price: 15.9,
    },
];
exports.availableProductsMock = exports.mockProducts.map((pr, index) => ({
    ...pr,
    count: index < 5 ? 0 : index,
}));
