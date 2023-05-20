import * as constants from './constants.js';

let params = new URLSearchParams(window.location.search);

function getSize() {
	/** @type {number} */
	let size;

	let sizeParam = params.get('size');
	if (sizeParam) {
		let intSize = Math.round(parseInt(sizeParam));
		size = intSize?intSize:5;
	} else {
		size = 5;
	}
	
	return size;
}

function getGuesses(size) {
	switch (size) {
		case 3: return 8;
		case 4: return 7;
		case 5: return 6;
		case 6: return 5;
		case 7: return 4;
		default: throw Error("Invalid size param");
	}
}

function setTitle(size) {
	let title;
	switch (size) {
		case 3: title = "SHORTLE"; break;
		case 4: title = "FOURDLE"; break;
		case 5: title = "5-DLE"; break; // TODO
		case 6: title = "MOREDLE"; break;
		case 7: title = "7-DLE"; break;
		default: title = "Title Not Implemented";
	}
	document.getElementById('title').innerHTML = title;
}

const WORDLE_WORD_LENGTH = getSize();
const WORDLE_GUESSES = getGuesses(WORDLE_WORD_LENGTH);
setTitle(WORDLE_WORD_LENGTH);

let IS_HARDMODE = false; // TODO: add menu for this
let gameover = false;
let guessing = false; // TODO: this is NOT a good way to do this lmao

function displayToast(message) {
	let toast = document.createElement('div');
	toast.innerHTML = message;
	document.getElementById('game-toast-container').prepend(toast);
	toast.className = 'game-toast';
	
	// wait a bit before adding "fadeout" class to toast
	setTimeout(() => {toast.classList.add('fadeout');}, 1000);
	
	// wait until fade out is complete then remove toast
	setTimeout(() => {toast.remove();}, 1300);
}

// TODO: i think this can be done in pure CSS but idk how
function getGameWidth() {
	const board_height = document.getElementById('board-container').clientHeight;
	const grid_height = board_height - 20;
	const row_height = (grid_height - (WORDLE_GUESSES-1) * 5 // 5px grid padding
	) / WORDLE_GUESSES;
	
	return WORDLE_WORD_LENGTH * row_height // cell widths
		+ (WORDLE_WORD_LENGTH - 1) * 5 // 5 px grid spacing
		+ 10 * 2; // 10 px margin on board-grid
}
function resizeBoard(board_grid) {board_grid.style.width = `${getGameWidth()}px`;}


function getAnswerLists(word_length) {
	switch (word_length) {
		case 3: return [constants.SHORTLE_POSSIBLE_ANSWERS, constants.SHORTLE_POSSIBLE_ANSWERS]; // TODO
		case 4: return [constants.FOURDLE_POSSIBLE_ANSWERS, constants.FOURDLE_POSSIBLE_ANSWERS]; // TODO
		case 5: return [constants.WORDLE_VALID_GUESSES, constants.WORDLE_POSSIBLE_ANSWERS];
		default: throw new Error("Board size not implemented yet");
	}
}

function getWordleAnswer(answer_list) {
	// const today = new Date();
	// const start = new Date(constants.START_DATE);
	
	// const days_since_start = Math.floor((today - start) / (1000 * 60 * 60 * 24));
	
	// [days_since_start % answer_list.length]
	
	const n = Math.round(Math.random()*answer_list.length)
	
	return answer_list[n];
}


function initializeBoard(board_width, board_height) {
	let board_container = document.getElementById('board-container');
	
	if (!board_container)
		throw new Error("unreachable")
	
	while (board_container.firstChild) {
		board_container.removeChild(board_container.firstChild).remove();
	}
	
	document.documentElement.style.setProperty('--board-width', board_width.toString());
	document.documentElement.style.setProperty('--board-height', board_height.toString());
	
	let board_grid = document.createElement('div');
	board_grid.className = 'board-grid';
	
	board_container.appendChild(board_grid);
	
	for (let i = 0; i < board_height; ++i) {
		let row = document.createElement('div');
		row.className = 'board-row';
		
		for (let j = 0; j < board_width; ++j) {
			let cell_wrapper = document.createElement('div');
			cell_wrapper.className = 'board-cell-wrapper';
			
			let cell = document.createElement('div');
			cell_wrapper.appendChild(cell);
			cell.className = 'board-cell';
			cell.setAttribute('state', 'empty');
			row.appendChild(cell_wrapper);
		}
		
		board_grid.appendChild(row);
	}
	
	// on window resize, resize the board
	window.addEventListener('resize', () => {resizeBoard(board_grid);});
	
	resizeBoard(board_grid);
	
	board_grid.board_width = board_width;
	board_grid.board_height = board_height;
	
	// TODO: base this on the board width
	let [valid_guesses, possible_answers] = getAnswerLists(board_width);
	
	board_grid.valid_guesses = valid_guesses;
	board_grid.possible_answers = possible_answers;
	
	board_grid.answer = getWordleAnswer(board_grid.possible_answers);
	
	return board_grid;
}


function initializeKeyboard() {
	const ROWS = ["qwertyuiop", "asdfghjkl", "↵zxcvbnm←"];
	
	const keyboard = document.getElementById("keyboard-container");
	if (keyboard == null) throw new Error("unreachable");
	
	var keys = {};
	
	for (var i = 0; i < ROWS.length; ++i) {
		let row = document.createElement("div");
		row.className = "keyboard-row";
		
		for (var j = 0; j < ROWS[i].length; ++j) {
			/** @type {String} */
			let letter = ROWS[i].charAt(j);
			
			let keyButton = document.createElement("button");
			keyButton.type = "button";
			keyButton.classList.add("keyboard-key");
			keyButton.setAttribute("letter", letter);
			
			if (letter.match(/^[a-z]$/)) {
				keyButton.innerHTML = letter;
				keyButton.addEventListener('click', () => pressKey(letter));
			} else {
				keyButton.classList.add("big-key");
				if (letter == "↵") {
					keyButton.innerHTML = "ENTER";
					keyButton.addEventListener('click', () => pressKey("Enter"));
				} else if (letter == "←") {
					// i am so sorry.
					keyButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20"><path fill="var(--gray-1)" d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"></path></svg>`;
					keyButton.addEventListener('click', () => pressKey("Backspace"));
				} else {
					throw new Error("unreachable..?")
				}
			}
			
			row.appendChild(keyButton);
			keys[letter] = keyButton;
		}
		
		if (i == 1) {
			let spacer1 = document.createElement('div');
			spacer1.className = "keyboard-spacer";
			row.prepend(spacer1);
			let spacer2 = document.createElement('div');
			spacer2.className = "keyboard-spacer";
			row.append(spacer2);
		}
		
		keyboard.appendChild(row);
	}
	
	return keys;
}

function endGame(toast_msg) {
	gameover = true;
	displayToast(toast_msg);
}

/** 
 * @name getClues
 * @function
 * @param {String} _guess
 * @param {String} _answer
 * @returns {Array<'absent' | 'present' | 'correct'>}
 **/
function getClues(_guess, _answer) {
	let guess = Array.from(_guess);
	let answer = Array.from(_answer);
	if (guess.length != answer.length) {
		throw new TypeError("Words are not the same length")
	}
	let result = Array(guess.length).fill(null, 0, guess.length);
	return result.map((v, i) => {
		if (guess[i] == answer[i]) {
			guess[i] = '\0';
			answer[i] = '\0';
			return 'correct';
		} else {
			return v;
		}
	}).map((v, i) => {
		if (v == null) {
			if (answer.includes(guess[i])) {
				let index = answer.indexOf(guess[i]);
				answer[index] = '\0';
				return 'present';
			} else {
				return 'absent';
			}
		} else {
			return 'correct';
		}
	})
}

let keys = initializeKeyboard();
let board_grid = initializeBoard(WORDLE_WORD_LENGTH, WORDLE_GUESSES);

let current_letter = 0;
let current_guess = 0;

function pressKey(key) {
	if (gameover || guessing) {
		return;
	} else if (key.match(/^[a-zA-Z]$/)) {
		if (current_letter < board_grid.board_width) {
			// TODO: do the little animation thing
			board_grid.children[current_guess].children[current_letter].children[0].innerHTML = key;
			board_grid.children[current_guess].children[current_letter++].children[0].setAttribute('state', 'letter');
		}
	} else if (key === "Backspace") {
		if (current_letter > 0) {
			board_grid.children[current_guess].children[--current_letter].children[0].innerHTML = '';
			board_grid.children[current_guess].children[current_letter].children[0].setAttribute('state', 'empty');
		}
	} else if (key === "Enter") {
		function invalid(msg) {
			displayToast(msg);
			board_grid.children[current_guess].classList.add('shake');
			setTimeout(() => {board_grid.children[current_guess].classList.remove('shake');}, 600);
		}
		
		// "Not enough letters" toast
		if (current_letter < board_grid.board_width) {
			invalid('Not enough letters');
			return;
		}
		
		const word = Array.from(board_grid.children[current_guess].children)
						.map(child => child.firstChild.innerHTML) // maps a cell-container to its cell's letter
						.join('');
		
		// "Not in word list" toast
		if (!board_grid.valid_guesses.includes(word) && !board_grid.possible_answers.includes(word)) {
			invalid("Not in word list");
			return;
		}
		
		if (IS_HARDMODE) {
			// "{i}th letter must be {letter}"
			// "Guess must contain {letter}"
			// TODO: hardmode
		}
		
		let clues = getClues(word, board_grid.answer);
		
		// display clues
		Array.from(board_grid.children[current_guess].children).forEach((cell, i) => {
			// TODO: this is not actually reverse engineered
			//       it is 100% just trial and error and isnt the same
			setTimeout(() => {
				cell.firstChild.classList.add('flip-in');
				setTimeout(() => {
					cell.firstChild.classList.remove('flip-in');
					
					cell.firstChild.setAttribute('state', clues[i]);
					
					cell.firstChild.classList.add('flip-out');
				}, 250);
				setTimeout(() => {
					cell.firstChild.classList.remove('flip-out');
				}, 500);
			}, 10 + i * 300);
		});
		
		guessing = true;
		
		current_guess += 1;
		current_letter = 0;
		
		// delay until flip animations are complete
		setTimeout(() => {
			for (var i = 0; i < board_grid.board_width; ++i) {
				let button = keys[word.charAt(i)];
				switch (button.getAttribute('state')) {
					case null: 
					case 'absent': {
						button.setAttribute('state', clues[i]);
						break;
					}
					case 'present': {
						if (clues[i] != 'absent')
							button.setAttribute('state', clues[i])
						break;
					}
					case 'correct': break;
				}
				
			}
			
			guessing = false;
			
			// if won: display the win toast
			if (word === board_grid.answer) {
				if (current_guess == 1) {
					endGame("Genius");
				} else if (current_guess == board_grid.board_height) {
					endGame("Phew");
				} else {
					endGame(
						[
							"Genius", 
							"Magnificent", 
							"Impressive", 
							"Splendid", 
							"Great",
							"Nice",
							"Good",
							// "Phew"
						][current_guess-1]
					);
				}
			} else if (current_guess >= board_grid.board_height)
				endGame(board_grid.answer.toUpperCase());
			
		}, 510 + (board_grid.board_width-1) * 300);
	}
}

window.addEventListener("keydown", (event) => pressKey(event.key));