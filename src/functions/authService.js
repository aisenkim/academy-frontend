import jwt_decode from "jwt-decode";

export default function isAuthenticated() {
  var current_time = Date.now() / 1000;
  var token = localStorage.getItem("token");
  var jwtDecoded;
  try {
    jwtDecoded = jwt_decode(token);
  } catch (err) {
    return false;
  }
  if (jwtDecoded.exp < current_time) {
    // expired
    return false;
  }
  return true;
}
