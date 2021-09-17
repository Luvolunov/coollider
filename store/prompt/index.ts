import { $promptStore } from './store';
import { setPrompt } from './events';

$promptStore.on(setPrompt, (_, anotherTitle) => anotherTitle);

export * from './events';
export * from './store';
