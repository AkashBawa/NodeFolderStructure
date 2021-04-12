const userService = require("../v1/services/userService");
module.exports = (io, socket) => {
  socket.on("onlineUser", function (data) {
    try {
      console.log(data, "data");
      if (data && data.userId) {
        io.to(socket.id).emit("onlineUserOk", { status: 200 });
        socket.join(data.userId);
        socket.join("allUser");
      }
    } catch (error) {}
  });

  socket.on("checkinUser", async function (data) {
    if (data && data.userId && data.latitude && data.longitude) {
      let update = {
        latitude: data.latitude,
        longitude: data.longitude,
        userLocation: {
          type: "Point",
          coordinates: [data.longitude, data.latitude],
        },
      };
      await userService.updateQuery({ _id: data.userId }, update);
      io.to(data.userId).emit("updatedLocationSuccessfully", data);
    }
  });

  socket.on("sendConnection", async function (data) {
    await userService.updateQuery({ connections: data.userId }, update);
    io.to(data.userId).emit("connectionSendSuccessfully", data);
  });
};
