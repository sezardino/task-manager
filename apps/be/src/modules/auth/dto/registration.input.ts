import { InputType } from '@nestjs/graphql';
import { CreateUserInput } from 'src/modules/users/dto/create-user.input';

@InputType()
export class RegistrationInput extends CreateUserInput {}
