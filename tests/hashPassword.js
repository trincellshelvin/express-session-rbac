import bcrypt from 'bcrypt';

const password = 'password123';

bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;
    console.log('Manually hashed password:', hash);
});

async function run() {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(password);
    console.log(salt);
    console.log(hashedPassword);
}

run();