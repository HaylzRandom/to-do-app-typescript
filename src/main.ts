// Models
import FullList from './model/FullList';
import ListItem from './model/ListItem';

// Templates
import ListTemplate from './templates/ListTemplate';

// Styles
import './css/style.css';

const initApp = (): void => {
	const fullList = FullList.instance;
	const template = ListTemplate.instance;

	// Add to do item form
	const itemEntryForm = document.getElementById(
		'itemEntryForm'
	) as HTMLFormElement;

	// Add event listener for submit event
	itemEntryForm.addEventListener('submit', (e: SubmitEvent): void => {
		e.preventDefault();

		const input = document.getElementById('newItem') as HTMLInputElement;
		const newEntryText: string = input.value.trim();

		const itemId: number = fullList.list.length
			? parseInt(fullList.list[fullList.list.length - 1].id) + 1
			: 1;

		const newItem = new ListItem(itemId.toString(), newEntryText);

		fullList.addItem(newItem);

		input.value = '';

		template.render(fullList);
	});

	// Clear Items
	const clearItems = document.getElementById(
		'clearItemsButton'
	) as HTMLButtonElement;

	clearItems.addEventListener('click', (): void => {
		fullList.clearList();
		template.clear();
	});

	fullList.load();
	template.render(fullList);
};

// Listens for dom content has been loaded
document.addEventListener('DOMContentLoaded', initApp);
