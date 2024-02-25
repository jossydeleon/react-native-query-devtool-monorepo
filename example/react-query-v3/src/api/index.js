import { faker } from "@faker-js/faker";

const usersStorage = [];

// Create new user
export const postUser = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const user = {
    id: Date.now(),
    fullname: faker.person.fullName(),
    gender: faker.person.sex(),
    jobTitle: faker.person.jobTitle(),
    email: faker.internet.email(),
    avatar: faker.image.urlLoremFlickr(),
  };

  usersStorage.push(user);

  return user;
};

// Get all users
export const getUsers = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return usersStorage;
};

// Get single user by id
export const getSingleUser = async (userId) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const user = usersStorage.find((user) => user.id === userId);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
