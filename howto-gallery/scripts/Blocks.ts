import * as mc from "@minecraft/server";

const overworld = mc.world.getDimension("overworld");

/**
 * Creates a multicolored block out of different colors of wool.
 * This sample uses only stable APIs.
 * @param {(message: string, status?: number) => void} log: Logger function. If status is positive, test is a success. If status is negative, test is a failure.
 * @param {mc.Location} location Location to center this sample code around.
 * @see https://learn.microsoft.com/minecraft/creator/scriptapi/minecraft/server/BlockPermutation#resolve
 */
export function addBlockColorCube(log: (message: string, status?: number) => void, targetLocation: mc.Vector3) {
  const allColorNames: string[] = [
    "white",
    "orange",
    "magenta",
    "light_blue",
    "yellow",
    "lime",
    "pink",
    "gray",
    "silver",
    "cyan",
    "purple",
    "blue",
    "brown",
    "green",
    "red",
    "black",
  ];

  const cubeDim = 7;

  let colorIndex = 0;

  for (let x = 0; x <= cubeDim; x++) {
    for (let y = 0; y <= cubeDim; y++) {
      for (let z = 0; z <= cubeDim; z++) {
        colorIndex++;
        overworld
          .getBlock({ x: targetLocation.x + x, y: targetLocation.y + y, z: targetLocation.z + z })
          ?.setPermutation(
            mc.BlockPermutation.resolve("minecraft:wool", {
              color: allColorNames[colorIndex % allColorNames.length],
            })
          );
      }
    }
  }
}
