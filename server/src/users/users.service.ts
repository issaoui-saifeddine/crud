import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/dto/users.dto';
import { user, userDocument } from 'src/models/users.models';
import { faker } from '@faker-js/faker';

@Injectable()
export class UsersService {
  constructor(@InjectModel(user.name) private userModel: Model<userDocument>) {}
  Add(body: UserDto) {
    return this.userModel.create(body);
  }

  FindAll() {
    return this.userModel.find();
  }

  FindOne(id: string) {
    return this.userModel.findOne({ _id: id });
  }

  Update(id: string, body: UserDto) {
    return this.userModel.findByIdAndUpdate(
      { _id: id },
      { $set: body },
      { new: true },
    );
  }

  Delete(id: string) {
    return this.userModel.deleteOne({ _id: id });
  }
  
  Search(key: string) {
    const keyword = key
      ? {
          $or: [
            { fullname: { $regex: key, $options: 'i' } },
            { email: { $regex: key, $options: 'i' } },
          ],
        }
      : {};
    return this.userModel.find(keyword);
  }
  Faker() {
    for (let index = 0; index < 30; index++) {
      const fakeUser = {
        fullname: faker.name.fullName(),
        email: faker.internet.email(),
        age: 30,
        country: faker.address.city(),
      };
  
      // Assure-toi de ne pas définir d'ID explicitement
      this.userModel.create(fakeUser);
    }
    return 'success';
  }
  
}
