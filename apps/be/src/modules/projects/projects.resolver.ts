import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AllProjectsInput } from './dto/all-projects.input';
import { CreateProjectInput } from './dto/create-project.input';
import { OneProjectInput } from './dto/one-project.input';
import { GqlProject } from './entities/project.entity';
import { CreateObjectPayload } from './payload/create-project.payload';
import { OneProjectPayload } from './payload/one-project.payload';
import { ProjectsService } from './projects.service';

@Resolver(() => GqlProject)
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) {}

  @Mutation(() => CreateObjectPayload)
  createProject(@Args('input') createProjectInput: CreateProjectInput) {
    return this.projectsService.create(createProjectInput);
  }

  @Query(() => [GqlProject], { name: 'projects' })
  findAll(@Args('input') input: AllProjectsInput) {
    return this.projectsService.findAll(input);
  }

  @Query(() => OneProjectPayload, { name: 'project' })
  findOne(@Args('input') input: OneProjectInput) {
    return this.projectsService.findOne(input);
  }
}
