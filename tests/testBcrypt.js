import bcrypt from 'bcrypt';

const testPassword = 'password123';
const storedHash = '$2b$10$b1uCCnQcal5BUzeLzXwZKOcPD1/8i5t8nyqQBllX1UVe1hzqp10dS';

// Test comparison directly
bcrypt.compare(testPassword, storedHash, (err, result) => {
    if (err) throw err;
    console.log('Password match result:', result); // Should output true if the hashes match
});

async function run() {
    const isMatch = await bcrypt.compare(testPassword, storedHash);
    console.log(isMatch);
}