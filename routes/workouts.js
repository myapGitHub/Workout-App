import { Router } from "express";
import { workoutData } from "../data/index.js";

const router = Router();
router
  .route("/")
  .get(async (req, res) => {
    //code here for GET
    try {
      const workoutList = await workoutData.getAllWorkouts();
      return res.json(workoutList);
    } catch (e) {
      return res.status(404).json({ error: e.message || e });
    }
  })
  .post(async (req, res) => {
    const workout = req.body;

    if (!req.session.user || !req.session.user.userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const userId = req.session.user.userId;

    if (!workout || Object.keys(workout).length === 0) {
      return res
        .status(400)
        .json({ error: "There are no fields in the request body" });
    }

    try {
      const newWorkout = await workoutData.createWorkout(
        workout.workoutType,
        userId,
        workout.exercises,
        workout.description
      );
      return res.status(200).json(newWorkout);
    } catch (e) {
      return res.status(500).json({ error: e.message || e });
    }
  });

function checkId(id) {
  if (!id) throw "Error: You must provide an id to search for";
  if (typeof id !== "string") throw "Error: id must be a string";
  id = id.trim();
  if (id.length === 0)
    throw "Error: id cannot be an empty string or just spaces";
  return id;
}

function checkStringWithName(strVal, varName) {
  if (!strVal) throw `Error: You must supply a ${varName}!`;
  if (typeof strVal !== "string") throw `Error: ${varName} must be a string!`;
  strVal = strVal.trim();
  if (strVal.length === 0)
    throw `Error: ${varName} cannot be an empty string or string with just spaces`;
  if (!isNaN(strVal))
    throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
  return strVal;
}

//Todo You can use this file for any helper functions you may need. This file is optional and you don't have to use it if you do not want to.
//Helper Functions
function checkString(input) {
  if (typeof input !== "string") {
    throw "Error: Input is not a string";
  }
}

function checkExists(input) {
  if (input == null || input == undefined) {
    throw `Error: Input does not exist`;
  }
}

function checkZeroLen(input) {
  if (input.length === 0) {
    throw "Error: Input length is 0";
  }
}

let checkNumber = (input) => {
  if (typeof input !== "number") {
    throw "Error: Element is not a number";
  }
  if (isNaN(input)) {
    throw "Error: Input contains NaN";
  }
};

let checkNull = (input) => {
  if (typeof input === "undefined" && input === null) {
    throw "Error: Passed null";
  }
};

let checkEmptyArray = (input) => {
  if (input.length === 0) {
    throw "Error: Passed empty array";
  }
};
let checkLengthIsTwo = (input) => {
  if (input.length !== 2) {
    throw "Error: Passed incorrect size array";
  }
};
let checkArray = (input) => {
  if (!Array.isArray(input)) {
    throw "Error: Not an array";
  }
};

let checkStringLength = (input) => {
  let trimmed = input.trim().length;
  if (trimmed === 0) {
    throw "Error: String length is 0";
  }
};
let checkStringAndNumber = (input) => {
  // if (isNaN(input)) {
  //   throw "Error: Input contains NaN";
  // }
  if (typeof input !== "string" && typeof input !== "number") {
    throw "Error: Element is not a String or Number";
  }
};

let checkArrBool = (input) => {
  if (!Array.isArray(input)) {
    return false;
  } else {
    return true;
  }
};

let checkLenAtLeastTwo = (input) => {
  if (input.length < 2) {
    throw "Error: Array/String input length is less than 2";
  }
};

let checkPrimObjArr = (input) => {
  if (
    typeof input !== "number" &&
    typeof input !== "boolean" &&
    typeof input !== "string" &&
    typeof input !== "null" &&
    typeof input !== "undefined" &&
    typeof input !== "object" &&
    !Array.isArray(input)
  ) {
    throw "Error: Input or Element is not a Primitive, Object, or Array";
  }
  if (typeof input === "number" && isNaN(input)) {
    throw "Error: Element is NaN";
  }
};

// let checkString = (input) => {
//   if (typeof input !== "string") {
//     throw "Error: Input is not a String";
//   }
// };

let checkWithinBounds = (min, max) => {
  if (min < 1 || min > max) {
    throw "Error: Min not within bounds";
  }
};
let checkUndef = (input) => {
  if (input == undefined) {
    throw "Error: Passed undefined";
  }
};

let checkObj = (input) => {
  if (typeof input !== "object") {
    throw "Error: Element is not an object";
  }
};

let checkObjectEmpty = (input) => {
  if (Object.keys(input).length === 0) {
    throw "Error: Object is empty";
  }
};

let checkFunc = (input) => {
  if (typeof input !== "function") {
    throw "Error: Input is not a function";
  }
};

let checkWholeNumber = (input) => {
  if (!Number.isInteger(input)) {
    throw "Error: Input is not an integer";
  }
};

let checkPos = (input) => {
  checkNumber(input);
  if (input < 0) {
    throw "Error: Input is negative";
  }
};

function trimAll(...parameters) {
  for (let i = 0; i < parameters.length; i++) {
    parameters[i] = parameters[i].trim();
  }
  return parameters;
}

function checkValidStateAbbreviation(state) {
  checkLengthIsTwo(state);

  const validStates = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];
  state = state.toUpperCase();

  if (!validStates.includes(state)) {
    throw "Error: State is not valid";
  }
}

function checkYearFounded(yearFounded) {
  checkNumber(yearFounded);
  const today = new Date();
  let todayYear = today.getFullYear();
  if (yearFounded < 1850 || yearFounded > todayYear) {
    throw "Error: Invalid yearFounded";
  }
}

function checkPlayers(players) {
  //   console.log(`Checking Players: `);
  checkArray(players);
  checkEmptyArray(players);
  for (let player of players) {
    checkObj(player);
    checkObjectEmpty(player);
    let properKeys = ["firstName", "lastName", "position"];
    let playerKeys = Object.keys(player);
    //Learned something new, for future me
    //.every() checks if every element from properKeys satisfies the () condition
    //In this case, it is that playerKeys has all the keys of ProperKeys
    //Use negation to check if at least one is missing, then we throw error
    if (
      playerKeys.length !== 3 ||
      !properKeys.every((key) => playerKeys.includes(key))
    ) {
      throw "Error: Each player must have firstName, lastName, and position as keys";
    }
    for (let key in player) {
      checkExists(player[key]);
      checkString(player[key]);
      player[key] = player[key].trim();
      checkStringLength(player[key]);
    }
  }
}

//Given a workoutId, returns the id and the workoutType
async function findByWorkoutIdExercisesOnly(workoutId) {
  if (!workoutId) throw "You must provide a workout ID";
  const workoutCollection = await workouts();
  const foundWorkout = await workoutCollection.findOne(
    { _id: workoutId },
    { projection: { _id: 1, workoutType: 1 } }
  );

  if (!foundWorkout) throw "Workout not found";

  return {
    _id: foundWorkout._id.toString(),
    workoutType: foundWorkout.workoutType,
  };
}

function checkValidObjId(id) {
  if (!ObjectId.isValid(id)) throw "Error: invalid object ID";
}

function checkValidDate(date) {
  if (!validateDate(date, "boolean", "MM/DD/YYYY")) {
    throw "Error: Date is not in MM/DD/YYYY";
  }
  const [month, day, year] = date.split("/").map(Number);
  let givenDate = new Date(year, month - 1, day);
  if (
    givenDate.getFullYear() !== year &&
    givenDate.getMonth() !== month - 1 &&
    givenDate.getDate() !== day
  ) {
    throw "Error: Date does not logically exist";
  }
  const currentDate = new Date();
  if (givenDate > currentDate) {
    throw "Error: Date is in the future";
  }
}

function checkBool(bool) {
  if (typeof bool !== "boolean") {
    throw "Error: Input is not a bool";
  }
}

function checkTeam(
  name,
  sport,
  yearFounded,
  city,
  state,
  stadium,
  championshipsWon,
  players
) {
  //Check args exist
  //   checkExists(id);
  checkExists(name);
  checkExists(sport);
  checkExists(yearFounded);
  checkExists(city);
  checkExists(state);
  checkExists(stadium);
  checkExists(championshipsWon);
  checkExists(players);

  //Check valid strings
  function checkArgsString() {
    // checkExists(id);
    checkString(name);
    checkString(sport);
    checkString(city);
    checkString(state);
    checkString(stadium);
  }
  checkArgsString();
  function trimAll() {
    // id = id.trim();
    name = name.trim();
    sport = sport.trim();
    city = city.trim();
    state = state.trim();
    stadium = stadium.trim();
  }
  trimAll();
  function checkStrLength() {
    // checkStringLength(id);
    checkStringLength(name);
    checkStringLength(sport);
    checkStringLength(city);
    checkStringLength(state);
    checkStringLength(stadium);
  }
  checkStrLength();
  //   if (!ObjectId.isValid(id)) throw "Error: invalid object ID";
  checkValidStateAbbreviation(state);
  checkYearFounded(yearFounded);
  function checkChampsWon() {
    checkNumber(championshipsWon);
    checkPos(championshipsWon);
    checkWholeNumber(championshipsWon);
  }
  checkChampsWon();
  checkPlayers(players);
}

async function checkGame(
  teamId,
  gameDate,
  opposingTeamId,
  homeOrAway,
  finalScore,
  win
) {
  checkExists(teamId);
  checkExists(gameDate);
  checkExists(opposingTeamId);
  checkExists(homeOrAway);
  checkExists(finalScore);
  checkExists(win);

  checkString(teamId);
  checkString(gameDate);
  checkString(opposingTeamId);
  checkString(homeOrAway);
  checkString(finalScore);

  teamId = teamId.trim();
  gameDate = gameDate.trim();
  opposingTeamId = opposingTeamId.trim();
  homeOrAway = homeOrAway.trim();
  finalScore = finalScore.trim();

  checkStringLength(teamId);
  checkStringLength(gameDate);
  checkStringLength(opposingTeamId);
  checkStringLength(homeOrAway);
  checkStringLength(finalScore);

  checkValidObjId(teamId);
  let mainTeam;
  try {
    mainTeam = await teamFun.getTeamById(teamId);
  } catch (e) {
    throw e;
  }

  // let date = new Date(gameDate);
  checkValidDate(gameDate);

  let opposingTeam;
  try {
    opposingTeam = await teamFun.getTeamById(opposingTeamId);
  } catch (e) {
    throw e;
  }

  if (homeOrAway !== "Home" && homeOrAway !== "Away") {
    throw "Error: Not Home or Away";
  }

  let finalScoreCheck = finalScore.split("");
  checkWholeNumber(parseInt(finalScoreCheck[0]));
  checkWholeNumber(parseInt(finalScoreCheck[2]));
  if (
    parseInt(finalScoreCheck[0]) < 0 ||
    parseInt(finalScoreCheck[2]) < 0 ||
    parseInt(finalScoreCheck[0]) === parseInt(finalScoreCheck[2]) ||
    finalScoreCheck[1] !== "-"
  ) {
    throw "Error: finalScore is not in proper format";
  }

  checkBool(win);

  if (mainTeam.sport !== opposingTeam.sport) {
    throw "Error: Teams do not play the same sport";
  }

  if (mainTeam._id === opposingTeam._id) {
    throw "Error: Team cannot play itself";
  }
}

export default router;
