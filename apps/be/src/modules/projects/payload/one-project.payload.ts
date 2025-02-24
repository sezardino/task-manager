import { ObjectType } from '@nestjs/graphql';
import { GqlProject } from '../entities/project.entity';

@ObjectType()
export class OneProjectPayload extends GqlProject {}
