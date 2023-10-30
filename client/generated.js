const fs = require("fs");

function insecureHash(string) {
  let hash = 0;

  const stringLenght = string.length;

  for (let i = 0; i < stringLenght; i++) {
    const char = string.charCodeAt(i);

    hash = (hash << 5) - hash + char;
    hash &= hash;
  }

  return new Uint32Array([hash])[0].toString(36);
}

const sprite = fs.readFileSync("./public/images/sprite.svg").toString();
const spriteHash = insecureHash(sprite) + "-" + sprite.length;

// Write

const prevGenerated = (() => {
  try {
    return JSON.parse(
      fs.readFileSync("./generated.json").toString().trim() || "{}",
    );
  } catch (error) {
    return {};
  }
})();

const newGenerated = {
  ...prevGenerated,
  spriteHash,
};

fs.writeFileSync("./generated.json", JSON.stringify(newGenerated));
