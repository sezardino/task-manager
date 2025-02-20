import { InputType } from '@nestjs/graphql';
import { CreateOwnerUserInput } from 'src/modules/users/dto/create-user.input';

@InputType()
export class RegistrationInput extends CreateOwnerUserInput {}
