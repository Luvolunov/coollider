import { $titleStore } from './store';
import { setTitle } from './events';

$titleStore.on(setTitle, (_, anotherTitle) => anotherTitle);

export * from './events';
export * from './store';
