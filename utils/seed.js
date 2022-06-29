const connection = require('../config/connection');
const { User, Thought} = require('../models');


connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing users
  await User.deleteMany({});

  // Drop existing Thought
  await Thought.deleteMany({});

  
  // Drop existing Rection
  await Rection.deleteMany({});

  // Create empty array to hold the users
  const users= [];

  for (let i = 0; i < 20; i++) {
    
    const username = `user${i}`;
    const email = `user${i}@mail.com`
    const thoughts = []
    const reaction = []

    users.push({
      username,
      email,
      thoughts,
      reaction,
    });
  }

  // Add User to the collection and await the results
  await User.collection.insertMany(users);

  // Add Thought to the collection and await the results
  await Thought.collection.insertOne({
    thoughtText: 'example text',
    username: 'user1',
    reactions: []
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});