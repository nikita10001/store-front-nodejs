export function classNames(cls, mods, additional) {
  return [
    cls,
    ...additional.filter(Boolean),
    ...Object.entries(mods)
      .filter(([className, value]) => Boolean(value))
      .map(([className]) => className),
  ].join(' ');
}

//example
// classNames('remove-btn', {hovered: true, selectable: true}, ['some']);
