import { ObjectType } from '@nestjs/graphql';
import { RegistrationPayload } from 'src/modules/auth/payload/registration.payload';

@ObjectType()
export class ProcessOrganizationInvitePayload extends RegistrationPayload {}
