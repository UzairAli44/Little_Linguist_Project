import { categories } from '../data/categories';
import { Injectable } from '@angular/core';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly CATEGORIES_KEY = 'categories';
  private readonly NEXT_ID_KEY = 'nextId';
  private readonly TOTAL_GAME_KEY = 'totalGames';
  private readonly TOTAL_POINTS = 'totalPoints';
  private getCategories(): Category[] {
    let categoriesString = localStorage.getItem(this.CATEGORIES_KEY);
  
    if (!categoriesString) {
      return [];
    } else {
      return JSON.parse(categoriesString);
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
    return this.getCategories().find(category => category.id === id);
  }  
  delete(id: number): void {
    let categoriesArray = this.getCategories();
    let index = categoriesArray.findIndex(cat => cat.id === id);
    if (index !== -1) {
        categoriesArray.splice(index, 1);
        this.setCategories(categoriesArray);
    }
  }
  update(category: Category): void {
    let categoriesArray = this.getCategories();
  
    category.lastUpdateDate = new Date();
  
    // Find the index of the category with the same id and replace it with the updated category
    let index = categoriesArray.findIndex(cat => cat.id === category.id);
    if (index !== -1) {
      categoriesArray[index] = category;
    } else {
      console.error(`Category with ID ${category.id} not found.`);
    }
  
    this.setCategories(categoriesArray);
  }
  
  add(category: Category): void {
    category.id = this.getNextId();
    category.lastUpdateDate = new Date();
  
    let categoriesArray = this.getCategories();
    categoriesArray.push(category);
  
    this.setCategories(categoriesArray);
    this.setNextId(category.id + 1);
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
  shuffle(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
