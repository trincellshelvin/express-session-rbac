import bcrypt from 'bcrypt';

const testPassword = 'adminpassword123';
const storedHash = '$2b$10$sc4iTRCt0zqLJN9kAvKfJOWRqvtSFJepCfuo6GWNjvTVYMR.pHjiW';

// Test comparison directly
bcrypt.compare(testPassword, storedHash, (err, result) => {
    if (err) throw err;
    console.log('Password match result:', result); // Should output true if the hashes match
});

async function run() {
    const isMatch = await bcrypt.compare(testPassword, storedHash);
    console.log(isMatch);
}