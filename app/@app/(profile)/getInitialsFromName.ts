function getInitialsFromName(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .splice(0, 2)
    .join("")
    .toUpperCase();
}

export default getInitialsFromName;
