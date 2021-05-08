/* eslint-disable import/prefer-default-export */
import { createEvent } from 'effector-next';

export const setTitle = createEvent<string>('set-title');
