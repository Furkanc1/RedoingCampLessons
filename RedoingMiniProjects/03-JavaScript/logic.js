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
    let lengthOfPass = parseInt(
        prompt('How long do you want your password?')
    );
// isNaN = is not a number, will error alert the user.
    if (Number.isNaN) {
        console.log(`Not a number`, Error);
        alert(`Must be a length written as a number`)
        return null;
    }

    if (length < 8) {
        alert(`must be `)
    }



}

