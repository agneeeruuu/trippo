import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name: 'Agnes',
            email: 'admin@example.com',
            password: bcrypt.hashSync('agneeeruuu', 8),
            isAdmin: true,
        },
        {
            name: 'Ian',
            email: 'ian@example.com',
            password: bcrypt.hashSync('iannn', 8),
            isAdmin: false
        },
    ],
    products: [
        {
            // _id: '1',
            name: 'Mount 1',
            category: 'Mount',
            image: '/images/p1.jpg',
            price: 120,
            countInStock: 5,
            brand: 'Jade',
            rating: 4,
            numReviews: 10,
            description: 'Jade Main Peak 3952M',
        },
        {
            // _id: '2',
            name: 'Mount 2',
            category: 'Mount',
            image: '/images/p2.jpg',
            price: 160,
            countInStock: 5,
            brand: 'Taroko',
            rating: 3,
            numReviews: 10,
            description: 'HeHuan North Peak 3422M',
        },
        {
            // _id: '3',
            name: 'Mount 3',
            category: 'Mount',
            image: '/images/p3.jpg',
            price: 180,
            countInStock: 0,
            brand: 'Shei-Pa',
            rating: 4,
            numReviews: 10,
            description: 'Syue Mountain 3886M',
        },
        {
            // _id: '4',
            name: 'Mount 4',
            category: 'Mount',
            image: '/images/p4.jpg',
            price: 100,
            countInStock: 5,
            brand: 'Shei-Pa',
            rating: 5,
            numReviews: 10,
            description: 'Mount Sylvania 3490M',
        },
        {
            // _id: '5',
            name: 'Sea 5',
            category: 'Sea',
            image: '/images/p5.jpeg',
            price: 120,
            countInStock: 5,
            brand: 'El Nido',
            rating: 5,
            numReviews: 10,
            description: 'Scuba Diving El Nido',
        },
        {
            // _id: '6',
            name: 'Sea 6',
            category: 'Sea',
            image: '/images/p6.jpeg',
            price: 150,
            countInStock: 1,
            brand: 'El Nido',
            rating: 4.5,
            numReviews: 10,
            description: 'Freediving El Nido',
        },
    ]
}

export default data;