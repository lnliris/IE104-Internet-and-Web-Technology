import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Member from './models/member-model.js';  // Adjust path as needed
import Account from './models/account-model.js';  // Adjust path as needed

// Connect to MongoDB
mongoose.connect(`mongodb+srv://22520749:${process.env.MONGODB_PASSWORD}@cluster0.1qcpp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log('MongoDB connection error: ', err));

// Function to create a new user
const createUser = async () => {
    try {
        // Create a new member (user profile)
        const member = new Member({
            name: 'Jane Doe',
            email: 'janedoe@example.com',
            phone: '123-456-7890',
            dateOfBirth: new Date('1990-01-01'),
            gender: 'Nam',
            avatar: '', // Optional: set avatar URL if needed
        });
        await member.save();
        console.log('Member created successfully');

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash('MyP@ssw0rd', 10);

        // Create a new account (user credentials)
        const account = new Account({
            memberId: member._id,
            username: 'janedoe', // Change username as needed
            password: hashedPassword, // Store the hashed password
        });
        await account.save();
        console.log('Account created successfully');
    } catch (err) {
        console.log('Error creating user: ', err);
    } finally {
        // Close the MongoDB connection
        mongoose.connection.close();
    }
};

// Run the function to create the user
createUser();
