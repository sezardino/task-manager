import { ObjectType } from '@nestjs/graphql';
import { GqlProject } from '../entities/project.entity';

@ObjectType()
export class CreateObjectPayload extends GqlProject {}
