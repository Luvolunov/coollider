/* eslint-disable import/prefer-default-export */
import { createEvent } from 'effector-next';

export const setPrompt = createEvent<Event>('prompt');
