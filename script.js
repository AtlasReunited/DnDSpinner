const strengthCalculatedValue = document.querySelector('#strengthCalculatedValue');
const strength = document.querySelector('#strengthinput');

const constitutionCalculatedValue = document.querySelector('#constitutionCalculatedValue');
const constitution = document.querySelector('#constitutioninput');

const dexterityCalculatedValue = document.querySelector('#dexterityCalculatedValue');
const dexterity = document.querySelector('#dexterityinput');

const intelligenceCalculatedValue = document.querySelector('#intelligenceCalculatedValue');
const intelligence = document.querySelector('#intelligenceinput');

const wisdomCalculatedValue = document.querySelector('#wisdomCalculatedValue');
const wisdom = document.querySelector('#wisdominput');

const charismaCalculatedValue = document.querySelector('#charismaCalculatedValue');
const charisma = document.querySelector('#charismainput');




let character = {
    name: 'Bob',
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
    str_mod: 0,
    dex_mod: 0,
    con_mod: 0,
    int_mod: 0,
    wis_mod: 0,
    cha_mod: 0
};





//Set the strengthCalculatedValue whenever the strength input changes
strength.addEventListener('change', function () {
    character.strength = strength.value;
    character.str_mod = calculateModifier(strength.value);
    strengthCalculatedValue.textContent = character.str_mod;
});

constitution.addEventListener('change', function () {
    character.constitution = constitution.value;
    character.con_mod = calculateModifier(constitution.value);
    constitutionCalculatedValue.textContent = character.con_mod;
});



dexterity.addEventListener('change', function () {
    character.dexterity = dexterity.value;
    character.dex_mod = calculateModifier(dexterity.value);
    dexterityCalculatedValue.textContent = character.dex_mod;

});

intelligence.addEventListener('change', function () {
    character.intelligence = intelligence.value;
    character.int_mod = calculateModifier(intelligence.value);
    intelligenceCalculatedValue.textContent = character.int_mod;

});

wisdom.addEventListener('change', function () {
    character.wisdom = wisdom.value;
    character.wis_mod = calculateModifier(wisdom.value);
    wisdomCalculatedValue.textContent = character.wis_mod;
});

charisma.addEventListener('change', function () {
    character.charisma = charisma.value;
    character.cha_mod = calculateModifier(charisma.value);
    charismaCalculatedValue.textContent = character.cha_mod;

});

function calculateModifier(score) {
    return Math.floor((score - 10) * 0.5);
}

function rollPreset(presetId) {
    // Logic to handle rolling for the specified preset
    // Update character stats accordingly
    const nameInput = document.querySelector(`#${presetId} span`);
    const rangeInput = document.getElementById('range' + presetId.slice(-1));
    const modifierTypeInput = document.getElementById('modifier' + presetId.slice(-1) + 'Type');
    const modifierValueInput = document.getElementById('modifier' + presetId.slice(-1) + 'Value');
    const resultElement = document.getElementById('result' + presetId.slice(-1));

    const name = nameInput.textContent;
    const range = rangeInput.value;
    const modifierType = modifierTypeInput.value;
    const modifierValue = modifierValueInput.value;

    // Implement your logic to calculate the roll result here
    const rollResult = simulateRoll(range, modifierType, modifierValue);

    resultElement.textContent = 'Result: ' + rollResult;
}

function simulateRoll(range, modifierType, modifierValue) {
    // Implement your logic to simulate a roll based on range and modifier
    // For simplicity, this example just returns a random number between 1 and 20
    const minRange = parseInt(range.split('-')[0]);
    const maxRange = parseInt(range.split('-')[1]);
    const randomResult = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;

    // Implement logic for modifiers
    const characterModifier = character[modifierType];
    const customModifier = parseInt(modifierValue) || 0;

    return randomResult + (modifierType === 'custom' ? customModifier : characterModifier);
}

function addNewPreset() {
    // Create a new roll preset and append it to the rollPresets container
    const rollPresets = document.getElementById('rollPresets');

    const newPresetId = 'preset' + (rollPresets.childElementCount + 1);

    const newPreset = document.createElement('div');
    newPreset.className = 'roll-preset';
    newPreset.id = newPresetId;

    newPreset.innerHTML = `
                <p>Name: <span contentEditable="true" spellcheck="false">New Preset</span></p>
                <p>Range: <input type="text" id="range${newPresetId.slice(-1)}" value="1-20"></p>
                <p>Modifier: 
                    <select id="modifier${newPresetId.slice(-1)}Type" onchange="toggleCustomModifier('modifier${newPresetId.slice(-1)}')">
                        <option value="custom">Custom</option>
                        <option value="str_mod">Strength Modifier</option>
                        <option value="dex_mod">Dexterity Modifier</option>
                        <option value="con_mod">Constitution Modifier</option>
                        <option value="int_mod">Intelligence Modifier</option>
                        <option value="wis_mod">Wisdom Modifier</option>
                        <option value="cha_mod">Charisma Modifier</option>
                    </select>
                    <input type="text" id="modifier${newPresetId.slice(-1)}Value" class="custom-modifier" value="+2">
                </p>
                <button onclick="rollPreset('${newPresetId}')">Roll</button>
                <p class="result" id="result${newPresetId.slice(-1)}"></p>
            `;

    rollPresets.insertBefore(newPreset, rollPresets.lastChild);
}

function toggleCustomModifier(modifierId) {
    // Toggle visibility of the custom modifier textbox based on the selected modifier type
    const modifierTypeInput = document.getElementById(modifierId + 'Type');
    const modifierValueInput = document.getElementById(modifierId + 'Value');
    const customModifierInput = document.querySelector(`#${modifierId} .custom-modifier`);

    customModifierInput.style.display = modifierTypeInput.value === 'custom' ? 'inline' : 'none';
}