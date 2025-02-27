import { Field, Int, ObjectType, OmitType } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { GqlUser } from 'src/modules/users/entities/user.entity';

@ObjectType()
class GqlProjectOwner extends OmitType(GqlUser, [
  'organizationMemberships',
  'organizationsOwned',
] as const) {}

@ObjectType()
export class GqlProject {
  @Field()
  @IsMongoId()
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

  @Field(() => Int)
  membersCount: number;
}
