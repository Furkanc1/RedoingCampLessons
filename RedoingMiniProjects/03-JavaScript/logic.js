const specialCharacters = [
  "@",
  "%",
  "+",
  "\\",
  "/",
  "'",
  "!",
  "#",
  "$",
  "^",
  "?",
  ":",
  ",",
  ")",
  "(",
  "}",
  "{",
  "]",
  "[",
  "~",
  "-",
  "_",
  ".",
];

const numericValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const lowerCaseLetters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const upperCaseLetters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

// will ask user for their input in prompt format
const passwordOptionsPrompt = () => {
  let lengthOfPassword = parseInt(
    prompt("How long do you want your password?")
  );
  // isNaN = is not a number, will error alert the user.
  if (Number.isNaN(lengthOfPassword)) {
    console.log(`Not a number`, Error);
    alert(`Must be a length written as a number`);
    return null;
  }

  if (lengthOfPassword < 8) {
    alert(`must be at least 8 characters!`);
  }
  if (lengthOfPassword > 100) {
    alert(`must be less than 100 characters!`);
  }

  const includesSpecialCharacters = confirm(
    `would you like to include special Characters?`
  );

  const includesNumberValues = confirm(`would you like to include numbers?`);

  const includesLowercaseCharacters = confirm(
    `would you like to include lowercase letters?`
  );

  const includesUppercaseCharacters = confirm(
    `would you like to include uppercase letters?`
  );

  if (
    includesSpecialCharacters === false &&
    includesNumberValues === false &&
    includesLowercaseCharacters === false &&
    includesUppercaseCharacters === false
  ) {
    alert(`you must have choose atleast one value for your password!`);
  }

  // Here is how we store our users input in an object
  const optionsForCreatingPassword = {
    lengthOfPassword,
    includesLowercaseCharacters,
    includesNumberValues,
    includesUppercaseCharacters,
    includesSpecialCharacters,
  };

  return optionsForCreatingPassword;
};
// Here is where i create the functions which will randomly select elements from an array:
const generateRandomArrayElement = (arr) => {
  // math.floor = returns the greatest integer LESS THAN OR EQUAL TO its following argument: (Math.random = Chooses a number between 0 and 1), followed by multiplying it by the arrays.length
  let randomArrayIndex = Math.floor(Math.random() * arr.length);
  let randomlyChosenElement = arr[randomArrayIndex];

  return randomlyChosenElement;
};

// Here is where I generate the password using the users input
// create conditional statements for every part of the process of selecting character types:
const generatePasswordUsingUserInput = () => {
  let CharacterOptions = passwordOptionsPrompt();

  // result is an empty array
  let result = [];

  // array to store the type of characters inlcuded in the users password
  let CharacterTypes = [];

  // array of each character type selected by user, stored so that it will guarentee that each one is used in the function.
  let guarenteedCharacters = [];

  // if there are no options chosen by user, function will stop here (returning NULL)
  if (!CharacterOptions) return null;

  if (CharacterOptions.includesSpecialCharacters) {
    // concat method will combine 2 or more arrays, returning a new unique array of usersChoiceOfCharacterTypes[] based on the users selection; Then .push(getRandom) will push a random (something) to the array of EachCharacterTypeChosen
    // in this case it is specialCharacters which follows the method- ex: .push(getRandom(specialCharacters));

    //following code is a conditional statement, which will ass an array of specialCharacters into the array of possible characters
    CharacterTypes = CharacterTypes.concat(specialCharacters);

    guarenteedCharacters.push(generateRandomArrayElement(specialCharacters));
  }
  // if the characterChoices or Option includes numeric values, then, the overall charactertypes will = the concat of includesNumericValues: AGAIN Concat means to combine 2 or more arrays and form a new one.
  if (CharacterOptions.includesNumberValues) {
    CharacterTypes = CharacterTypes.concat(numericValues);

    guarenteedCharacters.push(generateRandomArrayElement(numericValues));
  }
  // if the character options includes lowercase characters, then the upperCaseLetters array will be included into the charactertypes
  if (CharacterOptions.includesUppercaseCharacters) {
    CharacterTypes = CharacterTypes.concat(upperCaseLetters);

    guarenteedCharacters.push(generateRandomArrayElement(upperCaseLetters));
  }

  if (CharacterOptions.includesLowercaseCharacters) {
    CharacterTypes = guarenteedCharacters.concat(lowerCaseLetters);
    // get a random lowercased letter and PUSH() it to the end of the array
    guarenteedCharacters.push(generateRandomArrayElement(lowerCaseLetters));
  }
  // FOR LOOP which will go over the password length from the characterTypes object, grabbing random values from the array of possible characters and concat'ing or creating a new array with those values
  for (
    let canBeAnyVariable = 0;
    canBeAnyVariable < CharacterOptions.lengthOfPassword;
    canBeAnyVariable++
  ) {
    let possibleCharacters = generateRandomArrayElement(CharacterTypes);

    result.push(possibleCharacters);
  }

  for (let i = 0; i < guarenteedCharacters.length; i++) {
    result[i] = guarenteedCharacters[i];
  }

  // .join will include all the elements of an array, convert them into a string, which is specified by the specified seperator string: (``), if not included, the array elements are seperated by a comma.
  console.log(`new password result before .join`, result);
  return result.join(``);
};

//  following will grab references to the #generate ElementID using querySelector
let generatePasswordButton = document.querySelector(`#generate`);

const showNewPassword = () => {
  let password = generatePasswordUsingUserInput();
  let passwordText = document.querySelector(`#password`);

  passwordText.value = password;
};

// EVENT LISTENER FOR THE BUTTON (waits for an event (`click`) and runs a functions `showNewPassword()` )
generatePasswordButton.addEventListener(`click`, showNewPassword);
