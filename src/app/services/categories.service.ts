import { categories } from './../../shared/data/categories';
import { Injectable } from '@angular/core';
import { Category } from '../../shared/model/category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly CATEGORIES_KEY = 'categories';
  private readonly NEXT_ID_KEY = 'nextId';
  private readonly TOTAL_GAME_KEY = 'totalGames';
  private readonly TOTAL_POINTS = 'totalPoints';
  private getCategories(): Map<number, Category> {
    let categoriesString = localStorage.getItem(this.CATEGORIES_KEY);

    if (!categoriesString) {
      return new Map<number, Category>();
    } else {
      return new Map<number, Category>(JSON.parse(categoriesString));
    }
  }

  private getNextId(): number {
    let nextIdString = localStorage.getItem(this.NEXT_ID_KEY);

    return nextIdString ? parseInt(nextIdString) : 0;
  }
  private setCategories(list: any): void {
    localStorage.setItem(this.CATEGORIES_KEY, JSON.stringify(Array.from(list)));
  }

  private setNextId(id: number): void {
    localStorage.setItem(this.NEXT_ID_KEY, id.toString());
  }

  list(): Category[] {
    return Array.from(this.getCategories().values());
  }

  get(id: number): Category | undefined {
    return this.getCategories().get(id);
  }
  delete(id: number): void {
    let categoriesMap = this.getCategories();

    if (categoriesMap.has(id)) {
      categoriesMap.delete(id);
      this.setCategories(categories);
      console.log(`Category with ID ${id} deleted successfully.`);
    } else {
      console.error(`Category with ID ${id} not found.`);
    }
  }
  update(category: Category): void {
    let categoriesMap = this.getCategories();

    category.lastUpdateDate = new Date();
    categoriesMap.set(category.id, category);

    this.setCategories(categoriesMap);
  }

  add(category: Category): void {
    category.id = this.getNextId();
    category.lastUpdateDate = new Date();

    let categoriesMap = this.getCategories();
    categoriesMap.set(category.id, category);

    this.setCategories(categoriesMap);
    this.setNextId(++category.id);
  }
  setNumberOfGames(count: any): void {
    localStorage.setItem(this.TOTAL_GAME_KEY, JSON.stringify(count));
  }
  getNumberOfGames(): number {
    const numberOfGamesString = localStorage.getItem(this.TOTAL_GAME_KEY);

    if (!numberOfGamesString) {
      return 0; // Default value when no data is found
    } else {
      return parseInt(numberOfGamesString, 10); // Parse string to integer
    }
  }
  setTotalPoints(count: any): void {
    localStorage.setItem(this.TOTAL_POINTS, JSON.stringify(count));
  }
  getTotalPoints(): number {
    const numberOfGamesString = localStorage.getItem(this.TOTAL_POINTS);

    if (!numberOfGamesString) {
      return 0; // Default value when no data is found
    } else {
      return parseInt(numberOfGamesString, 10); // Parse string to integer
    }
  }
}
