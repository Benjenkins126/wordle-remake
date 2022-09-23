let words = ['abroad'];

// Need to random generate this from the words array
let guessingWord = words[0];
let currentRow = 1;
disableInputs(currentRow);

$('.wordleEntry').keyup(async function(event) {
    let column = parseInt($(this).attr('data-column'));
    let row = parseInt($(this).attr('data-row'));

    if (event.keyCode == 8) {
        $('.wordleEntry[data-column="' + (column - 1) + '"][data-row="' + row + '"]').focus();
        $('.wordleEntry[data-column="' + (column) + '"][data-row="' + row + '"]').val();
    } else if(event.keyCode == 13) {
        // Ensure all inputs have been entered
        for(let x = 0; x < 6; x++) {
            if($('.wordleEntry[data-row="' + currentRow + '"][data-column="' + (x + 1) + '"]').val() == "") {
                return false;
            }
        }

        // Validate current row
        validateWord(guessingWord, currentRow);

        // Increment current row and focus on the next row
        currentRow++;
        return disableInputs(currentRow);
    } else if(column < 6 && $(this).val() !== "") {
        let nextColumn = column + 1;
        $('.wordleEntry[data-column="' + nextColumn + '"][data-row="' + row + '"]').focus();
    }
});

function disableInputs(currentRow) {
    $('.wordleEntry').attr('disabled', true);
    for(let x = 0; x < 6; x++) {
        $('.wordleEntry[data-row="' + currentRow + '"][data-column="' + (x + 1) + '"]').attr('disabled', false);
    }
}

function validateWord(guessingWord, currentRow) {
    for(let x = 0; x < 6; x++) {
        let actualCharacter = guessingWord[x];
        let currentCharacter = $('.wordleEntry[data-row="' + currentRow + '"][data-column="' + (x + 1) + '"]');
        if(actualCharacter.toUpperCase() === currentCharacter.val().toUpperCase()) {
            currentCharacter.addClass('correctPlace');
        } else if(guessingWord.includes(currentCharacter.val())) {
            currentCharacter.addClass('incorrectPlace');
        } else {
            currentCharacter.addClass('wrongPlace');
        }
    }
}

// To-do
//Check if it's a valid word that's being searched
//CSS animation on recover
//Error/success at end
//smoother input selection