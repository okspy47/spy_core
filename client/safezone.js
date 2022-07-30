var inSafeZone = false;
var safeZone = null;
var slowing = false;
var toggled = false;
var test = 0;
 var maxSpeed = 50; // KMh

const safezones = [
    {"coords":[-64.867027282714,72.6728515625,71.703231811524], "range":30}, // Showroom
	{"coords":[-552.89416503906,-190.85740661622,38.219669342042], "range":83}, // Primarie
];

Wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

var slowDownCar = function(ped) {
	slowing = false;
	var veh = GetVehiclePedIsIn(ped);
	var vehSpeed = (GetEntitySpeed(veh) * 3.6);
	if (vehSpeed > maxSpeed) {
		slowing = true;
	};
};

setTick(async() => {
	if (slowing) {
		await Wait(0.04 * 1000)
		var ped = PlayerPedId();
		var veh = GetVehiclePedIsIn(ped);
		var vehSpeed = GetEntitySpeed(veh);
		if ((vehSpeed * 3.6) > maxSpeed) {
			SetEntityMaxSpeed(veh, (vehSpeed - 1));
		};
	};
});

setTick(() => {
	var ped = PlayerPedId();
	var [posX, posY, posZ] = GetEntityCoords(ped, 1);
	for (const [row, value] of Object.entries(safezones)) {
		if (GetDistanceBetweenCoords(posX, posY, posZ, value.coords[0],value.coords[1],value.coords[2]) < value.range) {
			inSafeZone = true;
			safeZone = row;
		};
		if (safeZone) {
			if (GetDistanceBetweenCoords(safezones[safeZone].coords[0], safezones[safeZone].coords[1], safezones[safeZone].coords[2], posX, posY, posZ) > safezones[safeZone].range) {
				inSafeZone = false;
				safeZone = null;
			};
		};
	};
 	toggleCtrls(ped);
});

function toggleCtrls(ped) {
	var pedId = PlayerId();
	if (inSafeZone) {
		DisableControlAction(0, 24, true); // LEFT MOUSE BUTTON - INPUT_ATTACK
		DisableControlAction(0, 25, true); // RIGHT MOUSE BUTTON - INPUT_AIM
		DisableControlAction(0, 47, true); // G - INPUT_DETONATE
		DisableControlAction(0, 58, true); // G - INPUT_THROW_GRENADE
		DisableControlAction(0, 68, true); // RIGHT MOUSE BUTTON - INPUT_VEH_AIM
		DisableControlAction(0, 69, true); // LEFT MOUSE BUTTON - INPUT_VEH_ATTACK
		DisableControlAction(0, 70, true); // RIGHT MOUSE BUTTON - INPUT_VEH_PASSENGER_AIM
		DisableControlAction(0, 91, true); // RIGHT MOUSE BUTTON - INPUT_VEH_PASSENGER_ATTACK
		DisableControlAction(0, 92, true); // LEFT MOUSE BUTTON - INPUT_VEH_PASSENGER_ATTACK
		DisableControlAction(0, 114,true); // RIGHT MOUSE BUTTON - INPUT_VEH_FLY_ATTACK
		DisableControlAction(0, 121,true); // INSERT - INPUT_VEH_FLY_ATTACK_CAMERA
		DisableControlAction(0, 140,true); // R - INPUT_MELEE_ATTACK_LIGHT
		DisableControlAction(0, 141,true); // Q - INPUT_MELEE_ATTACK_HEAVY
		DisableControlAction(0, 142,true); // LEFT MOUSE BUTTON - INPUT_MELEE_ATTACK_ALTERNATE
		DisableControlAction(0, 143,true); // SPACEBAR - INPUT_MELEE_BLOCK
		DisableControlAction(0, 257,true); // LEFT MOUSE BUTTON - INPUT_ATTACK2
		DisableControlAction(0, 263,true); // R - INPUT_MELEE_ATTACK1
		DisableControlAction(0, 264,true); // Q - INPUT_MELEE_ATTACK2
		DisableControlAction(0, 331,true); // RIGHT MOUSE BUTTON - INPUT_VEH_FLY_ATTACK2
		SetEntityProofs(ped, 1, 1, 1, 1, 1, 1, 1, 1);
		SetEntityInvincible(ped, true);
		SetPlayerInvincible(pedId, true);
		ClearPedBloodDamage(ped);
		ResetPedVisibleDamage(ped);
		ClearPedLastWeaponDamage(ped);
		SetEntityCanBeDamaged(ped, false);
		NetworkSetFriendlyFireOption(false);
		drawText(0.500, 0.005, 0.50, "~g~Esti in SafeZone", 3, 187, 133, 255);
		slowDownCar(ped);
		test = 0;
	} else if (test == 0) {toggled = true;test = 1}

	if (toggled == true) {
		SetEntityProofs(ped, 0, 0, 0, 0, 0, 0, 0, 0);
		SetEntityInvincible(ped, false);
		SetPlayerInvincible(pedId, false);
		ClearPedLastWeaponDamage(ped);
		SetEntityCanBeDamaged(ped, true);
		NetworkSetFriendlyFireOption(true);
		SetEntityMaxSpeed(GetVehiclePedIsIn(ped), 999);
		toggled = false;
	};
};


/*function drawText(x,y ,scale, text) {*/
function drawText(x,y ,scale, text, r,g,b,a) {
    SetTextFont(1)
    SetTextProportional(0)
    SetTextScale(scale, scale)
	SetTextColour(r, g, b, 255)
    SetTextEdge(1, 0, 0, 0, 255)
	SetTextCentre(1)
	SetTextOutline()
    SetTextEntry("STRING")
    AddTextComponentString(text)
    DrawText(x, y + 0.005)
};
