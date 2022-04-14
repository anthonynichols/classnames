type ClassNameValue = string | number | boolean | undefined | null;

type ClassNamesMapping = Record<string, unknown>;

interface ClassNamesArray extends Array<ClassNames> {}

type ClassNames = ClassNameValue | ClassNamesMapping | ClassNamesArray;

function isString(arg: ClassNames): arg is string {
  return typeof arg === 'string';
}

function isNumber(arg: ClassNames): arg is number {
  return typeof arg === 'number';
}

function isArray(arg: ClassNames): arg is ClassNamesArray {
  return Array.isArray(arg);
}

function isObject(arg: ClassNames): arg is ClassNamesMapping {
  return typeof arg === 'object';
}

export function classNames(...args: ClassNames[]) {
  let classes = [];

  for (let i = 0, length = args.length; i < length; i++) {
    let arg = args[i];

    if (!arg) continue;

    if (isString(arg) || isNumber(arg)) {
      classes.push(arg);
    }
    else if (isArray(arg)) {
      let nestedClasses = classNames(...arg);
      if (nestedClasses) classes.push(nestedClasses);
    }
    else if (isObject(arg)) {
      if (arg.toString === Object.prototype.toString) {
        for (let key in arg) {
          if (arg[key]) classes.push(key);
        }
      }
      else {
        classes.push(arg.toString());
      }
    }
  }

  return classes.join(' ');
}
