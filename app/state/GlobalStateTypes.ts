import { Draft } from "immer";
import { UIModuleTypes } from "./modules/UIModule/UIModuleTypes";

export type GlobalStateTypes = UIModuleTypes;

export interface SetState<T> {
  (partial: Partial<T> | ((state: Draft<T>) => void), replace?: false): void;
  (partial: T | ((state: Draft<T>) => void), replace: true): void;
}

export type GetState<T> = () => T;

export interface GlobalStateApiType {
  set: SetState<GlobalStateTypes>;
  get: GetState<GlobalStateTypes>;
}
