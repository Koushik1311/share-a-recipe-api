import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { IngredientsService } from './ingredients.service';
import { Ingredient } from './entities/ingredient.entity';
import { CreateIngredientInput } from './dto/create-ingredient.input';
import { UpdateIngredientInput } from './dto/update-ingredient.input';

@Resolver(() => Ingredient)
export class IngredientsResolver {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Mutation(() => Ingredient)
  createIngredient(
    @Args('createIngredientInput') createIngredientInput: CreateIngredientInput,
  ) {
    return this.ingredientsService.create(createIngredientInput);
  }

  @Query(() => [Ingredient], { name: 'ingredients' })
  findAll() {
    return this.ingredientsService.findAll();
  }

  @Query(() => Ingredient, { name: 'ingredient' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.ingredientsService.findOne(id);
  }

  @Mutation(() => Ingredient)
  updateIngredient(
    @Args('id', { type: () => String }) id: string,
    @Args('updateIngredientInput') updateIngredientInput: UpdateIngredientInput,
  ) {
    return this.ingredientsService.update(id, updateIngredientInput);
  }

  @Mutation(() => Ingredient)
  removeIngredient(@Args('id', { type: () => String }) id: string) {
    return this.ingredientsService.remove(id);
  }
}
