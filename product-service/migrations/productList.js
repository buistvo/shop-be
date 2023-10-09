"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.availableProductsMock = exports.mockProducts = void 0;
exports.mockProducts = [
    {
        id: '1',
        title: 'Laptop',
        description: 'A high performance laptop for everyday use.',
        price: 1200.5,
    },
    {
        id: '2',
        title: 'Headphones',
        description: 'Noise-cancelling over-ear headphones.',
        price: 150.75,
    },
    {
        id: '3',
        title: 'Phone',
        description: 'Latest model smartphone with impressive camera.',
        price: 900.99,
    },
    {
        id: '4',
        title: 'Watch',
        description: 'An elegant timepiece for the modern individual.',
        price: 250.0,
    },
    {
        id: '5',
        title: 'Tablet',
        description: 'Convenient and portable tablet for on-the-go.',
        price: 300.25,
    },
    {
        id: '6',
        title: 'Camera',
        description: 'DSLR camera with 24MP and 4K video recording.',
        price: 800.5,
    },
    {
        id: '7',
        title: 'Keyboard',
        description: 'Mechanical RGB keyboard for gamers.',
        price: 110.25,
    },
    {
        id: '8',
        title: 'Mouse',
        description: 'Ergonomic wireless mouse with high DPI.',
        price: 50.99,
    },
    {
        id: '9',
        title: 'Backpack',
        description: 'Waterproof backpack with laptop compartment.',
        price: 70.2,
    },
    {
        id: '10',
        title: 'Smartwatch',
        description: 'Smartwatch with heart rate and sleep tracking.',
        price: 200.0,
    },
    {
        id: '11',
        title: 'Bluetooth Speaker',
        description: 'Portable speaker with 12 hours battery life.',
        price: 60.5,
    },
    {
        id: '12',
        title: 'Sunglasses',
        description: 'Polarized sunglasses with UV protection.',
        price: 90.75,
    },
    {
        id: '13',
        title: 'Shoes',
        description: 'Running shoes with breathable material.',
        price: 85.0,
    },
    {
        id: '14',
        title: 'Water Bottle',
        description: 'Stainless steel insulated water bottle.',
        price: 25.1,
    },
    {
        id: '15',
        title: 'Umbrella',
        description: 'Windproof travel umbrella with automatic open/close.',
        price: 15.9,
    },
];
exports.availableProductsMock = exports.mockProducts.map((pr) => ({
    ...pr,
    count: Math.random() * 100,
}));
