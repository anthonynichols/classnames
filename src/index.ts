type ClassNameValue = string | number | boolean | undefined | null;

type ClassNamesDictionary = {
  [className: string]: boolean | undefined | null;
};

type ClassNamesArray = (ClassNameValue | ClassNamesDictionary)[];

type ClassNames = ClassNameValue | ClassNamesDictionary | ClassNamesArray;

function isString(arg: ClassNames): arg is string {
  return typeof arg === 'string';
}

function isNumber(arg: ClassNames): arg is number {
  return typeof arg === 'number';
}

function isArray(arg: ClassNames): arg is ClassNamesArray {
  return Array.isArray(arg) && Boolean(arg.length);
}

function isObject(arg: ClassNames): arg is ClassNamesDictionary {
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
      classes.push(classNames(arg));
    }
    else if (isObject(arg)) {
      for (let key in arg) {
        if (arg[key]) classes.push(key);
      }
    }
  }

  return classes.join(' ');
}
