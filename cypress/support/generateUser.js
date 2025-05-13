import { faker } from '@faker-js/faker';

const generateUser = () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const age = Math.ceil(Math.random() * 72) + 18;
  const email = faker.internet.email();
  const salary = Math.ceil(Math.random() * 80000) + 20000;
  const department = faker.commerce.department();

  return { firstName, lastName, age, email, salary, department };
};

export default generateUser;
