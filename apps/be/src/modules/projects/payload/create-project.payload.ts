import { ObjectType } from '@nestjs/graphql';
import { GqlProject } from '../entities/project.entity';

@ObjectType()
export class CreateProjectPayload extends GqlProject {}
