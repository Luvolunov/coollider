/* eslint-disable import/prefer-default-export */
import { createStore } from 'effector-next';

export const $promptStore = createStore<Event | null>(null);
