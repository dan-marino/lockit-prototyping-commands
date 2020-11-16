import getLogs from "../aws/cloudtrail/getLogs.js";

const getAuditLogs = (projectName) => {
  getLogs(projectName);
};

export default getAuditLogs;
