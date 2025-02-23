import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { AllProjectsInput } from './dto/all-projects.input';
import { CreateProjectInput } from './dto/create-project.input';
import { OneProjectInput } from './dto/one-project.input';
import { GqlProject } from './entities/project.entity';
import { AllProjectsPayload } from './payload/all-projects.payload';
import { OneProjectPayload } from './payload/one-project.payload';
import { ProjectsService } from './projects.service';
import { CreateProjectPayload } from './payload/create-project.payload';

@Resolver(() => GqlProject)
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) {}

  @Mutation(() => CreateProjectPayload)
  createProject(
    @Args('input') input: CreateProjectInput,
    @CurrentUser('id') userId: string,
  ) {
    return this.projectsService.create(userId, input);
  }

  @Query(() => AllProjectsPayload, { name: 'projects' })
  findAll(@Args('input') input: AllProjectsInput) {
    return this.projectsService.findAll(input);
  }

  @Query(() => OneProjectPayload, { name: 'project' })
  findOne(@Args('input') input: OneProjectInput) {
    return this.projectsService.findOne(input);
  }
}
