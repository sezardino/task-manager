import { Field, InputType, PickType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { GqlProject } from '../entities/project.entity';

@InputType()
export class CreateProjectInput extends PickType(GqlProject, [
  'name',
  'description',
] as const) {
  @Field()
  @IsUUID()
  organizationId: string;

  @Field()
  @IsUUID()
  ownerId: string;
}
