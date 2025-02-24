import { ObjectType } from '@nestjs/graphql';
import { GqlOrganizationUser } from '../entities/organization-user.entity';

@ObjectType()
export class OrganizationUserPayload extends GqlOrganizationUser {}
