const sendRes = async (req, res, code, message, data) => {
  try {
    return res.status(code).send({
      code: code,
      status: "Success",
      message: message,
      data: data,
    });
  } catch (error) {
    throw error;
  }
};

module.exports = sendRes;
