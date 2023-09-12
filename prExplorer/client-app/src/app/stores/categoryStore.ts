import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";
import { Category } from "../models/category";

export default class CategoryStore {
  categoryRegistry = new Map<string, Category>();
  selectedCategory: Category | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  get categoriesSortedByName() {
    const categoryList = Array.from(this.categoryRegistry.values());
    categoryList.sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      return titleA.localeCompare(titleB);
    });
    return categoryList;
  }

  loadCategories = async () => {
    this.setLoadingInitial(true);
    try {
      const categories = await agent.Categories.list();
      categories.forEach((category) => {
        this.setCategory(category);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  loadCategory = async (id: string) => {
    let category = this.getCategory(id);
    if (category) {
      this.selectedCategory = category;
      return category;
    } else {
      this.loadingInitial = true;
      try {
        category = await agent.Categories.details(id);
        this.setCategory(category);
        runInAction(() => this.selectedCategory = category);
        this.setLoadingInitial(false);
        return category;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private setCategory = (category: Category) => {
    this.categoryRegistry.set(category.id, category);
  };

  private getCategory = (id: string) => {
    return this.categoryRegistry.get(id);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  createCategory = async (category: Category) => {
    this.loading = true;
    category.id = uuid();
    try {
      await agent.Categories.create(category);
      runInAction(() => {
        this.categoryRegistry.set(category.id, category);
        this.selectedCategory = category;
        this.editMode = false;
        this.loading = false;
        toast.success("Succesfully Created Category");
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateCategory = async (category: Category) => {
    this.loading = true;
    try {
      await agent.Categories.update(category);
      runInAction(() => {
        this.categoryRegistry.set(category.id, category);
        this.selectedCategory = category;
        this.editMode = false;
        this.loading = false;
        toast.success("Succesfully Edited Category");
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  deleteCategory = async (id: string) => {
    this.loading = true;
    try {
      await agent.Categories.delete(id);
      runInAction(() => {
        this.categoryRegistry.delete(id);
        this.loading = false;
        toast.success("Succesfully Deleted Category");
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
