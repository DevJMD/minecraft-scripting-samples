import * as mc from "@minecraft/server";

const overworld = mc.world.getDimension("overworld");

/**
 * Increments a dynamic numeric persisted property.
 * @param {(message: string, status?: number) => void} log: Logger function. If status is positive, test is a success. If status is negative, test is a failure.
 * @param {mc.Location} location Location to center this sample code around.
 * @see https://learn.microsoft.com/minecraft/creator/scriptapi/minecraft/server/world#getDynamicProperty
 * @see https://learn.microsoft.com/minecraft/creator/scriptapi/minecraft/server/world#setDynamicProperty
 */
export function incrementProperty(log: (message: string, status?: number) => void, targetLocation: mc.Vector3) {
  let number = mc.world.getDynamicProperty("samplelibrary:number");

  log("Current value is: " + number);

  if (number === undefined) {
    number = 0;
  }

  if (typeof number !== "number") {
    log("Number is of an unexpected type.");
    return -1;
  }

  mc.world.setDynamicProperty("samplelibrary:number", number + 1);
}

/**
 * Increments a dynamic numeric persisted property.
 * @param {(message: string, status?: number) => void} log: Logger function. If status is positive, test is a success. If status is negative, test is a failure.
 * @param {mc.Location} location Location to center this sample code around.
 * @see https://learn.microsoft.com/minecraft/creator/scriptapi/minecraft/server/world#getDynamicProperty
 * @see https://learn.microsoft.com/minecraft/creator/scriptapi/minecraft/server/world#setDynamicProperty
 */
export function incrementPropertyInJsonBlob(
  log: (message: string, status?: number) => void,
  targetLocation: mc.Vector3
) {
  let paintStr = mc.world.getDynamicProperty("samplelibrary:longerjson");
  let paint: { color: string; intensity: number } | undefined = undefined;

  log("Current value is: " + paintStr);

  if (paintStr === undefined) {
    paint = {
      color: "purple",
      intensity: 0,
    };
  } else {
    if (typeof paintStr !== "string") {
      log("Paint is of an unexpected type.");
      return -1;
    }

    try {
      paint = JSON.parse(paintStr);
    } catch (e) {
      log("Error parsing serialized struct.");
      return -1;
    }
  }

  if (!paint) {
    log("Error parsing serialized struct.");
    return -1;
  }

  paint.intensity++;
  paintStr = JSON.stringify(paint); // be very careful to ensure your serialized JSON str cannot exceed limits
  mc.world.setDynamicProperty("samplelibrary:longerjson", paintStr);
}
