const db = require("./database");
const User = require("../models/user");
const Animal = require("../models/animals")

async function seed() {
    User.hasMany(Animal, {foreignKey:"postedById",as:"Poster"});
    Animal.belongsTo(User, {foreignKey:"postedById",as:"Poster"})

    User.belongsToMany(Animal, {
        through: "animal_user",
        as: "requests",
        foreignKey: "user_id",
    });

    Animal.belongsToMany(User, {
        through: "animal_user",
        as: "applicants",
        foreignKey: "animal_id",
    });

    await db.sync({force: true});

    console.log("db synced!");

    const thomas = await User.create({
        email: "test@test.com",
        password: "mo",
        firstName: "mo",
        lastName: "mo"
    });

    const newAnimal = await Animal.create(
        {
            name: "name",
            description: "description",
            age: 2,
            type: "dog",
            breed: "breed",
            address: "address",
            postedById: 1

        })
}

async function runSeed() {
    console.log("seeding...");
    try {

        await seed();
    } catch (err) {
        console.error(err);
        process.exitCode = 1;
    } finally {
        console.log("closing db connection");
        await db.close();
        console.log("db connection closed");
    }
}

if (module === require.main) {
    runSeed();
}
