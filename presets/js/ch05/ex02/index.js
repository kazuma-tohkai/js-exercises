/* eslint-disable */
export function escapeLetterWithIfElse(str) {
  let escapedString = "";
  for (const letter of str) {
    if (letter === `0`) {
      escapedString += `\0`;
    } else if (letter === `b`) {
      escapedString += `\b`;
    } else if (letter === `t`) {
      escapedString += `\t`;
    } else if (letter === `n`) {
      escapedString += `\n`;
    } else if (letter === `v`) {
      escapedString += `\v`;
    } else if (letter === `f`) {
      escapedString += `\f`;
    } else if (letter === `r`) {
      escapedString += `\r`;
    } else if (letter === `"`) {
      escapedString += `\"`;
    } else if (letter === `'`) {
      escapedString += `\'`;
    }
    // バックスラッシュはエスケープシーケンスで書かないとエラーが出てしまう
    // else if (letter === `\`) {
    //   escapedString += `\\`;
    // }
    else {
      escapedString += letter;
    }
  }
  return escapedString;
}
export function escapeLetterWithSwitch(str) {
  let escapedString = "";
  for (const letter of str) {
    switch (letter) {
      case `0`:
        escapedString += `\0`;
        break;
      case `b`:
        escapedString += `\b`;
        break;
      case `t`:
        escapedString += `\t`;
        break;
      case `n`:
        escapedString += `\n`;
        break;
      case `v`:
        escapedString += `\v`;
        break;
      case `f`:
        escapedString += `\f`;
        break;
      case `r`:
        escapedString += `\r`;
        break;
      case `"`:
        escapedString += `\"`;
        break;
      case `'`:
        escapedString += `\'`;
        break;
      // バックスラッシュはエスケープシーケンスで書かないとエラーが出てしまう
      // case `\`:
      //   escapedString += `\\`;
      // break;
      default:
        escapedString += letter;
        break;
    }
  }
  return escapedString;
}
