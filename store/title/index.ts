import { title } from './store';
import { setTitle } from './events';

title.on(setTitle, (_, anotherTitle) => anotherTitle);

export * from './events';
export * from './store';
