import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { GqlUser } from 'src/modules/users/entities/user.entity';

@ObjectType()
class GqlProjectOwner extends OmitType(GqlUser, [
  'organizationMemberships',
  'organizationsOwned',
] as const) {}

@ObjectType()
export class GqlProject {
  @Field()
  @IsUUID()
  id: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description: string | null;

  @Field(() => GqlProjectOwner, { nullable: true })
  owner: GqlProjectOwner;
}
