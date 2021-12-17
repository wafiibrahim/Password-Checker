const strengthMeter = document.getElementById("strength-meter");
const passwordInput = document.getElementById("password-input");
const reasonsContainer = document.getElementById("reasons");

passwordInput.addEventListener("input", updateMeter);

updateMeter();

function updateMeter() {
  const weakness = calculateStrength(passwordInput.value);

  let strength = 100;

  reasonsContainer.innerHTML = "";

  weakness.forEach((weakness) => {
    //-= does not work

    if (weakness == null) return;
    strength = strength - weakness.deduction;
    const messageElement = document.createElement("div");
    messageElement.innerText = weakness.message;
    reasonsContainer.appendChild(messageElement);
  });
  strengthMeter.style.setProperty("--strength", strength);
}

function calculateStrength(password) {
  const weaknesses = [];
  weaknesses.push(lengthWeakness(password));
  weaknesses.push(lowerCaseWeakness(password));
  weaknesses.push(upperCaseWeakness(password));
  weaknesses.push(numberWeakness(password));
  weaknesses.push(specialCharacterWeakness(password));

  return weaknesses;
}

function lengthWeakness(password) {
  const length = password.length;

  if (length <= 5) {
    return {
      message: "Your Password Is Too Short",
      deduction: 40,
    };
  }

  if (length <= 10) {
    return {
      message: "Your Password Could Be Longer",
      deduction: 15,
    };
  }
}

function upperCaseWeakness(password) {
  return characterTypeWeakness(password, /[A-Z]/g, "Uppercase Character");
}

function lowerCaseWeakness(password) {
  return characterTypeWeakness(password, /[a-z]/g, "Lowercase Characters");
}

function numberWeakness(password) {
  return characterTypeWeakness(password, /[0-9]/g, "Numbers");
}
function specialCharacterWeakness(password) {
  return characterTypeWeakness(
    password,
    /[^0-9a-zA-Z\s]/g,
    "Special Characters"
  );
}
function characterTypeWeakness(password, regex, type) {
  const matches = password.match(regex) || [];

  if (matches.length == 0) {
    return {
      message: `Your Password Has No ${type}`,
      deduction: 20,
    };
  }

  if (matches.length <= 2) {
    return {
      message: `Your Password Could Use More ${type}`,
      deduction: 5,
    };
  }
}

function repeatCharacterWeakness(password) {
  const matches = password.match(/(.)\1/g) || [];

  if (matches.length > 0) {
    return {
      messages: "Your Password Has Repeating Characters",
      deduction: matches * 10,
    };
  }
}
