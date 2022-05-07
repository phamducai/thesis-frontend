import axios from "axios";

// Room
export async function addRoom(room) {
  const { data } = await axios.post("/room", room);
  return data;
}

export async function getRooms() {
  const { data } = await axios.get("/room");
  return data;
}

export async function getRoomById(roomId) {
  const { data } = await axios.get("/room/" + roomId);
  return data;
}

export async function updateRoomById(roomId, roomData) {
  const { data } = await axios.patch("/room/" + roomId, roomData);
  return data;
}

export async function deleteRoomById(roomId) {
  const { data } = await axios.delete("/room/" + roomId);
  return data;
}

// Device
export async function addDevice(device) {
  const { data } = await axios.post("/device", device);
  return data;
}

export async function getDevices(options) {
  const { data } = await axios.get("/device", options);
  return data;
}

export async function getDeviceById(deviceId) {
  const { data } = await axios.get("/device/" + deviceId);
  return data;
}

export async function updateDeviceById(deviceId, deviceData) {
  const { data } = await axios.patch("/device/" + deviceId, deviceData);
  return data;
}

export async function deleteDeviceById(deviceId) {
  const { data } = await axios.delete("/device/" + deviceId);
  return data;
}

export async function getRecords(deviceId, attribute) {
  const { data } = await axios.get("/record/" + deviceId +"/"+ attribute)
  return data;
}