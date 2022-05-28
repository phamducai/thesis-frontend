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

export async function updateRoomById({ id, payload }) {
  const { data } = await axios.patch("/room/" + id, payload);
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

export async function updateDeviceStatusById(deviceId) {
  const { data } = await axios.patch("/device/" + deviceId.dev_addr, deviceId);
  return data;
}
export async function deleteDeviceById(deviceId) {
  const { data } = await axios.delete("/device/" + deviceId);
  return data;
}

export async function getRecords(deviceId, attribute) {
  const { data } = await axios.get("/record/" + deviceId + "/" + attribute);
  return data;
}

export async function getAuthStatus() {
  const { data } = await axios.get("/auth/status");
  return data;
}

export async function signUserUp(user) {
  const { data } = await axios.post("/user", user);
  return data;
}

export async function logUserIn(user) {
  const { data } = await axios.post("/auth/login", user);
  return data;
}

export async function logout() {
  const { data } = await axios.get("/auth/logout");
  return data;
}

// building api
export async function getBuilding() {
  const { data } = await axios.get("/building");
  return data[0];
}

export async function updateBuildingById({ id, payload }) {
  const { data } = await axios.patch("/building/" + id, payload);
  return data;
}

//gui commandown
export async function sendAddDeviceCommand() {
  const { data } = await axios.get("/device/add");
  return data;
}

// command related
export async function sendCommand(id, commandObject) {
  const { data } = await axios.post(`/device/${id}/command`, commandObject);
  return data;
}
//commane
