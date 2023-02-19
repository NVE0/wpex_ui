
import {faker} from '@faker-js/faker'

export default function Faker_Create_User() {
  
    const sex = faker.name.sexType();
    const firstName = faker.name.firstName(sex);
    const lastName = faker.name.lastName();
    const email = faker.internet.email(firstName, lastName);

    return {
        firstName,
        lastName,
        email,
    }

}
