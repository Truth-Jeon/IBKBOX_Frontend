const CONSTANTS = {
  FULLDATE: "FULLDATE",
  NEWDATE: "NEWDATE",
};

const dateTimeFormat = (dateTime, format) => {
  switch (format) {
    case CONSTANTS.FULLDATE:
      return `${dateTime.substring(0, 10)} ${dateTime.substring(11, 19)}`;
    case CONSTANTS.NEWDATE:
      return `${dateTime.substring(0, 4)} ${dateTime.substring(11, 19)}`;
  }
};

const urlCheck = (url) => {
  if(url.includes("http"))
    return url
  else
    return `http://${url}`
};

const updateTitle = (title) => {
  const htmlTitle = document.querySelector("title");
  htmlTitle.innerHTML = title;
};


export { CONSTANTS, dateTimeFormat, urlCheck, updateTitle };
