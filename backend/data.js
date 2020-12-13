import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Kevin',
      email: 'admin@bulkUP.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: true,
    },
    {
      name: 'John',
      email: 'user@example.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'Persimmons',
      category: 'Fruit',
      image: '/images/persimmons.jpg',
      price: 7,
      countInStock: 10,
      brand: 'Farm',
      rating: 4.5,
      numReviews: 60,
      description: 'Fresh and ripe persimmons grown locally in San Diego. Price per lbs.',
    },
    {
      name: 'Bananas',
      category: 'Fruit',
      image: '/images/bananas.jpg',
      price: 5,
      countInStock: 20,
      brand: 'Farm',
      rating: 4.0,
      numReviews: 201,
      description: 'high quality product',
    },
    {
      name: 'Oranges',
      category: 'Fruit',
      image: '/images/oranges.jpg',
      price: 3,
      countInStock: 0,
      brand: 'Farm',
      rating: 4.8,
      numReviews: 97,
      description: 'high quality product',
    },

  ],
};
export default data;
